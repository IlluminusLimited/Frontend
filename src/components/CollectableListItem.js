import React, { Component } from 'react';
import CollectableModal from './CollectableModal';
import Image from './Image';

class CollectableListItem extends Component {
    listItemType = () => {
        if (this.props.uiType === 'pin-modal-toggle') {
            return (
                <CollectableModal
                    key={this.props.uid}
                    collectableData={this.props.collectableData}
                    collectableType={this.props.collectableType}
                />
            );
        }
        return null;
    };

    resolveClick = () => {
        if (this.props.uiType === 'pin-page-toggle') {
            this.props.history.push(`/pin/${this.props.collectableData.id}`);
        }
    };

    render() {
        const {
            id,
            name,
            // year,
            // description,
            // tags,
            // created_at,
            // updated_at,
            images
            // url
        } = { ...this.props.collectableData };
        console.log(this.props.collectableData);
        return (
            <React.Fragment>
                <div
                    className={'pin-list-item ' + this.props.uiType}
                    data-modal={'pin-' + id}
                    onClick={this.resolveClick}
                >
                    <Image imageData={images[0]} imageClass="pin-list-img" />
                    <div className="pin-list-title">{name}</div>
                </div>
                {this.listItemType()}
            </React.Fragment>
        );
    }
}

export default CollectableListItem;
