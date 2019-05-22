import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Loader from "./Loader";

class Callback extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCount: 0
    };
  }

  componentDidMount() {
    var intervalId = setInterval(this.timer, 500);
    this.setState({ intervalId: intervalId });
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  timer = () => {
    this.setState({ currentCount: this.state.currentCount + 1 });
  };

  render() {
    return (
      <React.Fragment>
        <main className="settings-page container">
          {this.props.auth.isAuthenticated() ? <Redirect to="/" /> : <Loader />}
        </main>
      </React.Fragment>
    );
  }
}

export default Callback;
