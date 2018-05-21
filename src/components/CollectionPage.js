import React, { Component } from 'react';
import CollectableListItem from './CollectableListItem';
import Loader from './Loader';

class CollectionPage extends Component {
    state = {
        loaded: false,
        collectionData: {},
        collectablesData: []
    };

    fetchPins = () => {
        fetch(process.env.REACT_APP_API_URL + `/v1/collections/${this.props.match.params.collectionId}`)
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
                console.log(response);
                response.collectables.forEach(collectable => {
                    fetch(
                        process.env.REACT_APP_API_URL + `/v1/${collectable.collectable_type.toLowerCase() +
                            's'}/${collectable.id}`
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
                            // console.log(response);
                            innerResponse.collectable_type = collectable.collectable_type;
                            this.setState(prevState => {
                                return {
                                    loaded: true,
                                    collectionData: response,
                                    collectablesData: [...prevState.collectablesData, innerResponse]
                                };
                            });
                        });
                });
            });
    };

    componentDidUpdate() {
        console.log(this.state);
    }

    componentDidMount() {
        this.fetchPins();
    }

    render() {
        return (
            <main className="container">
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
        );
    }
}

export default CollectionPage;
