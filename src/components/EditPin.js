import React, { Component } from "react";
import HeaderNav from "./HeaderNav";
import Image from "./Image";
import Loader from "./Loader";

class EditPin extends Component {
  state = {
    message: "",
    loaded: false,
    pinData: {},
    tags: [],
    selectedTags: [],
    published: false,
    images: []
  };

  putForm = () => {
    this.setState({ message: "" });
    const putData = {
      data: {
        name: this.state.name,
        year: this.state.year,
        description: this.state.description,
        published: this.state.published,
        tags: this.state.tags
      }
    };
    const { getAccessToken } = this.props.auth;

    fetch(process.env.REACT_APP_API_URL + `/v1/pins/${this.props.match.params.pinId}`, {
      headers: {
        Authorization: "Bearer " + getAccessToken(),
        "content-type": "application/json"
      },
      method: "PUT",
      body: JSON.stringify(putData)
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
        // Toast that the save was successful
        this.setState({ message: "Success" });
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
    this.setState({
      message: "",
      [name]: input.value
    });
    this.toggleActive(input);
  };

  handleSubmit = event => {
    event.preventDefault();
    this.putForm();
  };

  onChangePublish = event => {
    this.setState({ published: !this.state.published });
  };

  makeFetch = () => {
    const { getAccessToken } = this.props.auth;
    fetch(process.env.REACT_APP_API_URL + `/v1/pins/${this.props.match.params.pinId}?published=all`, {
      headers: {
        Authorization: "Bearer " + getAccessToken(),
        "content-type": "application/json"
      }
    })
      .then(
        results => {
          console.log('initial', results);
          return results.json();
        },
        error => {
          console.error(error);
        }
      )
      .then(response => {
        console.dir(response);
        this.setState({
          loaded: true,
          name: response.name,
          year: response.year,
          description: response.description,
          tags: response.tags,
          published: response.published,
          images: response.images
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
    fetch(process.env.REACT_APP_API_URL + `/v1/pins/${this.props.match.params.pinId}`, {
      headers: {
        Authorization: "Bearer " + getAccessToken()
      },
      method: "DELETE"
    })
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
            <form className="pin-page sub-header-content" onSubmit={this.handleSubmit}>
              <div className="form-group pin-list-item pin-stack pin-stack-edit">
                {this.state.images.map(image => {
                  return <Image key={image.id} imageData={image} imageClass="pin-list-img" />;
                })}
              </div>
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
              <div className="form-group input-toggle">
                <input type="hidden" name="published" value="false" />
                <input
                  type="checkbox"
                  name="published"
                  id="published"
                  checked={this.state.published}
                  onChange={this.onChangePublish}
                />
                <label htmlFor="published">
                  {this.state.published ? "Published" : "Not Published"}
                </label>
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

            {this.props.auth.hasPermission("destroy:pin") ? (
              <div className="form-group form-misc">
                <button type="delete" id="delete" name="delete" onClick={this.deletePin}>
                  delete
                </button>
              </div>
            ) : null}
          </React.Fragment>
        ) : (
          <Loader />
        )}
      </main>
    );
  }
}

export default EditPin;
