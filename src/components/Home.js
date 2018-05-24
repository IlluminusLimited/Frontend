import React, { Component } from 'react';
import GlobalSearch from './GlobalSearch';
import CollectableListItem from './CollectableListItem';
import LoadMoreButton from './LoadMoreButton';
import Loader from './Loader';

class Home extends Component {
    state = {
        loaded: false,
        pins: [],
        pageLink: ''
    };

    fetchResults = query => {
        const urlType = query === '' ? 'pins' : 'search';
        let url = new URL(`${process.env.REACT_APP_API_URL}/v1/${urlType}`);
        const params = { query: query };
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
        fetch(url)
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
                if (response.data[0] && response.data[0].searchable_type) {
                    this.setState({
                        loaded: false,
                        pins: []
                    });
                    let allPromises = response.data.map(searchable => {
                        return fetch(searchable.url)
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
                                this.setState(prevState => {
                                    return {
                                        pins: [...prevState, response]
                                    };
                                });
                            });
                    });
                    Promise.all(allPromises).then(() => {
                        this.setState({
                            loaded: true
                        });
                    });
                } else {
                    this.setState({
                        loaded: true,
                        pins: response.data,
                        pageLink: response.links.next ? response.links.next : ''
                    });
                }
            });
    };

    fetchMorePins = () => {
        fetch(this.state.pageLink)
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
                        pins: [...prevState.pins, ...response.data],
                        pageLink: response.links.next ? response.links.next : ''
                    };
                });
            });
    };

    render() {
        return (
            <React.Fragment>
                <GlobalSearch fetchResults={this.fetchResults} />
                <main className="container">
                    <div className="pin-collection">
                        {this.state.loaded ? (
                            Object.keys(this.state.pins).map(key => (
                                <CollectableListItem
                                    key={key}
                                    uid={key}
                                    collectableData={this.state.pins[key]}
                                    uiType="pin-modal-toggle"
                                    collectableType="pin"
                                    history={this.props.history}
                                />
                            ))
                        ) : (
                            <Loader />
                        )}
                    </div>
                    <LoadMoreButton
                        pageLink={this.state.pageLink}
                        fetchMoreItems={this.fetchMorePins}
                    />
                </main>
            </React.Fragment>
        );
    }
}

export default Home;
