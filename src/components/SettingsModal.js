import React, { Component } from 'react';
import CollectableDetails from './CollectableDetails';
import SvgClose from './svg/SvgClose';

class Modal extends Component {
    openModal = toggle => {
        let modal = document.querySelector('#' + toggle.getAttribute('data-modal'));
        modal.classList.add('active');
        document.querySelector('.modal-overlay').classList.add('active');
        document.querySelector('html').classList.add('no-scroll');
    };
    closeModal = () => {
        document.querySelector('html').classList.remove('no-scroll');
        document.querySelector('.modal-overlay').classList.remove('active');
        document.querySelectorAll('.pin-modal.active').forEach(modal => {
            modal.classList.remove('active');
        });
    };
    componentDidMount() {
        // close modal on overlay click
        document.querySelector('.modal-overlay').addEventListener('click', () => {
            this.closeModal();
        });

        // close open modal on ESC
        document.addEventListener('keyup', event => {
            if (event.defaultPrevented) {
                return;
            }

            let key = event.key || event.keyCode;
            if (key === 'Escape' || key === 'Esc' || key === 27) {
                this.closeModal();
            }
        });

        // close modal on dismiss click
        document.querySelectorAll('.pin-modal-dismiss').forEach(dismiss => {
            dismiss.addEventListener('click', () => {
                this.closeModal();
            });
        });

        // open modal on toggler click
        document.querySelectorAll('.pin-modal-toggle').forEach(toggle => {
            toggle.addEventListener('click', () => {
                this.openModal(toggle);
            });
        });

        // swap viewer images
        document.querySelectorAll('.pin-modal-thumb').forEach(thumb => {
            thumb.addEventListener('click', () => {
                var viewer = thumb
                    .closest('.pin-modal-container ')
                    .querySelector('.pin-modal-viewer');
                viewer.querySelector('img').remove();
                viewer.append(thumb.querySelector('img').cloneNode());

                thumb.parentNode.querySelectorAll('.pin-modal-thumb').forEach(elem => {
                    elem.classList.remove('active');
                });
                thumb.classList.add('active');
            });
        });
    }

    render() {
        const {
            id
            // name,
            // year,
            // description,
            // tags,
            // created_at,
            // updated_at,
            // images,
            // url
        } = { ...this.props.collectableData };
        return (
            <div
                id={'pin-' + id}
                className="pin-modal"
                aria-hidden="true"
                aria-labelledby={'title-' + id}
                role="dialog"
            >
                <div className="pin-modal-container" role="document">
                    <CollectableDetails
                        collectableData={this.props.collectableData}
                        classType="pin-modal"
                        collectableType={this.props.collectableType}
                    />
                </div>
                <button className="pin-modal-dismiss">
                    <SvgClose />
                </button>
            </div>
        );
    }
}

export default Modal;
