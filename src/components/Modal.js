import React, { Component } from 'react';
import SvgClose from './svg/SvgClose';
import Tag from './Tag';

class Modal extends Component {
    openModal = toggle => {
        var modal = document.querySelector(
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

            var key = event.key || event.keyCode;
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
        const { id, name, img, description, maker, year, tags } = {
            ...this.props.pinData
        };
        return (
            <div className="modal-overlay" tabIndex="-1">
                <div
                    id={'pin-' + id}
                    className="pin-modal"
                    aria-hidden="true"
                    aria-labelledby={'title-' + id}
                    role="dialog"
                >
                    <div className="pin-modal-container" role="document">
                        <div className="pin-modal-viewer">
                            <img
                                className="pin-modal-img"
                                src={'./img/fpo-pins/' + img}
                                alt={description}
                            />
                        </div>
                        <div className="pin-modal-content">
                            <h1 id={'title-' + id}>{name}</h1>
                            <p>{description}</p>
                            <p>{maker}</p>
                            <p>{year}</p>
                            <div className="pin-modal-tags">
                                {/* {Object.keys(tags).map(key => (
                                <Tag
                                    key={key}
                                    tagName={tags[key]}
                                />
                            ))} */}
                            </div>
                            <div className="pin-modal-thumbs">
                                <div className="pin-modal-thumb active">
                                    <img
                                        className="pin-modal-img"
                                        src={'./img/fpo-pins/' + img}
                                        alt={description}
                                    />
                                </div>
                                <div className="pin-modal-thumb">
                                    <img
                                        className="pin-modal-img"
                                        src="//via.placeholder.com/350x250/3ebeae/ffffff"
                                        alt=""
                                    />
                                </div>
                                <div className="pin-modal-thumb">
                                    <img
                                        className="pin-modal-img"
                                        src="//via.placeholder.com/250x350/fdba1b/ffffff"
                                        alt=""
                                    />
                                </div>
                                <div className="pin-modal-thumb">
                                    <img
                                        className="pin-modal-img"
                                        src="//via.placeholder.com/450x250/e86359/ffffff"
                                        alt=""
                                    />
                                </div>
                                <div className="pin-modal-thumb">
                                    <img
                                        className="pin-modal-img"
                                        src="//via.placeholder.com/250x350/440933/ffffff"
                                        alt=""
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <button className="pin-modal-dismiss">
                        <SvgClose />
                    </button>
                </div>
            </div>
        );
    }
}

export default Modal;
