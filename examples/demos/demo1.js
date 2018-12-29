import React, { Component } from 'react';
import Trigger from '../../src';

export default class DEMO extends Component {

    state = {
        visible: true,
    }

    componentDidMount() {
    }

    render() {
        const { visible } = this.state;

        return (
            <div >
                <button>确认A</button>
                <button>确认B</button>
                <Trigger>
                    <button>确认C</button>
                </Trigger>
            </div >
        );
    }

}
