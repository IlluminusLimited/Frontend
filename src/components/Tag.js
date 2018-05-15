import React, { Component } from 'react';

class Tag extends Component {
    render() {
        return <span>{this.props.tagName}</span>;
    }
}

export default Tag;
