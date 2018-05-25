import React, { Component } from 'react';
import Select from 'react-select';
import Loader from './Loader';

class CollectionSelectList extends Component {
    state = {
        loaded: false,
        collections: [],
        selectedCollections: [],
        collectableCollections: []
    };

    fetchUserCollections = () => {
        const userId = sessionStorage.getItem('pinster-user-id');
        fetch(`${process.env.REACT_APP_API_URL}/v1/users/${userId}/collections/summary`, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('pinster-user-token')
            }
        })
            .then(
                results => {
                    return results.json();
                },
                error => {
                    console.error(error);
                }
            )
            .then(response => {
                fetch(
                    `${process.env.REACT_APP_API_URL}/v1/${this.props.collectableType + 's'}/${
                        this.props.collectableId
                    }?with_collectable_collections=true`,
                    {
                        headers: {
                            Authorization: 'Bearer ' + localStorage.getItem('pinster-user-token')
                        }
                    }
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
                        const collectionOptions = response.map(col => {
                            return {
                                value: col.id,
                                label: col.name
                            };
                        });
                        let selectedCollectionOptions = [];
                        if (innerResponse.collectable_collections) {
                            selectedCollectionOptions = innerResponse.collectable_collections.map(
                                col => {
                                    let collLabel;
                                    collectionOptions.forEach(colOption => {
                                        if (colOption.value === col.collection_id) {
                                            collLabel = colOption.label;
                                        }
                                    });
                                    return {
                                        value: col.collection_id,
                                        label: collLabel
                                    };
                                }
                            );
                        }
                        this.setState({
                            loaded: true,
                            collections: collectionOptions,
                            selectedCollections: selectedCollectionOptions,
                            collectableCollections: innerResponse.collectable_collections
                                ? innerResponse.collectable_collections
                                : []
                        });
                    });
            });
    };

    addToCollection = (collectionToAdd, collectionOptions) => {
        const urlToSend = `${process.env.REACT_APP_API_URL}/v1/collections/${
            collectionToAdd[0].value
        }/collectable_collections`;
        const uppercaseCollectableType =
            this.props.collectableType.charAt(0).toUpperCase() +
            this.props.collectableType.slice(1);
        const httpBody = {
            data: {
                collectable_type: uppercaseCollectableType,
                collectable_id: this.props.collectableId,
                collection_id: collectionToAdd[0].value,
                count: 1
            }
        };
        fetch(urlToSend, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('pinster-user-token'),
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(httpBody)
        })
            .then(
                results => {
                    return results.json();
                },
                error => {
                    console.error(error);
                }
            )
            .then(response => {
                this.setState(prevState => {
                    return {
                        selectedCollections: collectionOptions,
                        collectableCollections: [...prevState.collectableCollections, response]
                    };
                });
            });
    };

    deleteFromCollection = (collectionToDeleteFrom, collectionOptions) => {
        const collectableCollectionToDelete = this.state.collectableCollections.filter(collColl => {
            return (
                collColl.collection_id === collectionToDeleteFrom[0].value &&
                collColl.collectable_id === this.props.collectableId
            );
        });
        const urlToSend = `${process.env.REACT_APP_API_URL}/v1/collectable_collections/${
            collectableCollectionToDelete[0].id
        }`;
        fetch(urlToSend, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('pinster-user-token')
            },
            method: 'DELETE'
        })
            .then(
                results => {
                    return results;
                },
                error => {
                    console.error(error);
                }
            )
            .then(response => {
                this.setState(prevState => {
                    const newCollectableCollections = prevState.collectableCollections.filter(
                        prevCollColl => {
                            return prevCollColl.id !== collectableCollectionToDelete.id;
                        }
                    );
                    return {
                        selectedCollections: collectionOptions,
                        collectableCollections: newCollectableCollections
                    };
                });
            });
    };

    handleSelectChange = collections => {
        let collectionToAdd = collections.filter(coll => {
            return !this.state.selectedCollections.some(selColl => {
                return coll.value === selColl.value;
            });
        });
        let collectionToDeleteFrom = this.state.selectedCollections.filter(coll => {
            return !collections.some(selColl => {
                return coll.value === selColl.value;
            });
        });
        if (collectionToAdd.length > 0) {
            this.addToCollection(collectionToAdd, collections);
        }
        if (collectionToDeleteFrom.length > 0) {
            this.deleteFromCollection(collectionToDeleteFrom, collections);
        }
    };

    componentDidMount() {
        this.fetchUserCollections();
    }

    render() {
        return (
            <React.Fragment>
                {this.state.loaded ? (
                    <Select
                        closeOnSelect
                        multi
                        onChange={this.handleSelectChange}
                        options={this.state.collections}
                        placeholder="Add to Collection(s)"
                        value={this.state.selectedCollections}
                    />
                ) : (
                    <Loader />
                )}
            </React.Fragment>
        );
    }
}

export default CollectionSelectList;
