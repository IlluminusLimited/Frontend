import React, {Component} from 'react';

class ListImage extends Component {
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
                    className="image-list-img"
                    src={storage_location_uri}
                />
            </React.Fragment>
        );
    }
}

export default ListImage;
