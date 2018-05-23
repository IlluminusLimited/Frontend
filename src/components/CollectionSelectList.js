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
                        console.log(response);
                        // console.log(innerResponse);
                        const collectionOptions = response.map(col => {
                            return {
                                value: col.id,
                                label: col.name
                            };
                        });
                        this.setState({
                            loaded: true,
                            collections: collectionOptions
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
        console.log(collections);
        let addToCollection = collections.filter(coll => {
            !this.state.selectedCollections.some(selColl => {
                return coll.id === selColl.id;
            });
        });
        let deleteFromCollection = this.state.selectedCollections.filter(coll => {
            !collections.some(selColl => {
                return coll.id === selColl.id;
            });
        });
        let urlToSend, httpMethod;
        if (addToCollection.length > 0) {
            urlToSend = `${process.env.REACT_APP_API_URL}/v1/collections/${
                addToCollection.value
            }/collectable_collections`;
            httpMethod = 'POST';
        }
        if (deleteFromCollection.length > 0) {
            urlToSend = `${process.env.REACT_APP_API_URL}/v1/collections/${
                deleteFromCollection.value
            }/collectable_collections`;
            httpMethod = 'DELETE';
        }
        fetch(
            `${process.env.REACT_APP_API_URL}/v1/collections/${
                addToCollection.value
            }/collectable_collections`,
            {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('pinster-user-token')
                },
                method: 'POST',
                body: JSON.stringify(this.prepData())
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
            .then(response => {
                console.log(response);
                this.setState({
                    selectedCollections: collections
                });
            });
    };

    componentDidUpdate() {
        console.log(this.state);
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
                        simpleValue
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
