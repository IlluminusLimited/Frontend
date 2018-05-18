import React, {Component} from 'react';
import SvgSearch from './svg/SvgSearch';
import App from './App';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        this.fetchResults(this.state.value);
        event.preventDefault();
    }

    fetchResults(query) {
        let url =new URL("http://localhost:3000/v1/search"),
            params = {query: query};
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
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
                console.log(response.data);
                this.setState({
                    results: response.data
                });
            });
    }

    render() {
        return (
            <header className="container">
                {/* <div className="header-util">
                    <span className="logo">pinster</span>
                </div> */}
                <form className="global-search-form" onSubmit={this.handleSubmit}>
                    {/* <label className="sr-only" for="search">
                            search
                        </label> */}
                    <div className="global-search-wrapper">
                        <button type="submit">
                            <SvgSearch/>
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
