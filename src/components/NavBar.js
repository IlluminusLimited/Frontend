import React, { Component } from 'react';
import SvgSettings from './svg/SvgSettings';
import SvgHome from './svg/SvgHome';
import SvgCollections from './svg/SvgCollections';

class NavBar extends Component {
    render() {
        return (
            <nav class="footer-nav full-bleed">
                <a class="nav-icon" href="/snippits.html">
                    <SvgSettings />
                    <span>settings</span>
                </a>
                <a class="nav-icon" href="/index.html">
                    <SvgHome />
                    <span>home</span>
                </a>
                <a class="nav-icon" href="/login.html">
                    <SvgCollections />
                    <span>profile</span>
                </a>
            </nav>
        );
    }
}

export default NavBar;
