import React, { Component } from 'react';

class Image extends Component {
    render() {
        const { id, featured, storage_location_uri, url } = {
            ...this.props.imageData
        };
        return (
            <img className={this.props.imageClass} src={storage_location_uri} />
        );
    }
}

export default Image;
