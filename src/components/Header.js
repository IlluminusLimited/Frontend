import React, { Component } from 'react';
import SvgSearch from './svg/SvgSearch';

class Header extends Component {
    state = { value: '' };

    handleChange = event => {
        this.setState({ value: event.target.value });
    };

    handleSubmit = event => {
        event.preventDefault();
        this.fetchResults(this.state.value);
    };

    fetchResults = query => {
        let url = new URL('http://api-dev.pinster.io/v1/search'),
            params = { query: query };
        Object.keys(params).forEach(key =>
            url.searchParams.append(key, params[key])
        );
        fetch(url)
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
                console.log(response);
                this.props.updatePins(response);
            });
    };

    render() {
        return (
            <header className="container">
                {/* <div className="header-util">
                    <span className="logo">pinster</span>
                </div> */}

                <form
                    className="global-search-form full-bleed container"
                    onSubmit={this.handleSubmit}
                >
                    <label className="sr-only" for="search">
                        search
                    </label>
                    <div className="global-search-wrapper">
                        <button type="submit">
                            <SvgSearch />
                            <span className="sr-only">Submit</span>
                        </button>
                        <input
                            id="search"
                            name="query"
                            placeholder="Search pins"
                            type="search"
                            value={this.state.value}
                            onChange={this.handleChange}
                        />
                    </div>
                </form>
            </header>
        );
    }
}

export default Header;
