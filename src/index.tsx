import React from "react";
import { findDOMNode } from "react-dom";
import Popup, { PopupProps } from "react-widget-popup";
import listen from "dom-helpers/listen";
import contains from "dom-helpers/contains";
import removeClass from "dom-helpers/removeClass";
import addClass from "dom-helpers/addClass";
import position, { PositionOptions, Feedback } from "jq-position";
import Portal, { PortalProps } from "react-widget-portal";
import getPlacement, { Placements } from "./getPlacement";

export type { Placements, PositionOptions, Feedback };

export type ActionType = "click" | "contextMenu" | "focus" | "hover" | "mouseDown";
export type ShowActionType = "click" | "contextMenu" | "focus" | "mouseEnter" | "mouseDown";
export type HideActionType = "click" | "mouseLeave" | "blur" | "resize" | "mouseDown";
export type Delay = {
	show?: number;
	hide?: number;
};

export const version = "%VERSION%";

export function feedbackToPlacement(feedback: Feedback) {
	const map = {
		center_top_center_bottom: "top",
		left_top_left_bottom: "top-left",
		right_top_right_bottom: "top-right",
		center_bottom_center_top: "bottom",
		left_bottom_left_top: "bottom-left",
		right_bottom_right_top: "bottom-right",
		left_center_right_center: "left",
		left_top_right_top: "left-top",
		left_bottom_right_bottom: "left-bottom",
		right_center_left_center: "right",
		right_top_left_top: "right-top",
		right_bottom_left_bottom: "right-bottom",
	};

	return map[feedback.at.join("_") + "_" + feedback.my.join("_")];
}

export interface TriggerProps {
	/** 样式前缀 */
	prefixCls?: string;
	/** 弹出框显示位置 */
	placement?: Placements;
	/** 弹出框位置偏移量 */
	offset?: [number, number] | number;
	// triggerRef?: React.RefObject<HTMLElement>;
	/** 触发事件 */
	action?: ActionType | ActionType[] | null;
	/** 显示触发事件，同action合并 */
	showAction?: ShowActionType | ShowActionType[] | null;
	/** 隐藏触发事件，同action合并 */
	hideAction?: HideActionType | HideActionType[] | null;
	/** 点击popup或trigger元素以外的节点时隐藏popup事件 */
	outsideHideEventName?: Array<keyof HTMLElementEventMap> | keyof HTMLElementEventMap;
	/** 显示/隐藏延迟时间 */
	delay?: number | Delay;
	/** 触发后弹出显示内容 */
	popup?: React.ReactNode | ((trigger: Trigger) => React.ReactNode);
	/** 弹出框CSS样式 */
	popupClassName?: string;
	/** 弹出框遮罩层CSS样式 */
	popupMaskClassName?: string;
	/** 弹出框根节点元素CSS样式 */
	popupRootClassName?: string;
	/** 弹出框CSSTransition参数，参考：react-transition-group */
	popupTransition?: PopupProps["transition"];
	/** 弹出框遮罩层CSSTransition参数，参考：react-transition-group */
	popupMaskTransition?: PopupProps["maskTransition"];
	/** 初始时弹出框是否可见 */
	defaultPopupVisible?: boolean;
	/** 控制弹出框是否可见(受控) */
	popupVisible?: boolean;
	/** 弹出框组件(Popup)属性，参考：react-widget-popup */
	popupProps?: Omit<
		PopupProps,
		| "className"
		| "maskClassName"
		| "rootClassName"
		| "prefixCls"
		| "transition"
		| "maskTransition"
		| "maskProps"
		| "style"
		| "mask"
		| "disableMask"
		| "destroyOnClose"
		| "maskStyle"
		| "rootStyle"
		| "zIndex"
	>;
	/** 弹出框样式 */
	popupStyle?: React.CSSProperties;
	/** 弹出框遮罩层样式 */
	popupMaskStyle?: React.CSSProperties;
	popupRootStyle?: React.CSSProperties;
	/** 弹出框的遮罩层元素的属性，参考：PopupProps["maskProps"] */
	popupMaskProps?: PopupProps["maskProps"];
	/** 是否显示遮罩层 */
	mask?: boolean;
	/** 是否禁用遮罩层 */
	disableMask?: boolean;
	/** 点击遮罩层隐藏弹出框 */
	maskClosable?: boolean;
	/** 隐藏销毁弹出框 */
	destroyPopupOnHide?: boolean;
	/** 设置弹出框的zIndex */
	zIndex?: number;
	/** 是否使用Portal进行渲染弹出框 */
	usePortal?: boolean;
	/** 当destroyPopupOnHide=false时，组件刷新时强制更新弹出框组件 */
	forceRender?: boolean;
	/** jquery-ui/position.js 的配置参数 */
	position?: PositionOptions;
	/** popup位置最终适配方法 */
	adjustPosition?: (
		dom: HTMLElement,
		pos: {
			left: number;
			top: number;
		},
		feedback: Feedback
	) => void;
	/** portal挂载容器 */
	container?: PortalProps["container"];
	/** 内部使用 */
	getDocument?: () => Document | Element;
	/** 内部使用 */
	checkDefaultPrevented?: boolean;
	onPopupVisibleChange?: (visible: boolean) => void;
	onBeforeShow?: (popupNode: HTMLElement) => void;
	onAfterShow?: (popupNode: HTMLElement) => void;
	onBeforeHide?: (popupNode: HTMLElement) => void;
	onAfterHide?: (popupNode: HTMLElement) => void;
}

