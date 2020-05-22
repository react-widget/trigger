import React, { Component } from "react";
import { findDOMNode } from "react-dom";
import Trigger from "../../src";

function TriggerButton({ placement, offset }) {
	return (
		<Trigger
			placement={placement}
			offset={2}
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
		>
			<button>{placement}</button>
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
			</div>
		);
	}
}
