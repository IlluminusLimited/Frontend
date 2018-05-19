import React, { Component } from 'react';
import Tag from './Tag';
import Image from './Image';

class PinDetails extends Component {
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
                <div className={this.props.classType + '-viewer'}>
                    <Image
                        imageData={images[0]}
                        imageClass={this.props.classType + '-img'}
                    />
                </div>
                <div className={this.props.classType + '-content'}>
                    <h1 id={'title-' + id}>{name}</h1>
                    <p>{description}</p>
                    <p>{year}</p>
                    <div className={this.props.classType + '-tags'}>
                        {Object.keys(tags).map(key => (
                            <Tag key={key} tagKey={key} tagName={tags[key]} />
                        ))}
                    </div>
                    <div className={this.props.classType + '-thumbs'}>
                        {images.map((image, index) => (
                            <div
                                key={index}
                                className={this.props.classType + '-thumb'}
                            >
                                <Image
                                    key={index}
                                    imageData={image}
                                    imageClass={this.props.classType + '-img'}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default PinDetails;
