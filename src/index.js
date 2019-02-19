import React from 'react';
import ReactDOM, { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import Popup from 'react-widget-popup';
import Portal from 'react-widget-portal';
import getPlacement from 'bplokjs-placement';
import Deferred from 'bplokjs-deferred';
import { listen } from 'bplokjs-dom-utils/events';
// import classnames from 'classnames';
// import omit from 'omit.js';
const contains = require('bplokjs-dom-utils/contains')

import PopupRootComponent from './PopupRootComponent';

const isMobile = typeof navigator !== 'undefined' && !!navigator.userAgent.match(
    /(Android|iPhone|iPad|iPod|iOS|UCWEB)/i
);

// action: click | contextMenu | hover | focus
// showAction: click | contextMenu | mouseEnter | focus
// hideAction: click | mouseLeave | blur | resize | scroll

const propTypes = {
    children: PropTypes.any,
    placement: PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.func]),
    offset: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
    action: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
    showAction: PropTypes.any,
    hideAction: PropTypes.any,
    onPopupVisibleChange: PropTypes.func,
    delay: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.object,
    ]),
    getPopupContainer: PropTypes.func,
    getDocument: PropTypes.func,
    prefixCls: PropTypes.string,
    popupClassName: PropTypes.string,
    popupMaskClassName: PropTypes.string,
    defaultPopupVisible: PropTypes.bool,
    popupProps: PropTypes.object,
    mask: PropTypes.bool,
    maskClosable: PropTypes.bool,
    popupRootComponent: PropTypes.any,
    destroyPopupOnHide: PropTypes.bool,
    popupStyle: PropTypes.object,
    popupMaskStyle: PropTypes.object,
    zIndex: PropTypes.number,
}

function noop() { }


export default class Trigger extends React.Component {

    static propTypes = propTypes;

    static defaultProps = {
        placement: "bottomLeft",
        offset: 0,
        defaultPopupVisible: false,
        action: [],
        showAction: [],
        hideAction: [],
        delay: 0,
        onPopupVisibleChange: noop,
        getDocument: () => window.document,
        prefixCls: "rw-trigger",
        mask: false,
        maskClosable: true,
        destroyPopupOnHide: true,
        popupProps: {},
        popupRootComponent: PopupRootComponent,
        popupStyle: {},
        popupMaskStyle: {},
        zIndex: null,
    }

    static getDerivedStateFromProps(props, state) {
        return {
            popupVisible: 'visible' in props ? props.visible : state.popupVisible
        }
    }

    state = {
        popupVisible: this.props.defaultPopupVisible,
    }

    _popup = null

    delayTimer = null

    promise = null

    componentDidMount() {
        if (this.state.popupVisible) {
            this.resolvePopupDOM();
        }

        this.togglePopupCloseEvents();
    }

    componentDidUpdate() {
        if (this.state.popupVisible) {
            this.resolvePopupDOM();
        }

        this.togglePopupCloseEvents();
    }

    componentWillUnmount() {
        this.clearDelayTimer();
        this.clearOutsideHandler();
    }

    togglePopupCloseEvents() {
        const { getDocument } = this.props;
        const { popupVisible } = this.state;

        if (popupVisible) {
            const currentDocument = getDocument();

            if (!this.clickOutsideHandler && (this.isClickToHide() || this.isContextMenuToShow())) {
                this.clickOutsideHandler = listen(currentDocument,
                    'mousedown', this.onDocumentClick);
            }

            if (!this.touchOutsideHandler && isMobile) {
                this.touchOutsideHandler = listen(currentDocument,
                    'click', this.onDocumentClick);
            }

            // close popup when trigger type contains 'onContextMenu' and document is scrolling.
            if (!this.contextMenuOutsideHandler1 && this.isContextMenuToShow()) {
                this.contextMenuOutsideHandler1 = listen(currentDocument,
                    'scroll', this.onContextMenuClose);
            }
            // close popup when trigger type contains 'onContextMenu' and window is blur.
            if (!this.contextMenuOutsideHandler2 && this.isContextMenuToShow()) {
                this.contextMenuOutsideHandler2 = listen(window,
                    'blur', this.onContextMenuClose);
            }

            if (!this.windowScrollHandler && this.isWindowScrollToHide()) {
                this.windowScrollHandler = listen(currentDocument,
                    'scroll', this.onDocumentClick);
            }

            if (!this.windowResizeHandler && this.isWindowResizeToHide()) {
                this.windowResizeHandler = listen(window,
                    'resize', this.close.bind(this));
            }

        } else {
            this.clearOutsideHandler();
        }
    }

