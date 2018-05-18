import React, { Component } from 'react';
import ModalCollection from './ModalCollection';
import ListImage from './ListImage';

class CollectionItem extends Component {
    render() {
        const {
            id,
            name,
            description,
            tags,
            created_at,
            updated_at,
            images,
            url
        } = { ...this.props.collectionData };
        return (
            <React.Fragment>
                <div
                    className="pin-list-item pin-modal-toggle"
                    data-modal={'pin-' + id}
                > {this.props.collectionData.images.map(image =>
                    <ListImage imageData={image}/>
                )}
                    <div className="pin-list-title">{name}</div>
                </div>
                <ModalCollection collectionData={this.props.collectionData} />
            </React.Fragment>
        );
    }
}

export default CollectionItem;
