import React, { Component } from 'react';

class LoadMoreButton extends Component {
    render() {
        return (
            <React.Fragment>
                {this.props.pageLink === '' ? null : (
                    <button className="btn-load-more" onClick={this.props.fetchMoreItems}>
                        Load more
                    </button>
                )}
            </React.Fragment>
        );
    }
}

export default LoadMoreButton;