    onDocumentClick = (event) => {
        if (this.props.mask && !this.props.maskClosable) {
            return;
        }

        const target = event.target;
        const root = findDOMNode(this);
        const popupNode = this.getPopupDomNode();

        if (!contains(root, target) && !contains(popupNode, target)) {
            this.close();
        }
    }

    clearOutsideHandler() {
        if (this.clickOutsideHandler) {
            this.clickOutsideHandler();
            this.clickOutsideHandler = null;
        }

        if (this.contextMenuOutsideHandler1) {
            this.contextMenuOutsideHandler1();
            this.contextMenuOutsideHandler1 = null;
        }

        if (this.contextMenuOutsideHandler2) {
            this.contextMenuOutsideHandler2();
            this.contextMenuOutsideHandler2 = null;
        }

        if (this.touchOutsideHandler) {
            this.touchOutsideHandler();
            this.touchOutsideHandler = null;
        }

        if (this.windowScrollHandler) {
            this.windowScrollHandler();
            this.windowScrollHandler = null;
        }

        if (this.windowResizeHandler) {
            this.windowResizeHandler();
            this.windowResizeHandler = null;
        }

    }

    resolvePopupDOM() {
        const {
            placement,
            offset,
        } = this.props;

        if (!this.promise) {
            return;
        }

        const pOffset = [0, 0];

        if (!Array.isArray(offset)) {

            if (/^left/i.test(placement)) {
                pOffset[0] = offset * -1;
            }

            if (/^right/i.test(placement)) {
                pOffset[0] = offset
            }

            if (/^top/i.test(placement)) {
                pOffset[1] = offset * -1
            }

            if (/^bottom/i.test(placement)) {
                pOffset[1] = offset
            }

        } else {
            pOffset[0] = offset[0];
            pOffset[1] = offset[1];
        }

        this.promise.resolve({
            of: findDOMNode(this),
            ...getPlacement(placement, pOffset)
        });

    }

    _setPopupVisible(popupVisible) {

        if (!('popupVisible' in this.props)) {
            this.setState({
                popupVisible,
            });
        }

        this.props.onPopupVisibleChange(popupVisible);
    }

    close() {
        this.delaySetPopupVisible(false);
    }

    clearDelayTimer() {
        if (this.delayTimer) {
            clearTimeout(this.delayTimer);
            this.delayTimer = null;
        }
    }

    getDelayTime(action = 'show') {
        const { delay } = this.props;

        if (typeof delay !== 'number') {
            return Math.abs(delay[action]);
        }

        return Math.abs(delay);
    }

    delaySetPopupVisible(visible) {
        if (this.state.popupVisible === visible) {
            return;
        }

        this.clearDelayTimer();

        const delay = this.getDelayTime(visible ? 'show' : 'hide');

        if (delay) {
            this.delayTimer = setTimeout(() => {
                this._setPopupVisible(visible);
                this.delayTimer = null;
            }, delay);
        } else {
            this._setPopupVisible(visible);
        }
    }

    isContextMenuToShow() {
        const { action, showAction } = this.props;
        return action.indexOf('contextMenu') !== -1 || showAction.indexOf('contextMenu') !== -1;
    }

    isClickToShow() {
        const { action, showAction } = this.props;
        return action.indexOf('click') !== -1 || showAction.indexOf('click') !== -1;
    }

    isClickToHide() {
        const { action, hideAction } = this.props;
        return action.indexOf('click') !== -1 || hideAction.indexOf('click') !== -1;
    }

    isMouseEnterToShow() {
        const { action, showAction } = this.props;
        return action.indexOf('hover') !== -1 || showAction.indexOf('mouseEnter') !== -1;
    }

    isMouseLeaveToHide() {
        const { action, hideAction } = this.props;
        return action.indexOf('hover') !== -1 || hideAction.indexOf('mouseLeave') !== -1;
    }

    isFocusToShow = () => {
        const { action, showAction } = this.props;
        return action.indexOf('focus') !== -1 || showAction.indexOf('focus') !== -1;
    }

    isBlurToHide = () => {
        const { action, hideAction } = this.props;
        return action.indexOf('focus') !== -1 || hideAction.indexOf('blur') !== -1;
    }

    isWindowResizeToHide = () => {
        const { hideAction } = this.props;
        return hideAction.indexOf('resize') !== -1;
    }

    isWindowScrollToHide = () => {
        const { hideAction } = this.props;
        return hideAction.indexOf('scroll') !== -1;
    }

    onContextMenu(e) {
        e.preventDefault();
        this.delaySetPopupVisible(true);
    }

