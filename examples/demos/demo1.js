import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import Trigger from '../../src';
import Layout from 'react-widget-layout';
import deferred from 'bplokjs-deferred';
import getPlacement from 'bplokjs-placement';

const animateClassNames = {
    "appear": "animated",
    "appearActive": "fadeBottomIn",
    "enter": "animated",
    "enterActive": "fadeBottomIn",
    "enterDone": "",
    "exit": "animated",
    "exitActive": "fadeBottomOut",
    "exitDone": "",
};

class Select extends React.Component {

    componentDidMount() {
        this.promise.resolve({
            of: findDOMNode(this),
            ...getPlacement('bottomLeft')
        });
    }

    render() {

        this.promise = deferred();

        return (
            <div className="select">
                <input size={10} />
                <Trigger
                    placement={this.promise}
                    popup="AAAAAAAA"
                    action="click"
                >
                    <span className="arrow">V</span>
                </Trigger>
            </div>
        );
    }
}

class TriggerBtn extends React.Component {

    state = {
        visible: false
    }

    render() {
        const { placement } = this.props;
        const { visible } = this.state;
        return (
            <Trigger
                offset={0}
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


class AnimTriggerBtn extends React.Component {

    state = {
        visible: false
    }

    render() {
        const { placement } = this.props;
        const { visible } = this.state;
        return (
            <Trigger
                offset={0}
                action="hover"
                delay={100}
                popup={<div className="trigger-container">{placement}</div>}
                placement={placement}
                popupProps={{
                    timeout: 300,
                    transitionClassNames: animateClassNames
                }}
            >
                <button className="t-btn" onClick={() => this.setState({ visible: !visible })}>anim {placement}</button>
            </Trigger>
        );
    }
}

export default class DEMO extends Component {

    state = {
        visible: true,
    }

    componentDidMount() {
    }

    render() {

        return (
            <Layout>
                <Layout.Header style={{
                    textAlign: "center"
                }}>
                    <TriggerBtn placement="topLeft" />
                    <TriggerBtn placement="topCenter" />
                    <TriggerBtn placement="topRight" />
                </Layout.Header>
                <Layout>
                    <Layout.Sider style={{
                        width: 80
                    }}>
                        <TriggerBtn placement="leftTop" />
                        <TriggerBtn placement="leftCenter" />
                        <TriggerBtn placement="leftBottom" />
                    </Layout.Sider>
                    <Layout.Content>
                    </Layout.Content>
                    <Layout.Sider style={{
                        width: 80
                    }}>
                        <TriggerBtn placement="rightTop" />
                        <TriggerBtn placement="rightCenter" />
                        <TriggerBtn placement="rightBottom" />
                    </Layout.Sider>
                </Layout>
                <Layout.Footer style={{
                    textAlign: "center"
                }}>
                    <TriggerBtn placement="bottomLeft" />
                    <TriggerBtn placement="bottomCenter" />
                    <TriggerBtn placement="bottomRight" />
                </Layout.Footer>

                <Layout.Footer style={{
                    textAlign: "center"
                }}>
                    <Trigger
                        offset={1}
                        delay={0}
                        action="contextMenu"
                        popup={<div className="trigger-container">contextMenu</div>}
                        placement="rightCenter"
                    >
                        <button className="t-btn">contextMenu show</button>
                    </Trigger>
                    <Trigger
                        offset={1}
                        delay={100}
                        action="click"
                        popup={<div className="trigger-container">click</div>}
                        placement="rightCenter"
                        mask
                        zIndex={10}
                    >
                        <button className="t-btn">click show</button>
                    </Trigger>

                    <Trigger
                        offset={1}
                        delay={100}
                        action="focus"
                        popup={<div className="trigger-container">rightCenter</div>}
                        placement="rightCenter"
                        popupProps={{
                            timeout: 300,
                            transitionClassNames: animateClassNames
                        }}
                    >
                        <input type="text" placeholder="focus show" />
                    </Trigger>

                </Layout.Footer>

                <Layout.Footer style={{
                    textAlign: "center"
                }}>
                    <AnimTriggerBtn placement="bottomLeft" />
                    <AnimTriggerBtn placement="bottomCenter" />
                    <AnimTriggerBtn placement="bottomRight" />
                    <Trigger
                        offset={1}
                        delay={100}
                        action="click"
                        popup={<div className="trigger-container">click animate show <TriggerBtn placement="bottomLeft" /></div>}
                        placement="rightCenter"
                        mask
                        zIndex={10}
                        popupProps={{
                            timeout: 300,
                            transitionClassNames: animateClassNames
                        }}
                    >

                        <button className="t-btn">
                            click animate show
                        </button>
                    </Trigger>
                </Layout.Footer>
                <Layout.Footer style={{
                    textAlign: "center"
                }}>
                    <Select />
                </Layout.Footer>
            </Layout >
        );
    }

}
