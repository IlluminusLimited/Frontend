import React, { Component } from 'react';
import SvgClose from './svg/SvgClose';
import ModalImage from './ModalImage';

class ModalCollection extends Component {
    openModalCollection = toggle => {
        let modalCollection = document.querySelector(
            '#' + toggle.getAttribute('data-modalCollection')
        );
        modalCollection.classList.add('active');
        document.querySelector('.modalCollection-overlay').classList.add('active');
        document.querySelector('html').classList.add('no-scroll');
    };
    closeModalCollection = () => {
        document.querySelector('html').classList.remove('no-scroll');
        document.querySelector('.modalCollection-overlay').classList.remove('active');
        document.querySelectorAll('.pin-modalCollection.active').forEach(modalCollection => {
            modalCollection.classList.remove('active');
        });
    };
    componentDidMount() {
        // close modalCollection on overlay click


        // close open modalCollection on ESC
        document.addEventListener('keyup', event => {
            if (event.defaultPrevented) {
                return;
            }

            let key = event.key || event.keyCode;
            if (key === 'Escape' || key === 'Esc' || key === 27) {
                this.closeModalCollection();
            }
        });

        // close modalCollection on dismiss click
        document.querySelectorAll('.pin-modalCollection-dismiss').forEach(dismiss => {
            dismiss.addEventListener('click', () => {
                this.closeModalCollection();
            });
        });

        // open modalCollection on toggler click
        document.querySelectorAll('.pin-modalCollection-toggle').forEach(toggle => {
            toggle.addEventListener('click', () => {
                this.openModalCollection(toggle);
            });
        });

        // swap viewer images
        document.querySelectorAll('.pin-modalCollection-thumb').forEach(thumb => {
            thumb.addEventListener('click', () => {
                var viewer = thumb
                    .closest('.pin-modalCollection-container ')
                    .querySelector('.pin-modalCollection-viewer');
                viewer.querySelector('img').remove();
                viewer.append(thumb.querySelector('img').cloneNode());

                thumb.parentNode
                    .querySelectorAll('.pin-modalCollection-thumb')
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
                className="pin-modalCollection"
                aria-hidden="true"
                aria-labelledby={'title-' + id}
                role="dialog"
            >
                <div className="pin-modalCollection-container" role="document">
                    <div className="pin-modalCollection-viewer">
                        <ModalImage imageData={this.props.collectionData.images[0]}/>
                    </div>
                    <div className="pin-modalCollection-content">
                        <h1 id={'title-' + id}>{name}</h1>
                        <p>{description}</p>
                        <div className="pin-modalCollection-thumbs">
                            {this.props.collectionData.images.map(image =>
                                <div className="pin-modalCollection-thumb">
                                    <ModalImage imageData={image}/>
                                </div>
                            )}

                        </div>
                    </div>
                </div>
                <button className="pin-modalCollection-dismiss">
                    <SvgClose />
                </button>
            </div>
        );
    }
}

export default ModalCollection;
