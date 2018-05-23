import React, { Component } from 'react';
import Select from 'react-select';
import Loader from './Loader';

class CollectionSelectList extends Component {
    state = {
        loaded: false,
        collections: [],
        selectedCollections: []
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
                        // console.log(response);
                        // console.log(innerResponse);
                        const collectionOptions = response.map(col => {
                            return {
                                value: col.id,
                                label: col.name
                            };
                        });
                        let selectedCollectionOptions = [];
                        if (innerResponse.collectable_collections) {
                            selectedCollectionOptions = innerResponse.map(col => {
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
                            });
                        }
                        // console.log(selectedCollectionOptions);
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

    prepData = () => {
        return {
            data: {
                collectable_type: this.props.collectableType,
                collectable_id: this.props.collectableId,
                count: 1
            }
        };
    };

    handleSelectChange = collections => {
        let addToCollection = collections.filter(coll => {
            return !this.state.selectedCollections.some(selColl => {
                return coll.value === selColl.id;
            });
        });
        let deleteFromCollection = this.state.selectedCollections.filter(coll => {
            return !collections.some(selColl => {
                return coll.id === selColl.value;
            });
        });
        let urlToSend, httpMethod, httpBody;
        if (addToCollection.length > 0) {
            urlToSend = `${process.env.REACT_APP_API_URL}/v1/collections/${
                addToCollection[0].value
            }/collectable_collections`;
            httpMethod = 'POST';
            const uppercaseCollectableType =
                this.props.collectableType.charAt(0).toUpperCase() +
                this.props.collectableType.slice(1);
            httpBody = {
                data: {
                    collectable_type: uppercaseCollectableType,
                    collectable_id: this.props.collectableId,
                    collection_id: addToCollection[0].value,
                    count: 1
                }
            };
        }
        if (deleteFromCollection.length > 0) {
            const collectableCollectionToDelete = this.state.collectable_collections.filter(
                collColl => {
                    return (
                        collColl.collection_id === deleteFromCollection[0].value &&
                        collColl.collectable_id === this.props.collectableId
                    );
                }
            );
            console.log(collectableCollectionToDelete);
            urlToSend = `${
                process.env.REACT_APP_API_URL
            }/v1/collectable_collections/${collectableCollectionToDelete}`;
            httpMethod = 'DELETE';
            httpBody = undefined;
        }
        fetch(urlToSend, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('pinster-user-token'),
                'Content-Type': 'application/json'
            },
            method: httpMethod,
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
                        collectableCollections: [...prevState.collectableCollections, response]
                    };
                });
            });
    };

    componentDidUpdate() {
        // console.log(this.state);
    }

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