export interface TriggerState {
	popupVisible: boolean;
}

export class Trigger extends React.Component<TriggerProps, TriggerState> {
	static defaultProps: TriggerProps = {
		prefixCls: "rw-trigger",
		placement: "bottomLeft",
		offset: 0,
		defaultPopupVisible: false,
		action: ["click"],
		showAction: [],
		hideAction: [],
		outsideHideEventName: ["mousedown", "click", "scroll"],
		delay: 0,
		getDocument: () => window.document,
		container: document.body,
		mask: false,
		maskClosable: true,
		destroyPopupOnHide: true,
		popupProps: {},
		popupStyle: {},
		popupMaskStyle: {},
		checkDefaultPrevented: false,
		usePortal: true,
	};

	static getDerivedStateFromProps(nextProps: TriggerProps, state: TriggerState) {
		return {
			popupVisible:
				nextProps.popupVisible === undefined ? state.popupVisible : nextProps.popupVisible,
		};
	}

	state: Readonly<TriggerState> = {
		popupVisible: this.props.defaultPopupVisible!,
	};

	protected delayTimer: number | null = null;

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
		this.togglePopupCloseEvents();
	}

	componentDidUpdate() {
		this.togglePopupCloseEvents();
	}

	componentWillUnmount() {
		this.clearDelayTimer();
		this.clearOutsideHandler();
	}

	protected togglePopupCloseEvents() {
		const { getDocument, outsideHideEventName } = this.props;
		const { popupVisible } = this.state;

		if (popupVisible) {
			const currentDocument = getDocument!() as HTMLElement;

			if (
				!this.clickOutsideHandler &&
				(this.isMouseDownToHide() || this.isClickToHide() || this.isContextMenuToShow())
			) {
				if (Array.isArray(outsideHideEventName)) {
					const cancelHandlers: ReturnType<typeof listen>[] = [];
					outsideHideEventName.forEach((name) => {
						cancelHandlers.push(
							listen(currentDocument, name, this.onOutsideClickToHide)
						);
					});
					this.clickOutsideHandler = () => {
						cancelHandlers.forEach((cancel) => cancel());
					};
				} else {
					this.clickOutsideHandler = listen(
						currentDocument,
						outsideHideEventName!,
						this.onOutsideClickToHide
					);
				}
			}

			// if (!this.touchOutsideHandler && isMobile) {
			// 	this.touchOutsideHandler = listen(currentDocument, "click", this.onOutsideClick);
			// }

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

			// if (!this.windowScrollHandler && this.isWindowScrollToHide()) {
			// 	this.windowScrollHandler = listen(
			// 		currentDocument,
			// 		"scroll",
			// 		this.onOutsideClickToHide
			// 	);
			// }

			if (!this.windowResizeHandler && this.isWindowResizeToHide()) {
				//@ts-ignore
				this.windowResizeHandler = listen(window, "resize", this.hide.bind(this));
			}
		} else {
			this.clearOutsideHandler();
		}
	}

	getTriggerNode() {
		return findDOMNode(this) as HTMLElement;
	}

	getPopupNode() {
		return this.popupInstance.getPopupDOM();
	}

	protected getComponentNode() {
		return findDOMNode(this) as HTMLElement;
	}

	protected onOutsideClickToHide = (event: MouseEvent) => {
		const target = event.target as Element;
		const triggerNode = this.getTriggerNode();
		const popupRootNode = this.popupInstance.getRootDOM();

		if (!contains(triggerNode, target) && !contains(popupRootNode!, target)) {
			this.hide();
		}
	};

	protected clearOutsideHandler() {
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

	protected _setPopupVisible(popupVisible: boolean) {
		if (this.props.popupVisible === undefined) {
			this.setState({
				popupVisible,
			});
		}

		this.props.onPopupVisibleChange?.(popupVisible);
	}

	show() {
		this.delaySetPopupVisible(true);
	}

	hide() {
		this.delaySetPopupVisible(false);
	}

	protected clearDelayTimer() {
		if (this.delayTimer) {
			clearTimeout(this.delayTimer);
			this.delayTimer = null;
		}
	}

	protected getDelayTime(action: "show" | "hide" = "show") {
		const { delay } = this.props;

		if (delay && typeof delay !== "number") {
			return Math.abs(delay[action]!);
		}

		return Math.abs(delay!);
	}

	protected delaySetPopupVisible(visible: boolean) {
		if (this.state.popupVisible === visible) {
			return;
		}

		this.clearDelayTimer();
		this.clearOutsideHandler();

		const delay = this.getDelayTime(visible ? "show" : "hide");

		if (delay) {
			this.delayTimer = (setTimeout(() => {
				this.delayTimer = null;
				this._setPopupVisible(visible);
			}, delay) as unknown) as number;
		} else {
			this._setPopupVisible(visible);
		}
	}

	protected checkToShow(actions: Array<ActionType | ShowActionType>) {
		const { action, showAction } = this.props;

		const action1 = Array.isArray(action) ? action : [action];
		const showAction1 = Array.isArray(showAction) ? showAction : [showAction];
		const s: Array<ActionType | ShowActionType | undefined | null> = [
			...action1,
			...showAction1,
		];

		for (let i = 0; i < actions.length; i++) {
			if (s.indexOf(actions[i]) !== -1) return true;
		}

		return false;
	}

	protected checkToHide(actions: Array<ActionType | HideActionType>) {
		const { action, hideAction } = this.props;

		const action1 = Array.isArray(action) ? action : [action];
		const hideAction1 = Array.isArray(hideAction) ? hideAction : [hideAction];
		const s: Array<ActionType | HideActionType | undefined | null> = [
			...action1,
			...hideAction1,
		];

		for (let i = 0; i < actions.length; i++) {
			if (s.indexOf(actions[i]) !== -1) return true;
		}

		return false;
	}

	protected isContextMenuToShow() {
		return this.checkToShow(["contextMenu"]);
	}

	protected isMouseDownToShow() {
		return this.checkToShow(["mouseDown"]);
	}

	protected isMouseDownToHide() {
		return this.checkToHide(["mouseDown"]);
	}

	protected isClickToShow() {
		return this.checkToShow(["click"]);
	}

	protected isClickToHide() {
		return this.checkToHide(["click"]);
	}

	protected isMouseEnterToShow() {
		return this.checkToShow(["hover", "mouseEnter"]);
	}

	protected isMouseLeaveToHide() {
		return this.checkToHide(["hover", "mouseLeave"]);
	}

	protected isFocusToShow = () => {
		return this.checkToShow(["focus"]);
	};

	protected isBlurToHide = () => {
		return this.checkToHide(["focus", "blur"]);
	};

	protected isWindowResizeToHide = () => {
		return this.checkToHide(["resize"]);
	};

	// protected isWindowScrollToHide = () => {
	// 	return this.checkToHide(["scroll"]);
	// };

	protected onContextMenu(e: React.MouseEvent) {
		e.preventDefault();
		this.delaySetPopupVisible(true);
	}

	protected onTriggerClick(e: React.MouseEvent) {
		const nextVisible = !this.state.popupVisible;

		if ((this.isClickToHide() && !nextVisible) || (nextVisible && this.isClickToShow())) {
			this.delaySetPopupVisible(nextVisible);
		}
	}

	protected onTriggerMouseDown(e: React.MouseEvent) {
		const nextVisible = !this.state.popupVisible;

		if (
			(this.isMouseDownToHide() && !nextVisible) ||
			(nextVisible && this.isMouseDownToShow())
		) {
			this.delaySetPopupVisible(nextVisible);
		}
	}

	protected onMouseEnter = (e: React.MouseEvent) => {
		this.delaySetPopupVisible(true);
	};

	protected onMouseLeave = (e: React.MouseEvent) => {
		this.delaySetPopupVisible(false);
	};

	protected onFocus = (e: React.FocusEvent) => {
		this.delaySetPopupVisible(true);
	};

	protected onBlur = (e: React.FocusEvent) => {
		this.delaySetPopupVisible(false);
	};

	protected onContextMenuClose = () => {
		this.hide();
	};

	protected removeClassNames() {
		const { prefixCls } = this.props;
		const popupNode = this.getPopupNode();

		if (popupNode) {
			[
				`${prefixCls}-placement-top`,
				`${prefixCls}-placement-topLeft`,
				`${prefixCls}-placement-topRight`,
				`${prefixCls}-placement-bottom`,
				`${prefixCls}-placement-bottomLeft`,
				`${prefixCls}-placement-bottomRight`,
				`${prefixCls}-placement-left`,
				`${prefixCls}-placement-leftTop`,
				`${prefixCls}-placement-leftBottom`,
				`${prefixCls}-placement-right`,
				`${prefixCls}-placement-rightTop`,
				`${prefixCls}-placement-rightBottom`,
			].forEach(removeClass.bind(null, popupNode));
		}
	}

	protected addPlacementClassName(feedback: Feedback) {
		const { prefixCls } = this.props;
		const popupNode = this.getPopupNode();

		if (!popupNode) return;

		this.removeClassNames();

		addClass(popupNode, `${prefixCls}-placement-${feedbackToPlacement(feedback)}`);
	}

	protected setPopupPosition(dom: HTMLElement) {
		const { placement, offset, position: positionOpts, adjustPosition } = this.props;
		position(dom, {
			...getPlacement(placement!, offset),
			collision: "flipfit",
			of: this.getTriggerNode(),
			...positionOpts,
			using: (pos, feedback) => {
				this.addPlacementClassName(feedback);

				if (positionOpts && positionOpts.using) {
					positionOpts.using(pos, feedback);
				} else {
					dom.style.left = pos.left + "px";
					dom.style.top = pos.top + "px";
				}

				if (adjustPosition) {
					adjustPosition(dom, pos, feedback);
				}
			},
		});
	}

	updatePopupPosition() {
		const node = this.getPopupNode() as HTMLElement;
		node && this.setPopupPosition(node);
	}

	protected getPopupComponent() {
		const {
			popup,
			prefixCls,
			popupClassName,
			popupMaskClassName,
			popupProps,
			popupMaskProps,
			popupTransition,
			popupMaskTransition,
			forceRender,
			mask,
			disableMask,
			maskClosable,
			popupStyle,
			popupMaskStyle,
			destroyPopupOnHide,
			zIndex,
			popupRootClassName,
			popupRootStyle,
			onBeforeShow,
			onAfterShow,
			onBeforeHide,
			onAfterHide,
		} = this.props;
		const { popupVisible } = this.state;

		const newPopupStyle: React.CSSProperties = { ...popupStyle };
		const newPopupMaskStyle: React.CSSProperties = { ...popupMaskStyle };

		if (zIndex != null) {
			newPopupStyle.zIndex = zIndex;
			newPopupMaskStyle.zIndex = zIndex;
		}

		return (
			<Popup
				ref={this.refHandlers.popup}
				prefixCls={prefixCls}
				destroyOnClose={destroyPopupOnHide}
				style={newPopupStyle}
				className={popupClassName}
				maskClassName={popupMaskClassName}
				maskStyle={newPopupMaskStyle}
				mask={mask}
				disableMask={disableMask}
				rootClassName={popupRootClassName}
				rootStyle={popupRootStyle}
				forceRender={forceRender}
				{...popupProps}
				fixed={false}
				visible={popupVisible}
				transition={{
					...popupTransition,
					onEnter: (dom, appearing) => {
						onBeforeShow?.(dom);

						this.setPopupPosition(dom);

						popupTransition?.onEnter?.(dom, appearing);
					},
					onEntered: (dom, appearing) => {
						// this.setPopupPosition(dom);
						popupTransition?.onEntered?.(dom, appearing);

						onAfterShow?.(dom);
					},
					onExit: (dom) => {
						onBeforeHide?.(dom);

						popupTransition?.onExit?.(dom);
					},
					onExited: (dom) => {
						onAfterHide?.(dom);

						popupTransition?.onExit?.(dom);
					},
				}}
				onMouseEnter={(e) => {
					this.clearDelayTimer();
					popupProps?.onMouseEnter?.(e);
				}}
				onMouseLeave={(e) => {
					if (this.isMouseLeaveToHide()) {
						this.onMouseLeave(e);
					}
					popupProps?.onMouseLeave?.(e);
				}}
				maskTransition={popupMaskTransition}
				maskProps={{
					...popupMaskProps,
					onClick: (e: React.MouseEvent) => {
						if (maskClosable) {
							this.hide();
						}
						popupMaskProps?.onClick?.(e);
					},
					onMouseEnter: (e) => {
						this.clearDelayTimer();
						popupMaskProps?.onMouseEnter?.(e);
					},
				}}
			>
				{typeof popup === "function" ? popup(this) : popup}
			</Popup>
		);
	}

	protected genNewChildProps(child: React.ReactElement) {
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

		if (this.isMouseDownToShow() || this.isMouseDownToHide()) {
			newChildProps.onMouseDown = (e) => {
				if (child.props.onMouseDown) {
					child.props.onMouseDown(e);
				}

				if (checkDefaultPrevented && e.defaultPrevented) return;

				this.clearDelayTimer();

				this.onTriggerMouseDown(e);
			};
		}

		if (this.isClickToHide() || this.isClickToShow()) {
			newChildProps.onClick = (e) => {
				if (child.props.onClick) {
					child.props.onClick(e);
				}

				if (checkDefaultPrevented && e.defaultPrevented) return;

				this.clearDelayTimer();

				this.onTriggerClick(e);
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

		if (this.isFocusToShow()) {
			newChildProps.onFocus = (e) => {
				if (child.props.onFocus) {
					child.props.onFocus(e);
				}

				if (checkDefaultPrevented && e.defaultPrevented) return;

				this.clearDelayTimer();

				this.onFocus(e);
			};
		}

		if (this.isBlurToHide()) {
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
		const { usePortal, container } = this.props;

		const child = React.Children.only(this.props.children) as React.ReactElement;

		const trigger = React.cloneElement(child, this.genNewChildProps(child));

		let popup = this.getPopupComponent();

		if (usePortal) {
			popup = <Portal container={container}>{popup}</Portal>;
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
