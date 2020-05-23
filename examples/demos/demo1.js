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
				<TriggerButton placement="bottomLeft" />
				<TriggerButton placement="bottom" />
				<TriggerButton placement="bottomRight" />
				<hr />
				<TriggerButton placement="topLeft" />
				<TriggerButton placement="top" />
				<TriggerButton placement="topRight" />
				<hr />
				<TriggerButton placement="leftTop" />
				<TriggerButton placement="left" />
				<TriggerButton placement="leftBottom" />
				<hr />
				<TriggerButton placement="rightTop" />
				<TriggerButton placement="right" />
				<TriggerButton placement="rightBottom" />
				<hr />
				<TriggerButton
					placement="bottomLeft"
					action="contextMenu"
					text="action:contextMenu"
					popupTransition={{ classNames: animateClassNames, timeout: 300 }}
				/>
				<TriggerButton
					placement="bottomLeft"
					action="click"
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
