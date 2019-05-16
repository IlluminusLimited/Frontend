import React, { Component } from "react";
import { Creatable } from "react-select";
import HeaderNav from "./HeaderNav";
import Loader from "./Loader";

class PinPage extends Component {
  state = {
    loaded: false,
    pinData: {},
    tags: [],
    selectedTags: []
  };

  putForm = () => {
    const putData = {
      data: {
        name: this.state.name,
        year: this.state.year,
        description: this.state.description,
        tags: this.state.tags
      }
    };
    const { getAccessToken } = this.props.auth;

    fetch(
      process.env.REACT_APP_API_URL +
        `/v1/pins/${this.props.match.params.pinId}`,
      {
        headers: {
          Authorization: "Bearer " + getAccessToken(),
          "content-type": "application/json"
        },
        method: "PUT",
        body: JSON.stringify(putData)
      }
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
        // Toast that the save was successful
      });
  };

  toggleActive(input) {
    if (input.value !== "") {
      input.parentNode.classList.add("active");
    } else {
      input.parentNode.classList.remove("active");
    }
  }

  handleChange = event => {
    const input = event.target;
    const name = input.name;
    this.setState({ [name]: input.value });
    this.toggleActive(input);
  };

  handleSubmit = event => {
    event.preventDefault();
    this.putForm();
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
        this.setState({
          loaded: true,
          name: response.name,
          year: response.year,
          description: response.description,
          tags: response.tags
        });
        const form = this;
        document
          .querySelectorAll(".form-group input, .form-group textarea")
          .forEach(function(input) {
            form.toggleActive(input);
          });
      });
  };

  deletePin = () => {
    const { getAccessToken } = this.props.auth;
    fetch(
      process.env.REACT_APP_API_URL +
        `/v1/pins/${this.props.match.params.pinId}`,
      {
        headers: {
          Authorization: "Bearer " + getAccessToken()
        },
        method: "DELETE"
      }
    )
      .then(
        results => {
          return results;
        },
        error => {
          console.error(error);
        }
      )
      .then(response => {
        // Toast that the delete was successful
        this.props.history.push("/");
      });
  };

  componentDidMount() {
    this.makeFetch();
  }

  render() {
    return (
      <main className="settings-page container ">
        <HeaderNav history={this.props.history} label="Edit" />
        {this.state.loaded ? (
          <React.Fragment>
            <form
              className="pin-page sub-header-content"
              onSubmit={this.handleSubmit}
            >
              <div className="form-group">
                <label htmlFor="name">name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  defaultValue={this.state.name}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="year">year</label>
                <input
                  type="text"
                  id="year"
                  name="year"
                  defaultValue={this.state.year}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">description</label>
                <textarea
                  id="description"
                  name="description"
                  rows="8"
                  onChange={this.handleChange}
                  defaultValue={this.state.description}
                />
              </div>
              <div className="form-group">
                <Creatable
                  multi
                  creatable
                  onChange={this.handleSelectChange}
                  options={this.state.tags}
                  placeholder="Tag(s)"
                  value={this.state.selectedTags}
                />
              </div>
              <div className="form-group form-action">
                <input
                  type="submit"
                  id="submit"
                  name="submit"
                  value="save changes"
                />
                <input
                  type="reset"
                  id="cancel"
                  name="cancel"
                  value="cancel"
                  onClick={this.props.history.goBack}
                />
              </div>
            </form>

            { this.props.auth.hasPermission("destroy:pin") ? (
            <div className="form-group form-misc">
              <button
                type="delete"
                id="delete"
                name="delete"
                onClick={this.deletePin}
              >
                delete
              </button>
            </div>
            ) : null }
          </React.Fragment>
        ) : (
          <Loader />
        )}
      </main>
    );
  }
}

export default PinPage;
