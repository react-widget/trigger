import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Popup from 'react-widget-popup';

const propTypes = {

}

export default class Trigger extends React.Component {

    static propTypes = propTypes;

    static defaultProps = {

    }

    promise = null

    componentDidMount() {

    }

    componentDidUpdate() {

    }

    resolvePopupDOM() {
        if (this.promise) {
            this.promise.resolve(ReactDOM.findDOMNode(this));
        }
    }


    render() {
        const {
            children
        } = this.props;

        this.promise = new Promise();

        return (
            <>
                {children}
                <Popup
                    placement={this.promise}
                >
                    <div>
                        test...
                    </div>
                </Popup>
            </>
        );
    }
}