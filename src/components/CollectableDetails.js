import React, {Component} from 'react';
import Tag from './Tag';
import Image from './Image';
import CollectableListItem from './CollectableListItem';

class CollectableDetails extends Component {
    detailsType = () => {
        if (this.props.collectableType.toLowerCase() === 'assortment') {
            return (
                <div className="assortment-pin-list">
                    {this.props.collectableData.pins.map((pin, index) => {
                        return (
                            <CollectableListItem
                                key={index}
                                uid={index}
                                collectableData={pin}
                                uiType="pin-modal-toggle pin-modal-list"
                                collectableType="pin"
                            />
                        );
                    })}
                </div>
            );
        }

        return;
    };

    render() {
        const {
            id,
            name,
            year,
            description,
            tags,
            // created_at,
            // updated_at,
            images
            // url
        } = {...this.props.collectableData};
        return (
            <React.Fragment>
                <div className={this.props.classType + '-viewer'}>
                    {images ? (
                        <Image imageData={images[0]} imageClass={this.props.classType + '-img'}/>
                    ) : null}
                </div>
                <div className={this.props.classType + '-content'}>
                    <h1 id={'title-' + id}>{name}</h1>
                    <p>{description}</p>
                    <p>{year || 2018}</p>
                    <div className={this.props.classType + '-tags'}>
                        {Object.keys(tags).map(key => (
                            <Tag key={key} tagKey={key} tagName={tags[key]}/>
                        ))}
                    </div>
                    <div className={this.props.classType + '-thumbs'}>
                        {images.map((image, index) => {
                            if (index === 0) {
                                return <div key={index} className={this.props.classType + '-thumb active'}>
                                    <Image
                                        key={index}
                                        imageData={image}
                                        imageClass={this.props.classType + '-img'}
                                    />
                                </div>
                            }
                            return <div key={index} className={this.props.classType + '-thumb'}>
                                <Image
                                    key={index}
                                    imageData={image}
                                    imageClass={this.props.classType + '-img'}
                                />
                            </div>

                        })}
                    </div>
                    {this.detailsType()}
                </div>
            </React.Fragment>
        );
    }
}

export default CollectableDetails;
