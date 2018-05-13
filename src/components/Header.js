import React, { Component } from 'react';
import SvgSearch from './svg/SvgSearch';

class Header extends Component {
    render() {
        return (
            <header class="container">
                <div class="header-util">
                    <span class="logo">pinster</span>
                    <nav class="header-util-nav">
                        <a href="/">home</a>
                        <a href="/snippits.html">about</a>
                        <a href="/snippits.html">support</a>
                    </nav>
                </div>
                <div class="large-header full-bleed container">
                    <form class="global-search-form" action="/" method="post">
                        <label class="sr-only" for="search">
                            search
                        </label>
                        <div class="global-search-wrapper">
                            <button type="submit">
                                <SvgSearch />
                                <span class="sr-only">Submit</span>
                            </button>
                            <input
                                id="search"
                                name="search"
                                placeholder="Search pins"
                                type="search"
                            />
                        </div>
                    </form>
                </div>
            </header>
        );
    }
}

export default Header;
