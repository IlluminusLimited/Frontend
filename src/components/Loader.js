import React, { Component } from "react";

class Loader extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="loader">
          <div className="pip" />
          <div className="pip" />
          <div className="pip" />
        </div>
      </React.Fragment>
    );
  }
}

export default Loader;
