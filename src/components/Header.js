import React, { Component } from 'react';
import SvgSearch from './svg/SvgSearch';

class Header extends Component {
    render() {
        return (
            <header className="container">
                {/* <div className="header-util">
                    <span className="logo">pinster</span>
                </div> */}
                <form className="global-search-form" action="/" method="post">
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
                            name="search"
                            placeholder="Search pins"
                            type="search"
                        />
                    </div>
                </form>
            </header>
        );
    }
}

export default Header;
