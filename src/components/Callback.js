import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Auth from "../lib/auth";
const auth = new Auth();

class Callback extends Component {

  constructor(props) {
    super(props);
    auth.handleAuthentication();
  }

  render() {
    return (
      <React.Fragment>
        <main>
          <Redirect to="/" />
        </main>
      </React.Fragment>
    );
  }
}

export default Callback;
