import React, { Component } from 'react';
import CollectionListItem from './CollectionListItem';
import SvgAdd from './svg/SvgAdd';
import LoadMoreButton from './LoadMoreButton';
import HeaderNav from './HeaderNav';

class MyCollections extends Component {
    state = {
        collections: [],
        pageLink: ''
    };

    fetchMoreCollections() {
        const userId = '6f22c875-f795-436b-8528-e1cb9e35a412';
        // const userId = sessionStorage.getItem('pinster-user-id');
        fetch(process.env.REACT_APP_API_URL + `/v1/users/${userId}/collections`, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('pinsterUserToken')
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
                // Display the pins
                this.setState(prevState => {
                    return {
                        collections: [...prevState.collections, ...response.data],
                        pageLink: response.links.next ? response.links.next : ''
                    };
                });
            });
    }

    componentDidMount() {
        this.fetchMoreCollections();
    }

    render() {
        return (
            <React.Fragment>
                <HeaderNav label="My Collections" modal={true} history={this.props.history} />
                <main className="container">
                    <div className="pin-collection">
                        {Object.keys(this.state.collections).map(key => (
                            <CollectionListItem
                                key={key}
                                userId={this.props.userId}
                                collectionData={this.state.collections[key]}
                                history={this.props.history}
                            />
                        ))}
                        <div className="pin-list-item add-new" onClick={this.addNewCollection}>
                            <SvgAdd classType="white pin-list-img" />
                            <div class="pin-list-title">add new collection</div>
                        </div>
                    </div>
                    <LoadMoreButton
                        pageLink={this.state.pageLink}
                        fetchMoreItems={this.fetchMoreCollections}
                    />
                </main>
            </React.Fragment>
        );
    }
}

export default MyCollections;