    onClick(e) {
        const nextVisible = !this.state.popupVisible;

        if (this.isClickToHide() && !nextVisible || nextVisible && this.isClickToShow()) {
            this.delaySetPopupVisible(!this.state.popupVisible);
        }
    }

    onMouseEnter = (e) => {
        this.delaySetPopupVisible(true);
    }

    onMouseLeave = (e) => {
        this.delaySetPopupVisible(false);
    }

    onFocus = (e) => {
        if (this.isFocusToShow()) {
            this.delaySetPopupVisible(true);
        }
    }

    onBlur = (e) => {
        if (this.isBlurToHide()) {
            this.delaySetPopupVisible(false);
        }
    }

    onContextMenuClose = () => {
        if (this.isContextMenuToShow()) {
            this.close();
        }
    }

    savePopup = (popup) => {
        this._popup = popup;
    }

    getPopup() {
        return this._popup;
    }

    getPopupDomNode() {
        if (this._popup) {
            return this._popup ? this._popup.getPopupDOM() : null;
        }
        return null;
    }

    getPopupMaskDomNode() {
        if (this._popup) {
            return this._popup ? this._popup.getPopupMaskDOM() : null;
        }
        return null;
    }

    getPopupComponent() {
        const {
            placement,
            popup,
            prefixCls,
            popupClassName,
            popupMaskClassName,
            popupProps,
            mask,
            popupStyle,
            popupMaskStyle,
            popupRootComponent: PopupRootComponent,
            destroyPopupOnHide,
            zIndex,
        } = this.props;
        const { popupVisible } = this.state;

        let promise;

        if (typeof placement === 'string') {
            this.promise = promise = Deferred();
        } else {
            promise = placement;
        }

        const maskProps = popupProps.maskProps || {};

        const newPopupStyle = { ...popupStyle };
        const newPopupMaskStyle = { ...popupMaskStyle };

        if (zIndex != null) {
            newPopupStyle.zIndex = zIndex;
            newPopupMaskStyle.zIndex = zIndex;
        }

        return (
            <Popup
                prefixCls={prefixCls}
                placement={promise}
                unmountOnExit={destroyPopupOnHide}
                style={newPopupStyle}
                className={popupClassName}
                {...popupProps}
                rootComponent={PopupRootComponent}
                mask={mask}
                visible={popupVisible}
                ref={this.savePopup}
                maskProps={{
                    style: newPopupMaskStyle,
                    className: popupMaskClassName,
                    ...maskProps,
                }}
            >
                {
                    typeof popup === 'function' ? popup() : popup
                }
            </Popup>
        );
    }

    render() {
        const { getPopupContainer } = this.props;
        const { popupVisible } = this.state;

        const child = React.Children.only(this.props.children);

        const newChildProps = {};

        if (this.isContextMenuToShow()) {
            newChildProps.onContextMenu = (e) => {
                if (child.props.onContextMenu) {
                    child.props.onContextMenu(e);
                }

                this.clearDelayTimer();

                this.onContextMenu(e);
            };
        }

        if (this.isClickToHide() || this.isClickToShow()) {
            newChildProps.onClick = (e) => {
                if (child.props.onClick) {
                    child.props.onClick(e);
                }

                this.clearDelayTimer();

                this.onClick(e);
            };
        }

        if (this.isMouseEnterToShow()) {
            newChildProps.onMouseEnter = (e) => {
                if (child.props.onMouseEnter) {
                    child.props.onMouseEnter(e);
                }

                this.clearDelayTimer();

                this.onMouseEnter(e);
            };
        }

        if (this.isMouseLeaveToHide()) {
            newChildProps.onMouseLeave = (e) => {
                if (child.props.onMouseLeave) {
                    child.props.onMouseLeave(e);
                }

                this.clearDelayTimer();

                this.onMouseLeave(e);
            };
        }

        if (this.isFocusToShow() || this.isBlurToHide()) {
            newChildProps.onFocus = (e) => {
                if (child.props.onFocus) {
                    child.props.onFocus(e);
                }

                this.clearDelayTimer();

                this.onFocus(e);
            };
            newChildProps.onBlur = (e) => {
                if (child.props.onBlur) {
                    child.props.onBlur(e);
                }

                this.clearDelayTimer();

                this.onBlur(e);
            };
        }

        const trigger = React.cloneElement(child, newChildProps);
        let portal;

        if (popupVisible || this._popup) {
            portal = (
                <Portal
                    getContainer={getPopupContainer}
                >
                    {this.getPopupComponent()}
                </Portal>
            );
        }

        return (
            <>
                {trigger}
                {portal}
            </>
        );
    }
}