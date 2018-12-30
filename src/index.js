import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Popup from 'react-widget-popup';
import getPlacement from 'bplokjs-placement';
import Deferred from 'bplokjs-deferred';

const propTypes = {
    offset: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
    action: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
    showAction: PropTypes.any,
    hideAction: PropTypes.any,
    onPopupVisibleChange: PropTypes.func,
    //afterPopupVisibleChange: PropTypes.func,
    delay: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.object,
    ]),
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
    }

    static getDerivedStateFromProps(props, state) {
        return {
            popupVisible: 'visible' in props ? props.visible : state.popupVisible
        }
    }

    state = {
        popupVisible: this.props.defaultPopupVisible,
    }

    delayTimer = null

    promise = null

    componentDidMount() {
        this.resolvePopupDOM();
    }

    componentDidUpdate() {
        this.resolvePopupDOM();
    }

    resolvePopupDOM() {
        const {
            placement,
            offset,
        } = this.props;

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

        if (this.promise) {
            this.promise.resolve({
                of: ReactDOM.findDOMNode(this),
                ...getPlacement(placement, pOffset)
            });
        }
    }

    setPopupVisible(popupVisible) {

        if (!('popupVisible' in this.props)) {
            this.setState({
                popupVisible,
            });
        }

        this.props.onPopupVisibleChange(popupVisible);
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
                this.setPopupVisible(visible);
                this.delayTimer = null;
            }, delay);
        } else {
            this.setPopupVisible(visible);
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

    render() {
        const { popupVisible } = this.state;
        const {
            children,
            popup,
        } = this.props;
        const child = React.Children.only(children);

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

        this.promise = Deferred();

        const popupChildren = typeof popup === 'function' ? popup() : popup;

        const trigger = React.cloneElement(child, newChildProps);

        return (
            <>
                {trigger}
                <Popup
                    placement={this.promise}
                    visible={!!popupVisible}
                >
                    {
                        popupChildren
                    }
                </Popup>
            </>
        );
    }
}