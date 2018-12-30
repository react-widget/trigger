import React, { Component } from 'react';
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
                delay={1000}
                popup={<div className="trigger-container">{placement}</div>}
                placement={placement}
            >
                <button className="t-btn" onClick={() => this.setState({ visible: !visible })}>{placement}</button>
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
                    <Trigger
                        offset={1}
                        delay={1000}
                        action="focus"
                        popup={<div className="trigger-container">rightCenter</div>}
                        placement="rightCenter"
                    >
                        <input type="text" placeholder="focus show" />
                    </Trigger>
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
                    <Trigger
                        offset={1}
                        delay={1000}
                        action="contextMenu"
                        popup={<div className="trigger-container">rightCenter</div>}
                        placement="rightCenter"
                    >

                        <span>contextMenu show</span>
                    </Trigger>
                </Layout.Footer>
            </Layout >
        );
    }

}
