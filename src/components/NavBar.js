import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import SvgSettings from "./svg/SvgSettings";
import SvgHome from "./svg/SvgHome";
import SvgProfile from "./svg/SvgProfile";
import SvgAdd from "./svg/SvgAdd";
import SvgRaccoon from "./svg/SvgRaccoon";
// import SvgCollections from "./svg/SvgCollections";

class NavBar extends Component {
  // {this.props.auth.isAuthenticated() ? (
  //   <NavLink className="nav-icon" to="/collections">
  //     <SvgCollections />
  //     <span>collections</span>
  //   </NavLink>
  // ) : null}

  render() {
    return (
      <footer className="container">
        <div className="footer-nav-wrapper full-bleed container">
          <nav className="footer-nav">
            <NavLink className="nav-icon" to="/">
              <SvgHome />
              <span>home</span>
            </NavLink>

            {this.props.auth.isAuthenticated() && this.props.auth.hasPermission("publish:pin") ? (
              <NavLink className="nav-icon" to="/unpublished">
                <SvgRaccoon />
                <span>publish</span>
              </NavLink>
            ) : null}

            {this.props.auth.isAuthenticated() && this.props.auth.hasPermission("create:pin") ? (
              <NavLink className="nav-icon" to="/pins/new">
                <SvgAdd />
                <span>add pin</span>
              </NavLink>
            ) : null}

            {this.props.auth.isAuthenticated() ? (
              <NavLink className="nav-icon" to="/profile">
                <SvgProfile />
                <span>profile</span>
              </NavLink>
            ) : null}

            {this.props.auth.isAuthenticated() ? null : (
              <NavLink className="nav-icon" to="/login">
                <SvgSettings />
                <span>login</span>
              </NavLink>
            )}
          </nav>
        </div>
      </footer>
    );
  }
}

export default NavBar;
