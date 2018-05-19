import React, { Component } from 'react';

class Tag extends Component {
    render() {
        return (
            <p>
                <b>{this.props.tagKey}</b>: {this.props.tagName}
            </p>
        );
    }
}

export default Tag;
