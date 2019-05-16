import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import SettingsForm from "./SettingsForm";
import Loader from "./Loader";
import HeaderNav from "./HeaderNav";

class Settings extends Component {
  state = {
    loaded: false,
    data: {}
  };

  isLoggedIn = () => {
    const { isAuthenticated } = this.props.auth;

    if (isAuthenticated()) {
      return this.state.loaded ? (
        <SettingsForm auth={this.props.auth} data={this.state.data} history={this.props.history} />
      ) : (
        <Loader />
      );
    }
    return <Redirect to="/login" />;
  };

  fetchUserData = () => {
    const { getAccessToken } = this.props.auth;

    fetch(process.env.REACT_APP_API_URL + "/v1/me", {
      headers: { Authorization: "Bearer " + getAccessToken() }
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({
          loaded: true,
          data: data
        });
      })
      .catch(error => {
        console.error(error);
      });
  };

  goToCreatePin = () => {
    this.props.history.push("/pins/new");
  };

  componentDidMount() {
    const { isAuthenticated } = this.props.auth;
    if (isAuthenticated()) {
      this.fetchUserData();
    }
  }

  render() {
    return (
      <React.Fragment>
        <HeaderNav history={this.props.history} label="Settings" />
        <main className="settings-page container with-fixed-header">{this.isLoggedIn()}</main>
      </React.Fragment>
    );
  }
}

export default Settings;
