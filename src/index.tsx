import React from "react";
import ReactDOM, { findDOMNode } from "react-dom";
import PropTypes from "prop-types";
import Popup, { PopupProps } from "react-widget-popup";
import listen from "dom-helpers/listen";
import contains from "dom-helpers/contains";
import position from "jq-position";
import Portal from "react-widget-portal";
import getPlacement, { Placements } from "./getPlacement";

import PopupRootComponent from "./PopupRootComponent";

const isMobile =
	typeof navigator !== "undefined" &&
	!!navigator.userAgent.match(/(Android|iPhone|iPad|iPod|iOS|UCWEB)/i);

type ActionType = "click" | "contextMenu" | "focus" | "hover";
type ShowActionType = "click" | "contextMenu" | "focus" | "mouseEnter";
type HideActionType = "click" | "mouseLeave" | "blur" | "resize" | "scroll";
type Delay = {
	show?: number;
	hide?: number;
};

export interface TriggerProps {
	prefixCls: string;
	placement?: Placements;
	offset?: [number, number] | number;
	triggerRef?: React.RefObject<HTMLElement>;
	action?: ActionType | ActionType[];
	showAction?: ShowActionType | ShowActionType[];
	hideAction?: HideActionType | HideActionType[];
	onPopupVisibleChange?: (visible: boolean) => void;
	delay?: number | Delay;
	// getPopupContainer: any;
	getDocument: () => Document | Element;
	popup?: React.ReactNode;
	popupClassName?: string;
	popupMaskClassName: string;
	defaultPopupVisible: boolean;
	popupVisible: boolean;
	popupProps: PopupProps;
	// mask: any;
	// maskClosable: any;
	// popupRootComponent: any;
	destroyPopupOnHide: any;
	// popupStyle: any;
	// popupMaskStyle: any;
	zIndex: any;
	checkDefaultPrevented: boolean;
	usePortal: boolean;
}

export interface TriggerState {
	popupVisible: boolean;
}

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
	delay: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
	getPopupContainer: PropTypes.func,
	getDocument: PropTypes.func,
	popup: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
	prefixCls: PropTypes.string,
	popupClassName: PropTypes.string,
	popupMaskClassName: PropTypes.string,
	defaultPopupVisible: PropTypes.bool,
	popupVisible: PropTypes.bool,
	popupProps: PropTypes.object,
	mask: PropTypes.bool,
	maskClosable: PropTypes.bool,
	popupRootComponent: PropTypes.any,
	destroyPopupOnHide: PropTypes.bool,
	popupStyle: PropTypes.object,
	popupMaskStyle: PropTypes.object,
	zIndex: PropTypes.number,
	checkDefaultPrevented: PropTypes.bool,
};

function noop() {}

export class Trigger extends React.Component<TriggerProps, TriggerState> {
	static propTypes = propTypes;

	static defaultProps = {
		placement: "bottomLeft",
		offset: 0,
		defaultPopupVisible: false,
		action: ["click"],
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
		checkDefaultPrevented: false,
		usePortal: true,
	};

	static getDerivedStateFromProps(props, state) {
		return {
			popupVisible: "popupVisible" in props ? props.popupVisible : state.popupVisible,
		};
	}

	state = {
		popupVisible: this.props.defaultPopupVisible,
	};

	delayTimer: any = null;

	promise: any = null;

	popupInstance: Popup;
	triggerInstance: React.ReactInstance;

	protected refHandlers = {
		popup: (node: Popup) => (this.popupInstance = node),
		trigger: (node: React.ReactInstance) => (this.triggerInstance = node),
	};

	protected clickOutsideHandler: null | (() => void);
	protected touchOutsideHandler: null | (() => void);
	protected contextMenuOutsideHandler1: null | (() => void);
	protected contextMenuOutsideHandler2: null | (() => void);
	protected windowScrollHandler: null | (() => void);
	protected windowResizeHandler: null | (() => void);

	componentDidMount() {
		// if (this.state.popupVisible) {
		// 	this.resolvePopupDOM();
		// }

		this.togglePopupCloseEvents();
	}

