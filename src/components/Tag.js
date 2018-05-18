import React, { Component } from 'react';

class Tag extends Component {
    render() {
        return <span><p><b>{this.props.tagKey}</b>: {this.props.tagName}</p></span>;
    }
}

export default Tag;
