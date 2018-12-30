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

        onPopupVisibleChange: noop,
    }

    state = {
        popupVisible: this.props.defaultPopupVisible,
    }

    static getDerivedStateFromProps(props, state) {
        return {
            popupVisible: 'visible' in props ? props.visible : state.popupVisible
        }
    }

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
        //this.clearDelayTimer();
        if (this.state.popupVisible !== popupVisible) {
            if (!('popupVisible' in this.props)) {
                this.setState({
                    popupVisible,
                });
            }
            this.props.onPopupVisibleChange(popupVisible);
        }
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

    onClick = (event) => {
        //this.fireEvents('onClick', event);
        // //focus will trigger click
        // if (this.focusTime) {
        //     let preTime;
        //     if (this.preClickTime && this.preTouchTime) {
        //         preTime = Math.min(this.preClickTime, this.preTouchTime);
        //     } else if (this.preClickTime) {
        //         preTime = this.preClickTime;
        //     } else if (this.preTouchTime) {
        //         preTime = this.preTouchTime;
        //     }
        //     if (Math.abs(preTime - this.focusTime) < 20) {
        //         return;
        //     }
        //     this.focusTime = 0;
        // }
        // this.preClickTime = 0;
        // this.preTouchTime = 0;
        event.preventDefault();
        const nextVisible = !this.state.popupVisible;

        if (this.isClickToHide() && !nextVisible || nextVisible && this.isClickToShow()) {
            this.setPopupVisible(!this.state.popupVisible);
        }
    }

    onMouseEnter = (e) => {
        //this.fireEvents('onMouseEnter', e);
        // this.delaySetPopupVisible(true, this.props.mouseEnterDelay);
        this.setPopupVisible(true);
    }

    onMouseLeave = (e) => {
        // this.fireEvents('onMouseLeave', e);
        //  this.delaySetPopupVisible(false, this.props.mouseLeaveDelay);
        this.setPopupVisible(false);
    }

    render() {
        const { popupVisible } = this.state;
        const {
            children,
            popup,
        } = this.props;
        const child = React.Children.only(children);

        const newChildProps = {};

        // if (this.isContextMenuToShow()) {
        //     newChildProps.onContextMenu = this.onContextMenu;
        // } else {
        //     newChildProps.onContextMenu = this.createTwoChains('onContextMenu');
        // }

        if (this.isClickToHide() || this.isClickToShow()) {
            newChildProps.onClick = this.onClick;
            //newChildProps.onMouseDown = this.onMouseDown;
            // newChildProps.onTouchStart = this.onTouchStart;
        } else {
            // newChildProps.onClick = this.createTwoChains('onClick');
            // newChildProps.onMouseDown = this.createTwoChains('onMouseDown');
            // newChildProps.onTouchStart = this.createTwoChains('onTouchStart');
        }

        if (this.isMouseEnterToShow()) {
            newChildProps.onMouseEnter = this.onMouseEnter;
        } else {
            //  newChildProps.onMouseEnter = this.createTwoChains('onMouseEnter');
        }
        if (this.isMouseLeaveToHide()) {
            newChildProps.onMouseLeave = this.onMouseLeave;
        } else {
            // newChildProps.onMouseLeave = this.createTwoChains('onMouseLeave');
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