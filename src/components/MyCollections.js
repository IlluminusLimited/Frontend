import React, { Component } from 'react';
import Collection from './Collection';

class MyCollections extends Component {
    state = {
        collections: []
    };

    makeFetch() {
        fetch(
            'https://api-dev.pinster.io/v1/users/441fa4b6-4a8f-4c01-8334-a348ceafc1c4/collections',
            {
                headers: {
                    Authorization: 'Bearer 729f0b555734beed00b07588a5616ad2'
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
            .then(response => {
                // Display the pins
                console.log(response.data);
                this.setState({
                    collections: response.data
                });
            });
    }

    componentDidMount() {
        this.makeFetch();
    }

    render() {
        return (
            <React.Fragment>
                <main className="container">
                    <div className="pin-collection">
                        {Object.keys(this.state.collections).map(key => (
                            <Collection
                                key={key}
                                collectionData={this.state.collections[key]}
                            />
                        ))}
                    </div>
                </main>
            </React.Fragment>
        );
    }
}

export default MyCollections;
