import React, { Component } from "react";
import { Link } from "react-router-dom";

class SettingsForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.props.data,
      message: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  toggleActive(input) {
    if (input.value !== "") {
      input.parentNode.classList.add("active");
    } else {
      input.parentNode.classList.remove("active");
    }
  }

  prepData() {
    return {
      data: {
        display_name: this.state.display_name,
        bio: this.state.bio,
        email: this.state.email
      }
    };
  }

  putForm = data => {
    const { getAccessToken } = this.props.auth;
    this.setState({ message: "" });

    fetch(process.env.REACT_APP_API_URL + "/v1/me", {
      headers: {
        Authorization: "Bearer " + getAccessToken(),
        "content-type": "application/json"
      },
      method: "PUT",
      body: JSON.stringify(data)
    })
      .then(response => {
        return response.json();
      })
      .then(
        data => {
          return data;
        },
        error => {
          console.error(error);
        }
      )
      .then(response => {
        this.setState({
          message: "Success",
          display_name: response.display_name,
          bio: response.bio,
          email: response.email
        });
      });
  };

  handleChange(event) {
    const input = event.target;
    const name = input.name;
    this.setState({
      message: "",
      [name]: input.value
    });
    this.toggleActive(input);
  }

  handleSubmit(event) {
    this.putForm(this.prepData());
    event.preventDefault();
  }

  componentDidMount() {
    const form = this;
    document.querySelectorAll(".form-group input, .form-group textarea").forEach(function(input) {
      form.toggleActive(input);
    });
  }

  render() {
    return (
      <React.Fragment>
        <section>
          <form className="my-settings" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="display_name">display name</label>
              <input
                type="text"
                id="display_name"
                name="display_name"
                defaultValue={this.state.display_name}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="bio">bio</label>
              <textarea
                id="bio"
                name="bio"
                rows="8"
                onChange={this.handleChange}
                defaultValue={this.state.bio}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">email</label>
              <input
                type="email"
                id="email"
                name="email"
                defaultValue={this.state.email}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group form-action">
              <input type="submit" id="submit" name="submit" value="save changes" />
              <input
                type="reset"
                id="cancel"
                name="cancel"
                value="cancel"
                onClick={this.props.history.goBack}
              />
            </div>
            {this.state.message ? (
              <div className="form-group">
                <div className="tmp-toast">{this.state.message}</div>
              </div>
            ) : null}
          </form>
        </section>
        <section>
          <div className="form-group form-misc">
            <Link to="/logout" className="btn-flat">
              Logout
            </Link>
            <Link to="/legal" className="btn-flat">
              Legal
            </Link>
            <a href="http://pinster.io" className="btn-flat">
              Info
            </a>
            <a href="http://pinster.io/contact-us" className="btn-flat">
              Send Feedback
            </a>
          </div>
        </section>
      </React.Fragment>
    );
  }
}

export default SettingsForm;
