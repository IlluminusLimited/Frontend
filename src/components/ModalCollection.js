import React, { Component } from 'react';
import SvgClose from './svg/SvgClose';
import ModalImage from './ModalImage';

class ModalCollection extends Component {
    openModal = toggle => {
        let modalCollection = document.querySelector(
            '#' + toggle.getAttribute('data-modal')
        );
        modalCollection.classList.add('active');
        document.querySelector('.modal-overlay').classList.add('active');
        document.querySelector('html').classList.add('no-scroll');
    };
    closeModal = () => {
        document.querySelector('html').classList.remove('no-scroll');
        document.querySelector('.modal-overlay').classList.remove('active');
        document.querySelectorAll('.pin-modal.active').forEach(modalCollection => {
            modalCollection.classList.remove('active');
        });
    };
    componentDidMount() {
        // close modalCollection on overlay click
        document.querySelector('.modal-overlay')
            .addEventListener('click', () => {
                this.closeModal();
            });

        // close open modalCollection on ESC
        document.addEventListener('keyup', event => {
            if (event.defaultPrevented) {
                return;
            }

            let key = event.key || event.keyCode;
            if (key === 'Escape' || key === 'Esc' || key === 27) {
                this.closeModal();
            }
        });

        // close modalCollection on dismiss click
        document.querySelectorAll('.pin-modal-dismiss').forEach(dismiss => {
            dismiss.addEventListener('click', () => {
                this.closeModal();
            });
        });

        // open modalCollection on toggler click
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

                thumb.parentNode
                    .querySelectorAll('.pin-modal-thumb')
                    .forEach(elem => {
                        elem.classList.remove('active');
                    });
                thumb.classList.add('active');
            });
        });
    }
    componentWillUnmount() {}
    render() {
        const {
            id,
            name,
            description,
            created_at,
            updated_at,
            images,
            url
        } = { ...this.props.collectionData };
        return (
            <div
                id={'pin-' + id}
                className="pin-modal"
                aria-hidden="true"
                aria-labelledby={'title-' + id}
                role="dialog"
            >
                <div className="pin-modal-container" role="document">
                    <div className="pin-modal-viewer">
                        <ModalImage imageData={this.props.collectionData.images[0]}/>
                    </div>
                    <div className="pin-modal-content">
                        <h1 id={'title-' + id}>{name}</h1>
                        <p>{description}</p>
                        <div className="pin-modal-thumbs">
                            {this.props.collectionData.images.map(image =>
                                <div className="pin-modal-thumb">
                                    <ModalImage imageData={image}/>
                                </div>
                            )}

                        </div>
                    </div>
                </div>
                <button className="pin-modal-dismiss">
                    <SvgClose />
                </button>
            </div>
        );
    }
}

export default ModalCollection;
