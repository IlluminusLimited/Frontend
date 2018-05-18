import React, { Component } from 'react';
import Modal from './Modal';

class Pin extends Component {
    render() {
        const { id, name, img, description } = { ...this.props.pinData };
        return (
            <React.Fragment>
                <div
                    className="pin-list-item pin-modal-toggle"
                    data-modal={'pin-' + id}
                >
                    <img
                        className="pin-list-img"
                        src={'./img/fpo-pins/' + img}
                        alt={description}
                    />
                    <div className="pin-list-title">{name}</div>
                </div>
                <Modal pinData={this.props.pinData} />
            </React.Fragment>
        );
    }
}

export default Pin;
