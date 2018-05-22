import React, { Component } from 'react';
import Header from './Header';
import CollectableListItem from './CollectableListItem';

class Home extends Component {
    state = {
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
                this.setState({
                    pins: response.data,
                    pageLink: response.links.next ? response.links.next : ''
                });
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
                <Header fetchResults={this.fetchResults} />
                <main className="container">
                    <div className="pin-collection">
                        {Object.keys(this.state.pins).map(key => (
                            <CollectableListItem
                                key={key}
                                uid={key}
                                collectableData={this.state.pins[key]}
                                uiType="pin-modal-toggle"
                                collectableType="pin"
                            />
                        ))}
                    </div>
                    {this.state.pageLink === '' ? null : (
                        <button className="btn-load-more" onClick={this.fetchMorePins}>
                            Load more
                        </button>
                    )}
                </main>
            </React.Fragment>
        );
    }
}

export default Home;
