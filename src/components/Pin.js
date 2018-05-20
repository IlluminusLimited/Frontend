import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Modal from './Modal';
import Image from './Image';

class Pin extends Component {
    pinListType = () => {
        let retVal;
        switch (this.props.uiType) {
            case 'pin-modal-toggle':
                retVal = (
                    <Modal key={this.props.uid} pinData={this.props.pinData} />
                );
                break;
            case 'pin-page-toggle':
            default:
                retVal = null;
                break;
        }
        return retVal;
    };

    resolveClick = () => {
        if (this.props.uiType === 'pin-page-toggle') {
            this.props.history.push(`/pin/${this.props.pinData.id}`);
        }
    };

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
                    className={'pin-list-item ' + this.props.uiType}
                    data-modal={'pin-' + id}
                    onClick={this.resolveClick}
                >
                    <Image imageData={images[0]} imageClass="pin-list-img" />
                    <div className="pin-list-title">{name}</div>
                </div>
                {this.pinListType()}
            </React.Fragment>
        );
    }
}

export default Pin;
