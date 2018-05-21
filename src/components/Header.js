import React, { Component } from 'react';
import SvgSearch from './svg/SvgSearch';

class Header extends Component {
    state = { value: '' };

    handleChange = event => {
        this.setState({ value: event.target.value });
    };

    handleSubmit = event => {
        event.preventDefault();
        this.props.clearPins();
        this.fetchResults(this.state.value);
    };

    fetchResults = query => {
        let url = new URL(process.env.REACT_APP_API_URL + '/v1/search'),
            params = { query: query };
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
                console.log(response);
                this.setState(prevState => {
                    return undefined;
                });
                response.data.forEach(searchable => {
                    fetch(searchable.url)
                        .then(
                            results => {
                                return results.json();
                            },
                            error => {
                                console.error(error);
                            }
                        )
                        .then(innerResponse => {
                            // Display the searchable
                            this.props.updatePins({
                                pin: innerResponse,
                                pageLink: response.links.next ? response.links.next : undefined
                            });
                        });
                });
            });
    };

    componentDidMount() {
        this.fetchPins();
    }

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
                    <label className="sr-only" htmlFor="search">
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
