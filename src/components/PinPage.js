import React, { Component } from 'react';
import PinDetails from './PinDetails';

class PinPage extends Component {
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
            <div className="pin-page">
                <PinDetails pinData={this.props.pinData} classType="pin" />
            </div>
        );
    }
}

export default PinPage;
