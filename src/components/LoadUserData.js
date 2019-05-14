import { Component } from "react";

class LoadUserData extends Component {
  fetchUserData = () => {
    fetch(process.env.REACT_APP_API_URL + "/v1/me", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("pinster-user-token")
      }
    })
      .then(
        results => {
          return results.json();
        },
        error => {
          console.error(error);
        }
      )
      .then(response => {
        Object.keys(response).forEach(key => {
          sessionStorage.setItem(`pinster-user-${key}`, response[key]);
        });
      });
  };

  componentDidMount() {
    if (localStorage.getItem("pinster-user-token")) {
      this.fetchUserData();
    }
  }

  render() {
    return null;
  }
}

export default LoadUserData;
