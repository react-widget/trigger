import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Popup from 'react-widget-popup';
import getPlacement from 'bplokjs-placement';
import Deferred from 'bplokjs-deferred';

const propTypes = {

}

export default class Trigger extends React.Component {

    static propTypes = propTypes;

    static defaultProps = {

    }

    promise = null

    componentDidMount() {
        this.resolvePopupDOM();
    }

    componentDidUpdate() {
        this.resolvePopupDOM();
    }

    resolvePopupDOM() {
        if (this.promise) {
            this.promise.resolve({
                of: ReactDOM.findDOMNode(this),
                ...getPlacement('bottomLeft')
            });
        }
    }


    render() {
        const {
            children
        } = this.props;

        this.promise = Deferred();

        return (
            <>
                {children}
                <Popup
                    placement={this.promise}
                    visible
                >
                    <div>
                        test...
                    </div>
                </Popup>
            </>
        );
    }
}