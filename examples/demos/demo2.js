import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import Trigger from '../../src';
import Layout from 'react-widget-layout';


class TriggerBtn extends React.Component {

    state = {
        visible: false
    }

    render() {
        const { placement } = this.props;
        const { visible } = this.state;
        return (
            <Trigger
                offset={1}
                action="hover"
                delay={100}
                popup={<div className="trigger-container">{placement}</div>}
                placement={placement}
            >
                <button className="t-btn" onClick={() => this.setState({ visible: !visible })}>{placement}</button>
            </Trigger>
        );
    }
}

class H1 extends React.Component {

    componentDidMount() {
        console.log('h1 mount')
    }

    componentDidUpdate() {
        console.log('h1 update')
    }

    componentWillUnmount() {
        console.log('h1 unmount')
    }

    render() {
        return <h1>Portal</h1>;
    }
}

export default class DEMO extends Component {

    state = {
        current: null,
    }



    onClick(ct, e) {
        this.setState({
            current: ct
        })
    }

    render() {
        const { current } = this.state;

        return (
            <>
                <button onClick={this.onClick.bind(this, 'portal1')}>portal1</button>
                <button onClick={this.onClick.bind(this, 'portal2')}>portal2</button>

                <div id="portal1" style={{ border: "1px solid red", padding: 10 }}></div>
                <div id="portal2" style={{ border: "1px solid green", padding: 10 }}></div>
                {
                    current ?
                        createPortal(<H1 />, document.getElementById(current))
                        : null
                }
            </>
        );
    }

}
