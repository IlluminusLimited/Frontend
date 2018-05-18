import React, {Component} from 'react';

class ModalImage extends Component {
    render() {
        const {
            id,
            featured,
            storage_location_uri,
            url
        } = {...this.props.imageData};
        return (
            <React.Fragment>
                <img
                    className="pin-modal-img"
                    src={storage_location_uri}
                />
            </React.Fragment>
        );
    }
}

export default ModalImage;
