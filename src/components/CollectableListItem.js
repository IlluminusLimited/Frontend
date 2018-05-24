import React, { Component } from 'react';
import CollectableModal from './CollectableModal';
import Image from './Image';
import Loader from './Loader';

class CollectableListItem extends Component {
    state = {
        collectableData: {}
    };

    listItemType = () => {
        if (this.props.uiType === 'pin-modal-toggle') {
            return (
                <CollectableModal
                    key={this.props.uid}
                    collectableData={this.state.collectableData}
                    collectableType={this.props.collectableType}
                    history={this.props.history}
                />
            );
        }
        return null;
    };

    fetchCollectableData = () => {
        const searchable = this.props.collectableData;
        if (searchable.searchable_type) {
            fetch(searchable.url)
                .then(
                    results => {
                        return results.json();
                    },
                    error => {
                        console.error(error);
                    }
                )
                .then(response => {
                    // Display the searchable
                    this.setState({
                        loaded: true,
                        collectableData: response
                    });
                });
        } else {
            this.setState({
                loaded: true,
                collectableData: searchable
            });
        }
    };

    resolveClick = () => {
        if (this.props.uiType === 'pin-page-toggle') {
            this.props.history.push(`/pin/${this.state.collectableData.id}`);
        }
    };

    componentDidMount() {
        this.fetchCollectableData();
    }

    render() {
        return (
            <React.Fragment>
                {this.state.loaded ? (
                    <React.Fragment>
                        <div
                            className={'pin-list-item ' + this.props.uiType}
                            data-modal={'pin-' + this.state.collectableData.id}
                            onClick={this.resolveClick}
                        >
                            <Image
                                imageData={this.state.collectableData.images[0]}
                                imageClass="pin-list-img"
                            />
                            <div className="pin-list-title">{this.state.collectableData.name}</div>
                        </div>
                        {this.listItemType()}
                    </React.Fragment>
                ) : (
                    <Loader />
                )}
            </React.Fragment>
        );
    }
}

export default CollectableListItem;
