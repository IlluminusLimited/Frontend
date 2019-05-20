import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import SettingsForm from "./SettingsForm";
import HeaderNav from "./HeaderNav";

class Settings extends Component {
  state = {
    loaded: false,
    data: {}
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
    const { isAuthenticated } = this.props.auth;

    if (!isAuthenticated()) {
      return <Redirect to="/login" />;
    }

    return (
      <React.Fragment>
        <HeaderNav history={this.props.history} label="Settings" />
        <main className="settings-page container with-fixed-header">
          <SettingsForm auth={this.props.auth} data={this.state.data} history={this.props.history} />
        </main>
      </React.Fragment>
    );
  }
}

export default Settings;
