import React, { Component } from 'react';
import Pin from './Pin';

class CollectionPage extends Component {
    render() {
        return (
            <main className="container">
                <div className="pin-collection">
                    {Object.keys(this.props.pins).map(key => (
                        <Pin
                            key={key}
                            pinData={this.props.pins[key]}
                            uiType="pin-page-toggle"
                        />
                    ))}
                </div>
                <button className="load-more" onClick={this.loadMore} />
            </main>
        );
    }
}

export default CollectionPage;
