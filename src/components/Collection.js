import React, { Component } from 'react';
import Pin from './Pin';

class Collection extends Component {
    render() {
        return (
            <main className="container">
                {/* <header className="Collection-header">
                    <img src={logo} className="Collection-logo" alt="logo" />
                    <h1 className="Collection-title">Welcome to React</h1>
                </header> */}
                <div className="pin-collection">
                    {this.props.collectionData.collectables.map(
                        (collectable, index) => (
                            <Pin
                                key={index}
                                pinData={collectable}
                                uiType="pin-modal-toggle"
                                history={this.props.history}
                            />
                        )
                    )}
                </div>
            </main>
        );
    }
}

export default Collection;
