import React, { Component } from 'react';
import Select from 'react-select';
import Loader from './Loader';

class CollectionSelectList extends Component {
    state = {
        loaded: false,
        collections: [],
        value: []
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
                    `${process.env.REACT_APP_API_URL}/v1/${this.props.collectableType}/${
                        this.props.collectableId
                    }?with_collections=true`,
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
                        console.log(innerResponse);
                        this.setState(prevState => {
                            return {
                                loaded: true,
                                collections: response.data,
                                value: [...prevState.value, innerResponse]
                            };
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

    handleSelectChange = value => {
        console.log(value);
        fetch(`${process.env.REACT_APP_API_URL}/v1/collections/${value}/collectable_collections`, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('pinster-user-token')
            },
            method: 'POST',
            body: JSON.stringify(this.propData())
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
                console.log(response);
                // this.setState(prevState => {
                //     return {
                //     };
                // });
            });
    };

    componentDidMount() {
        this.fetchUserCollections();
    }

    render() {
        return (
            <React.Fragment>
                {this.state.loaded ? (
                    <Select
                        closeOnSelect={true}
                        multi
                        onChange={this.handleSelectChange}
                        options={this.state.collections}
                        placeholder="Add to Collection(s)"
                        value={this.state.value}
                    />
                ) : (
                    <Loader />
                )}
            </React.Fragment>
        );
    }
}

export default CollectionSelectList;
