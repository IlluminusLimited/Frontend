import React, { Component } from 'react';
import SvgSettings from './svg/SvgSettings';
import SvgHome from './svg/SvgHome';
import SvgCollections from './svg/SvgCollections';

class NavBar extends Component {
    render() {
        return (
            <footer className="container">
                <nav className="footer-nav full-bleed">
                    <a className="nav-icon" href="/snippits.html">
                        <SvgSettings />
                        <span>settings</span>
                    </a>
                    <a className="nav-icon" href="/">
                        <SvgHome />
                        <span>home</span>
                    </a>
                    <a className="nav-icon" href="/collections">
                        <SvgCollections />
                        <span>collections</span>
                    </a>
                </nav>
            </footer>
        );
    }
}

export default NavBar;
