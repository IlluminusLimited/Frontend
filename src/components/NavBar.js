import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import SvgSettings from './svg/SvgSettings';
import SvgHome from './svg/SvgHome';
import SvgCollections from './svg/SvgCollections';

class NavBar extends Component {
    render() {
        return (
            <footer className="container">
                <div className="footer-nav-wrapper full-bleed container">
                    <nav className="footer-nav">
                        <NavLink className="nav-icon" to="/login">
                            <SvgSettings />
                            <span>settings</span>
                        </NavLink>
                        <NavLink className="nav-icon" to="/">
                            <SvgHome />
                            <span>home</span>
                        </NavLink>
                        <NavLink className="nav-icon" to="/collections">
                            <SvgCollections />
                            <span>collections</span>
                        </NavLink>
                    </nav>
                </div>
            </footer>
        );
    }
}

export default NavBar;
