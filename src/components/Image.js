import React, { Component } from 'react';

class Image extends Component {
    render() {
        const {
            // id,
            // featured,
            storage_location_uri,
            // url,
            description
        } = { ...this.props.imageData };
        return (
            <img
                className={this.props.imageClass}
                src={`${storage_location_uri}_200x200`}
                alt={description}
            />
        );
    }
}

export default Image;
