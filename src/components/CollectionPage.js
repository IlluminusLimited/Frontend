import React, { Component } from 'react';
import CollectableListItem from './CollectableListItem';
import Loader from './Loader';
import HeaderNav from './HeaderNav';

class CollectionPage extends Component {
    state = {
        loaded: false,
        collectionData: {},
        collectablesData: []
    };

    fetchPins = () => {
        fetch(
            process.env.REACT_APP_API_URL +
                `/v1/collections/${this.props.match.params.collectionId}`
        )
            .then(
                results => {
                    return results.json();
                },
                error => {
                    console.error(error);
                }
            )
            .then(response => {
                // Display the pins
                if (response.collectable_collections) {
                    response.collectable_collections.forEach(collectable => {
                        fetch(
                            process.env.REACT_APP_API_URL +
                                `/v1/${collectable.collectable_type.toLowerCase() + 's'}/${
                                    collectable.collectable_id
                                }`
                        )
                            .then(
                                results => {
                                    return results.json();
                                },
                                error => {
                                    console.error(error);
                                }
                            )
                            .then(innerResponse => {
                                // Display the pins
                                innerResponse.collectable_type = collectable.collectable_type;
                                this.setState(prevState => {
                                    return {
                                        loaded: true,
                                        collectionData: response,
                                        collectablesData: [
                                            ...prevState.collectablesData,
                                            innerResponse
                                        ]
                                    };
                                });
                            });
                    });
                } else {
                    this.setState({
                        loaded: true,
                        collectionData: response
                    });
                }
            });
    };

    componentDidMount() {
        this.fetchPins();
    }

    render() {
        return (
            <React.Fragment>
                <HeaderNav
                    label={this.state.collectionData.name}
                    modal={true}
                    history={this.props.history}
                />
                <main className="container sub-header-content">
                    <div className="pin-collection">
                        {this.state.loaded ? (
                            Object.keys(this.state.collectablesData).map(key => {
                                return (
                                    <CollectableListItem
                                        key={key}
                                        collectableData={this.state.collectablesData[key]}
                                        uiType="pin-page-toggle"
                                        collectableType={
                                            this.state.collectablesData[key].collectable_type
                                        }
                                        history={this.props.history}
                                    />
                                );
                            })
                        ) : (
                            <Loader />
                        )}
                    </div>
                    <button className="btn-load-more" onClick={this.fetchPins}>
                        Load more
                    </button>
                </main>
            </React.Fragment>
        );
    }
}

export default CollectionPage;
