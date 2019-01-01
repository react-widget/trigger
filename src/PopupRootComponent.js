import React from 'react';

export default class PopupRootContainer extends React.Component {
    render() {

        const style = {
            position: 'absolute',
            left: 0,
            top: 0,
            width: '100%',
        }

        return (
            <div style={style} {...this.props} />
        );
    }
}