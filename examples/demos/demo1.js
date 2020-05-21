import React, { Component } from "react";
import { findDOMNode } from "react-dom";
import Trigger from "../../src";
import Layout from "react-widget-layout";

export default class DEMO extends Component {
	state = {
		visible: true,
	};

	componentDidMount() {}

	render() {
		return (
			<div>
				<Trigger
					placement="topLeft"
					offset={[0, 2]}
					popup={
						<div
							style={{
								border: "1px solid #ccc",
								padding: 5,
								backgroundColor: "#FFF",
							}}
						>
							test...
						</div>
					}
				>
					<button>Trigger</button>
				</Trigger>
			</div>
		);
	}
}
