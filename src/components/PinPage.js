import React, { Component } from "react";
import CollectableDetails from "./CollectableDetails";
import Loader from "./Loader";
import HeaderNav from "./HeaderNav";
import SvgEllipse from "./svg/SvgEllipse";

class PinPage extends Component {
  state = {
    loaded: false,
    pinData: {}
  };

  makeFetch = () => {
    fetch(
      process.env.REACT_APP_API_URL +
        `/v1/pins/${this.props.match.params.pinId}`
    )
      .then(
        results => {
          return results.json();
        },
        error => {
          console.error(error);
        }
      )
      .then(response => {
        // Display the pins
        this.setState({
          loaded: true,
          pinData: response
        });
      });
  };

  goToEditPin = () => {
    this.props.history.push(`/pins/${this.props.match.params.pinId}/edit`);
  };

  getModalOptions = () => {
    if(this.props.auth.hasPermission("update:pin")){
      return (
        <button
          className="header-nav-modal-toggle modal-toggle"
          data-modal="form-modal-nav"
          onClick={this.goToEditPin}
        >
          <SvgEllipse color={"white"} />
        </button>
      );
    } else {
      return <div />;
    }
  };

  componentDidMount() {
    this.makeFetch();
  }

  render() {
    return (
      <React.Fragment>
        <HeaderNav
          history={this.props.history}
          label={this.state.pinData.name}
          modalOptions={this.getModalOptions}
        />
        <main className="settings-page container ">
          <div className="pin-page">
            {this.state.loaded ? (
              <CollectableDetails
                collectableData={this.state.pinData}
                classType="pin"
                collectableType="pin"
              />
            ) : (
              <Loader />
            )}
          </div>
        </main>
      </React.Fragment>
    );
  }
}

export default PinPage;
