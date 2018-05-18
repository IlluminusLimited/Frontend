import React, { Component } from 'react';
import Modal from './Modal';
import ListImage from './ListImage';

class Pin extends Component {
    render() {
        const {
            id,
            name,
            year,
            description,
            tags,
            created_at,
            updated_at,
            images,
            url
        } = { ...this.props.pinData };
        return (
            <React.Fragment>
                <div
                    className="pin-list-item pin-modal-toggle"
                    data-modal={'pin-' + id}
                > {this.props.pinData.images.map(image =>
                    <ListImage imageData={image}/>
                )}
                    <div className="pin-list-title">{name}</div>
                </div>
                <Modal pinData={this.props.pinData} />
            </React.Fragment>
        );
    }
}

export default Pin;
