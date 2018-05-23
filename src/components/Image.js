import React, { Component } from 'react';

class Image extends Component {
    render() {
        const {
            // id,
            // featured,
            storage_location_uri,
            // url,
            thumbnailable,
            description
        } = { ...this.props.imageData };
        return (
            <img
                className={this.props.imageClass}
                src={thumbnailable === true ? `${storage_location_uri}_300x300` : storage_location_uri}
                alt={description}
            />
        );
    }
}

export default Image;
