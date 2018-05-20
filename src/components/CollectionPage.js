import React, { Component } from 'react';
import Pin from './Pin';
import Loader from './Loader';

class CollectionPage extends Component {
    state = {
        loading: false,
        collectionData: {},
        collectablesData: []
    };

    fetchPins = () => {
        fetch(
            `http://api-dev.pinster.io/v1/collections/${
                this.props.match.params.collectionId
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
            .then(response => {
                // Display the pins
                console.log(response);
                response.collectables.map(collectable => {
                    fetch(
                        `http://api-dev.pinster.io/v1/${collectable.collectable_type.toLowerCase() +
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
                            this.setState(prevState => {
                                return {
                                    loading: true,
                                    collectionData: response,
                                    collectablesData: [
                                        ...prevState.collectablesData,
                                        innerResponse
                                    ]
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
                    {this.state.loading ? (
                        Object.keys(this.state.collectablesData).map(key => {
                            return (
                                <Pin
                                    key={key}
                                    pinData={this.state.collectablesData[key]}
                                    uiType="pin-page-toggle"
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
