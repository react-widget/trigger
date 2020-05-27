# trigger

Trigger触发组件

## 安装

`npm install --save react-widget-trigger`


## 使用

[![Edit react-wiget-trigger](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/react-wiget-trigger-llvwn?fontsize=14&hidenavigation=1&theme=dark)

```js
import React from "react";
import Trigger from "react-widget-trigger";
import "react-widget-trigger/style";
import "./styles.css";

export default function App() {
  return (
    <div
      className="App"
      style={{
        padding: 100
      }}
    >
      <Trigger
        offset={1}
        placement="bottomRight"
        popup={trigger => (
          <div
            style={{
              width: 100,
              height: 100,
              border: "1px solid #f2f2f2",
              padding: 10
            }}
          >
            <div>Title</div>
            <div>
              Content
              <Trigger
                usePortal={false}
                action="hover"
                delay={50}
                offset={1}
                popup={
                  <div
                    style={{
                      width: 150
                    }}
                  >
                    hover popup test...
                  </div>
                }
              >
                <a href="###">Hover</a>
              </Trigger>
            </div>

            <button onClick={() => trigger.hide()}>关闭</button>
          </div>
        )}
        action={["click"]}
      >
        <button>点击试试</button>
      </Trigger>
    </div>
  );
}


```


### Interfaces

```ts
import React from "react";
import Popup, { PopupProps } from "react-widget-popup";
import { PositionOptions } from "jq-position";
import { Placements } from "./getPlacement";
declare type ActionType = "click" | "contextMenu" | "focus" | "hover" | "mouseDown";
declare type ShowActionType = "click" | "contextMenu" | "focus" | "mouseEnter" | "mouseDown";
declare type HideActionType = "click" | "mouseLeave" | "blur" | "resize" | "scroll" | "mouseDown";
declare type Delay = {
    show?: number;
    hide?: number;
};
export declare const version = "%VERSION%";
export interface TriggerProps {
    /** 样式前缀 */
    prefixCls?: string;
    /** 弹出框显示位置 */
    placement?: Placements;
    /** 弹出框位置偏移量 */
    offset?: [number, number] | number;
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
    popupProps?: Omit<PopupProps, "className" | "maskClassName" | "rootClassName" | "prefixCls" | "transition" | "maskTransition" | "maskProps" | "style" | "mask" | "disableMask" | "destroyOnClose" | "maskStyle" | "rootStyle" | "zIndex">;
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
export declare class Trigger extends React.Component<TriggerProps, TriggerState> {
    popupInstance: Popup;
    triggerInstance: React.ReactInstance;
    show(): void;
    hide(): void;
    updatePopupPosition(): void;
}
export default Trigger;
```

### defaultProps
```js
{
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
}
```

### 基础样式

```css
.rw-trigger-root {
	position: absolute;
	left: 0;
	right: 0;
	top: 0;
}

.rw-trigger {
	position: absolute;
	left: 0;
	top: 0;
	z-index: 2000;
}

.rw-trigger-mask {
	position: fixed;
	left: 0;
	top: 0;
	right: 0;
	bottom: 0;
	background: #000;
	opacity: 0.1;
	z-index: 2000;
}


```
