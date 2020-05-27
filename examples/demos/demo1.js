import React, { Component } from "react";
import { findDOMNode } from "react-dom";
import Trigger from "../../src";

const animateClassNames = {
	appear: "animated",
	appearActive: "fadeBottomIn",
	enter: "animated",
	enterActive: "fadeBottomIn",
	enterDone: "",
	exit: "animated",
	exitActive: "fadeBottomOut",
	exitDone: "",
};

function TriggerButton({ text, ...props }) {
	return (
		<Trigger
			offset={2}
			// maskClosable={false}
			popup={
				<div
					style={{
						width: 200,
						height: 50,
						border: "1px solid #ccc",
						padding: 5,
						backgroundColor: "#FFF",
					}}
				>
					test...
				</div>
			}
			{...props}
		>
			<button>{text || props.placement}</button>
		</Trigger>
	);
}

export default class DEMO extends Component {
	state = {
		visible: true,
	};

	componentDidMount() {}

	render() {
		return (
			<div>
				<TriggerButton action="hover" placement="bottomLeft" />
				<TriggerButton action="hover" placement="bottom" />
				<TriggerButton action="hover" placement="bottomRight" />
				<hr />
				<TriggerButton action="hover" placement="topLeft" />
				<TriggerButton action="hover" placement="top" />
				<TriggerButton action="hover" placement="topRight" />
				<hr />
				<TriggerButton action="hover" placement="leftTop" />
				<div
					style={{
						position: "relative",
					}}
				>
					<TriggerButton action="hover" usePortal={false} placement="left" />
				</div>
				<TriggerButton action="hover" placement="leftBottom" />
				<hr />
				<TriggerButton action="hover" placement="rightTop" />
				<div
					style={{
						position: "relative",
					}}
				>
					<TriggerButton action="hover" usePortal={false} placement="right" />
				</div>
				<TriggerButton action="hover" placement="rightBottom" />
				<hr />
				<TriggerButton
					placement="bottomLeft"
					action="contextMenu"
					hideAction="mouseDown"
					text="action:contextMenu"
					popupTransition={{ classNames: animateClassNames, timeout: 300 }}
				/>
				<TriggerButton
					placement="bottomLeft"
					action="click"
					// hideAction="mouseDown"
					text="action:click"
					popupTransition={{ classNames: animateClassNames, timeout: 300 }}
				/>
				<TriggerButton
					placement="bottomLeft"
					action="hover"
					text="action:hover"
					delay={200}
					popupTransition={{ classNames: animateClassNames, timeout: 300 }}
				/>
				<TriggerButton
					placement="bottomLeft"
					action="focus"
					text="action:focus"
					popupTransition={{ classNames: animateClassNames, timeout: 300 }}
				/>
				<TriggerButton
					placement="bottomLeft"
					action="mouseDown"
					text="action:mouseDown"
					popupTransition={{ classNames: animateClassNames, timeout: 300 }}
				/>
				<hr />
				<TriggerButton placement="bottomLeft" mask text="mask" />
				<TriggerButton
					placement="bottomLeft"
					popupTransition={{ classNames: animateClassNames, timeout: 300 }}
					text="popupTransition"
				/>
			</div>
		);
	}
}
