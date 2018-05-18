import React, {Component} from 'react';
// import logo from '../logo.svg';
import CollectionItem from './CollectionItem';

class Collection extends Component {
    state = {
        collections: []
    };

    makeFetch() {
        fetch('http://localhost:3000/v1/users/90e84a00-5331-4c96-9971-cd70a3385144/collections')
            .then(
                results => {
                    return results.json();
                },
                error => {
                    console.log('error');
                    console.log(error);
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
            <main className="container">
                {/* <header className="Collection-header">
                    <img src={logo} className="Collection-logo" alt="logo" />
                    <h1 className="Collection-title">Welcome to React</h1>
                </header> */}
                <div className="pin-collection">
                    {
                        Object.keys(this.state.collections).map(key => (
                            <CollectionItem key={key} collectionData={this.state.collections[key]}/>
                        ))
                    }
                </div>
            </main>
        );
    }
}

export default Collection;