	componentDidUpdate() {
		// if (this.state.popupVisible) {
		// 	this.resolvePopupDOM();
		// }

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
			const currentDocument = getDocument() as HTMLElement;

			if (!this.clickOutsideHandler && (this.isClickToHide() || this.isContextMenuToShow())) {
				this.clickOutsideHandler = listen(currentDocument, "mousedown", (e) => {
					//修复在Edge下如果点击Trigger并由上层组件隐藏Popup时，导致mouseup无法触发从而导致文字选择的BUG...
					//不在Trigger里修复，这部分需要由上层组件通过setTimeout方式延迟隐藏的方式来规避
					//e.preventDefault();
					this.onDocumentClick(e);
				});
			}

			if (!this.touchOutsideHandler && isMobile) {
				this.touchOutsideHandler = listen(currentDocument, "click", this.onDocumentClick);
			}

			// close popup when trigger type contains 'onContextMenu' and document is scrolling.
			if (!this.contextMenuOutsideHandler1 && this.isContextMenuToShow()) {
				this.contextMenuOutsideHandler1 = listen(
					currentDocument,
					"scroll",
					this.onContextMenuClose
				);
			}
			// close popup when trigger type contains 'onContextMenu' and window is blur.
			if (!this.contextMenuOutsideHandler2 && this.isContextMenuToShow()) {
				//@ts-ignore
				this.contextMenuOutsideHandler2 = listen(window, "blur", this.onContextMenuClose);
			}

			if (!this.windowScrollHandler && this.isWindowScrollToHide()) {
				this.windowScrollHandler = listen(currentDocument, "scroll", this.onDocumentClick);
			}

			if (!this.windowResizeHandler && this.isWindowResizeToHide()) {
				//@ts-ignore
				this.windowResizeHandler = listen(window, "resize", this.close.bind(this));
			}
		} else {
			this.clearOutsideHandler();
		}
	}

	onDocumentClick = (event) => {
		// if (this.props.mask && !this.props.maskClosable) {
		// 	return;
		// }

		const target = event.target;
		const triggerNode = findDOMNode(this);
		const popupNode = this.popupInstance.getPopupDOM();

		if (!contains(triggerNode, target) && !contains(popupNode!, target)) {
			this.close();
		}
	};

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

	// resolvePopupDOM() {
	// 	const { placement, offset } = this.props;

	// 	if (!this.promise) {
	// 		return;
	// 	}

	// 	const pOffset = [0, 0];

	// 	if (!Array.isArray(offset)) {
	// 		if (/^left/i.test(placement)) {
	// 			pOffset[0] = offset * -1;
	// 		}

	// 		if (/^right/i.test(placement)) {
	// 			pOffset[0] = offset;
	// 		}

	// 		if (/^top/i.test(placement)) {
	// 			pOffset[1] = offset * -1;
	// 		}

	// 		if (/^bottom/i.test(placement)) {
	// 			pOffset[1] = offset;
	// 		}
	// 	} else {
	// 		pOffset[0] = offset[0];
	// 		pOffset[1] = offset[1];
	// 	}

	// 	// this.promise.resolve({
	// 	// 	of: findDOMNode(this),
	// 	// 	...getPlacement(placement, pOffset),
	// 	// });
	// }

	_setPopupVisible(popupVisible: boolean) {
		if (!("popupVisible" in this.props)) {
			this.setState({
				popupVisible,
			});
		}

		this.props.onPopupVisibleChange?.(popupVisible);
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

	getDelayTime(action: "show" | "hide" = "show") {
		const { delay } = this.props;

		if (delay && typeof delay !== "number") {
			return Math.abs(delay[action]!);
		}

		return Math.abs(delay!);
	}

	delaySetPopupVisible(visible: boolean) {
		if (this.state.popupVisible === visible) {
			return;
		}

		this.clearDelayTimer();

		const delay = this.getDelayTime(visible ? "show" : "hide");

		if (delay) {
			this.delayTimer = setTimeout(() => {
				this.delayTimer = null;
				this._setPopupVisible(visible);
			}, delay);
		} else {
			this._setPopupVisible(visible);
		}
	}

	protected checkToShow(actions: Array<ActionType | ShowActionType>) {
		const { action, showAction } = this.props;

		const action1 = Array.isArray(action) ? action : [action];
		const showAction1 = Array.isArray(showAction) ? showAction : [showAction];
		const s: Array<ActionType | ShowActionType | undefined> = [...action1, ...showAction1];

		for (let i = 0; i < actions.length; i++) {
			if (s.indexOf(actions[i]) !== -1) return true;
		}

		return false;
	}

	protected checkToHide(actions: Array<ActionType | HideActionType>) {
		const { action, hideAction } = this.props;

		const action1 = Array.isArray(action) ? action : [action];
		const hideAction1 = Array.isArray(hideAction) ? hideAction : [hideAction];
		const s: Array<ActionType | HideActionType | undefined> = [...action1, ...hideAction1];

		for (let i = 0; i < actions.length; i++) {
			if (s.indexOf(actions[i]) !== -1) return true;
		}

		return false;
	}

	isContextMenuToShow() {
		return this.checkToShow(["contextMenu"]);
	}

	isClickToShow() {
		return this.checkToShow(["click"]);
	}

	isClickToHide() {
		return this.checkToHide(["click"]);
	}

	isMouseEnterToShow() {
		return this.checkToShow(["hover", "mouseEnter"]);
	}

	isMouseLeaveToHide() {
		return this.checkToHide(["hover", "mouseLeave"]);
	}

	isFocusToShow = () => {
		return this.checkToShow(["focus"]);
	};

	isBlurToHide = () => {
		return this.checkToHide(["focus", "blur"]);
	};

	isWindowResizeToHide = () => {
		return this.checkToHide(["resize"]);
	};

	isWindowScrollToHide = () => {
		return this.checkToHide(["scroll"]);
	};

	onContextMenu(e: React.MouseEvent) {
		e.preventDefault();
		this.delaySetPopupVisible(true);
	}

	onClick(e: React.MouseEvent) {
		const nextVisible = !this.state.popupVisible;

		if ((this.isClickToHide() && !nextVisible) || (nextVisible && this.isClickToShow())) {
			this.delaySetPopupVisible(!this.state.popupVisible);
		}
	}

	onMouseEnter = (e: React.MouseEvent) => {
		this.delaySetPopupVisible(true);
	};

	onMouseLeave = (e: React.MouseEvent) => {
		this.delaySetPopupVisible(false);
	};

	onFocus = (e: React.FocusEvent) => {
		if (this.isFocusToShow()) {
			this.delaySetPopupVisible(true);
		}
	};

	onBlur = (e: React.FocusEvent) => {
		if (this.isBlurToHide()) {
			this.delaySetPopupVisible(false);
		}
	};

	onContextMenuClose = () => {
		if (this.isContextMenuToShow()) {
			this.close();
		}
	};

	setPopupPosition(dom: HTMLElement) {
		const { placement, offset } = this.props;
		position(dom, {
			...getPlacement(placement!, offset),
			of: findDOMNode(this),
			collision: "flipfit",
		});
	}

	getPopupComponent() {
		const {
			popup,
			prefixCls,
			popupClassName,
			popupMaskClassName,
			popupProps,
			// mask,
			// popupStyle,
			// popupMaskStyle,
			destroyPopupOnHide,
			zIndex,
		} = this.props;
		const { popupVisible } = this.state;

		const maskProps = popupProps.maskProps || {};

		// const newPopupStyle = { ...popupStyle };
		// const newPopupMaskStyle = { ...popupMaskStyle };

		// if (zIndex != null) {
		// 	newPopupStyle.zIndex = zIndex;
		// 	newPopupMaskStyle.zIndex = zIndex;
		// }

		return (
			<Popup
				ref={this.refHandlers.popup}
				prefixCls={prefixCls}
				unmountOnExit={destroyPopupOnHide}
				// style={newPopupStyle}
				className={popupClassName}
				{...popupProps}
				// mask={mask}
				visible={popupVisible}
				transition={{
					...popupProps.transition,
					onEnter: (dom, appearing) => {
						popupProps.transition?.onEnter?.(dom, appearing);
						this.setPopupPosition(dom);
					},
				}}
				maskProps={{
					// style: newPopupMaskStyle,
					className: popupMaskClassName,
					...maskProps,
				}}
			>
				{popup}
			</Popup>
		);
	}

	genNewChildProps(child: React.ReactElement) {
		const { checkDefaultPrevented } = this.props;
		const newChildProps: React.HTMLAttributes<any> = {};

		if (this.isContextMenuToShow()) {
			newChildProps.onContextMenu = (e) => {
				if (child.props.onContextMenu) {
					child.props.onContextMenu(e);
				}

				if (checkDefaultPrevented && e.defaultPrevented) return;

				this.clearDelayTimer();

				this.onContextMenu(e);
			};
		}

		if (this.isClickToHide() || this.isClickToShow()) {
			newChildProps.onClick = (e) => {
				if (child.props.onClick) {
					child.props.onClick(e);
				}

				if (checkDefaultPrevented && e.defaultPrevented) return;

				this.clearDelayTimer();

				this.onClick(e);
			};
		}

		if (this.isMouseEnterToShow()) {
			newChildProps.onMouseEnter = (e) => {
				if (child.props.onMouseEnter) {
					child.props.onMouseEnter(e);
				}

				if (checkDefaultPrevented && e.defaultPrevented) return;

				this.clearDelayTimer();

				this.onMouseEnter(e);
			};
		}

		if (this.isMouseLeaveToHide()) {
			newChildProps.onMouseLeave = (e) => {
				if (child.props.onMouseLeave) {
					child.props.onMouseLeave(e);
				}

				if (checkDefaultPrevented && e.defaultPrevented) return;

				this.clearDelayTimer();

				this.onMouseLeave(e);
			};
		}

		if (this.isFocusToShow() || this.isBlurToHide()) {
			newChildProps.onFocus = (e) => {
				if (child.props.onFocus) {
					child.props.onFocus(e);
				}

				if (checkDefaultPrevented && e.defaultPrevented) return;

				this.clearDelayTimer();

				this.onFocus(e);
			};
			newChildProps.onBlur = (e) => {
				if (child.props.onBlur) {
					child.props.onBlur(e);
				}

				if (checkDefaultPrevented && e.defaultPrevented) return;

				this.clearDelayTimer();

				this.onBlur(e);
			};
		}

		return newChildProps;
	}

	render() {
		const { usePortal } = this.props;

		const child = React.Children.only(this.props.children) as React.ReactElement;

		const trigger = React.cloneElement(child, this.genNewChildProps(child));

		let popup = this.getPopupComponent();

		if (usePortal) {
			popup = <Portal container={document.body}>{popup}</Portal>;
		}

		return (
			<>
				{trigger}
				{popup}
			</>
		);
	}
}

export default Trigger;
