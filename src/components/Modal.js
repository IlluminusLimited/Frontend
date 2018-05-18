import React, { Component } from 'react';
import SvgClose from './svg/SvgClose';
import Tag from './Tag';
import ModalImage from './ModalImage';

class Modal extends Component {
    openModal = toggle => {
        let modal = document.querySelector(
            '#' + toggle.getAttribute('data-modal')
        );
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
        document
            .querySelector('.modal-overlay')
            .addEventListener('click', () => {
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
            year,
            description,
            tags,
            created_at,
            updated_at,
            images,
            url
        } = { ...this.props.pinData };
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
                        <ModalImage imageData={this.props.pinData.images[0]}/>
                    </div>
                    <div className="pin-modal-content">
                        <h1 id={'title-' + id}>{name}</h1>
                        <p>{description}</p>
                        <p>{year}</p>
                        <div className="pin-modal-tags">
                             {Object.keys(tags).map(key => (
                                <Tag
                                    tagKey={key}
                                    tagName={tags[key]}
                                />
                            ))}
                        </div>
                        <div className="pin-modal-thumbs">
                            {this.props.pinData.images.map(image =>
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

export default Modal;
