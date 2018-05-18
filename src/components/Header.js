import React, { Component } from 'react';
import SvgSearch from './svg/SvgSearch';

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
        alert('A name was submitted: ' + this.state.value);
        event.preventDefault();
    }

    render() {
        return (
            <header className="container">
                {/* <div className="header-util">
                    <span className="logo">pinster</span>
                </div> */}
                <form className="global-search-form" onSubmit={this.handleSubmit} >
                    {/* <label className="sr-only" for="search">
                            search
                        </label> */}
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
                        />
                    </div>
                </form>
            </header>
        );
    }
}

export default Header;
