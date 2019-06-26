import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import ImageUploader from "react-images-upload";
import HeaderNav from "./HeaderNav";
import Loader from "./Loader";

class CreatePin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      submitting: false,
      images: [],
      name: "",
      description: "",
      year: new Date().getFullYear(),
      uploadedCount: 0,
      loading: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onDrop = pictures => {
    let self = this;
    self.setState({ images: [] });
    pictures.forEach(picture => {
      let reader = new FileReader();
      reader.readAsDataURL(picture);
      reader.onload = function() {
        let imgList = self.state.images.concat(reader.result);
        self.setState({
          images: imgList.filter((value, index, memo) => memo.indexOf(value) === index)
        });
      };
      reader.onerror = function(error) {
        console.error(error);
      };
    });
  };

  prepData() {
    return {
      data: {
        name: this.state.name,
        description: this.state.description,
        year: parseInt(this.state.year)
      }
    };
  }

  toggleActive(input) {
    if (input.value !== "") {
      input.parentNode.classList.add("active");
    } else {
      input.parentNode.classList.remove("active");
    }
  }

  postForm(data) {
    this.setState({ message: "", submitting: true, loading: true });

    if (this.state.images.length === 0) {
      this.setState(prevState => {
        return {
          message: "Must include name and image!",
          loading: false,
          submitting: false
        };
      });
      return;
    }

    const { getAccessToken } = this.props.auth;
    fetch(process.env.REACT_APP_API_URL + "/v1/pins", {
      headers: {
        Authorization: "Bearer " + getAccessToken(),
        "content-type": "application/json"
      },
      method: "POST",
      body: JSON.stringify(data)
    })
      .then(
        response => {
          return response.json();
        },
        error => {
          console.error(error);
          throw error;
        }
      )
      .then(response => {
        return fetch(response.images_url, {
          headers: {
            Authorization: "Bearer " + getAccessToken(),
            "content-type": "application/json"
          },
          method: "POST"
        });
      })
      .then(
        response => {
          return response.json();
        },
        error => {
          console.error(error);
          throw error;
        }
      )
      .then(imageableData => {
        const imagePromises = this.state.images.map(base64Image => {
          return this.postImage(imageableData, base64Image);
        });

        Promise.all(imagePromises)
          .then(responses => {
            this.setState(prevState => {
              return {
                images: [],
                name: "",
                description: "",
                year: new Date().getFullYear(),
                message: "Pin Created",
                submitting: false,
                loading: false
              };
            });
          })
          .then(_data => {
            // toast
            this.props.history.push("/");
          });
      })
      .catch(exception => {
        this.setState(prevState => {
          console.error(exception);
          return {
            message: "whoops",
            loading: false,
            submitting: false
          };
        });
      });
  }

  postImage = (imageable, base64Image) => {
    const body = { data: { image: base64Image } };

    return fetch(imageable.image_service_url, {
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + imageable.image_service_token
      },
      method: "POST",
      body: JSON.stringify(body)
    }).then(
      response => {
        this.setState({ uploadedCount: this.state.uploadedCount + 1 });
        return response.json();
      },
      error => {
        console.error(error);
        throw error;
      }
    );
  };

  handleChange = event => {
    const input = event.target;
    const name = input.name;
    this.setState({ [name]: input.value });
    this.toggleActive(input);
  };

  handleSubmit(event) {
    this.postForm(this.prepData());
    event.preventDefault();
  }

  componentDidMount() {
    const form = this;
    document.querySelectorAll(".form-group input, .form-group textarea").forEach(function(input) {
      form.toggleActive(input);
    });
  }

  uploadCounter() {
    return (
      <div className="form-group copy-light copy-center">
        Uploaded image {this.state.uploadedCount} of {this.state.images.length}.
      </div>
    );
  }

  render() {
    const { isAuthenticated } = this.props.auth;

    if (!isAuthenticated()) {
      return <Redirect to="/login" />;
    }

    return (
      <React.Fragment>
        <HeaderNav history={this.props.history} label="Create Pin" modal={true} />

        <main className="settings-page container with-fixed-header">
          <div className="image-uploader">
            <ImageUploader
              withIcon={true}
              buttonText="Choose images"
              onChange={this.onDrop}
              imgExtension={[".jpg", ".JPG", ".jpeg", ".JPEG", ".gif", ".GIF", ".png", ".PNG"]}
              maxFileSize={5242880}
              withPreview={true}
            />
          </div>

          <form className="create-pin" onSubmit={this.handleSubmit}>
            {this.state.message ? <div className="form-group">{this.state.message}</div> : null}

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
                rows="4"
                onChange={this.handleChange}
                defaultValue={this.state.description}
              />
            </div>

            {this.state.loading ? this.uploadCounter() : null}
            {this.state.loading ? <Loader /> : null}

            <div className="form-group form-action">
              <input
                type="submit"
                id="submit"
                name="submit"
                disabled={this.state.submitting}
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
        </main>
      </React.Fragment>
    );
  }
}

export default CreatePin;
