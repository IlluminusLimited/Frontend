import React, { Component } from 'react';
import ImageUploader from 'react-images-upload';
import HeaderNav from './HeaderNav';
import Loader from './Loader';

class CreatePin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            output: [],
            submitting: false,
            images: [],
            name: '',
            description: '',
            year: '2018',
            tags: {},
            loading: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    onDrop = picture => {
        let self = this;
        let reader = new FileReader();
        reader.readAsDataURL(picture[0]);
        reader.onload = function() {
            console.log(reader.result);
            self.setState({
                images: self.state.images.concat(reader.result)
            });
        };
        reader.onerror = function(error) {
            console.log('Error: ', error);
        };
    };

    parseTags = event => {
        try {
            const input = event.target;
            this.toggleActive(input);
            this.setState({ tags: JSON.parse(input.value) });
        } catch (e) {
            console.log(`Json was invalid: ${e}`);
        }
    };

    prepData() {
        return {
            data: {
                name: this.state.name,
                description: this.state.description,
                year: 2018,
                tags: this.state.tags
            }
        };
    }

    toggleActive(input) {
        if (input.value !== '') {
            input.parentNode.classList.add('active');
        } else {
            input.parentNode.classList.remove('active');
        }
    }

    postForm(data) {
        this.setState({ output: {}, submitting: true, loading: true });
        if (this.state.images.length === 0) {
            this.setState(prevState => {
                return {
                    output: [...prevState.output, 'Must include all required fields and images!'],
                    submitting: false
                };
            });
            return;
        }

        console.log(data);

        fetch(process.env.REACT_APP_API_URL + '/v1/pins', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('pinster-user-token'),
                'content-type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(data)
        })
            .then(
                results => {
                    const output = results.json();
                    this.setState(prevState => {
                        return {
                            output: [...prevState.output, output]
                        };
                    });
                    return output;
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

                Promise.all(imagePromises).then(responses => {
                    this.setState(prevState => {
                        return {
                            images: [],
                            name: '',
                            description: '',
                            year: '2018',
                            tags: {},
                            output: [...prevState.output, responses],
                            submitting: false,
                            loading: false
                        };
                    });
                });
            })
            .catch(exception => {
                this.setState(prevState => {
                    return {
                        output: [...prevState.output, exception],
                        submitting: false
                    };
                });
            });
    }

    postImage = (imageable, base64Image) => {
        const body = {
            data: {
                metadata: {
                    user_id: sessionStorage.getItem('pinster-user-id'),
                    imageable_type: 'Pin',
                    imageable_id: imageable.id
                },
                image: base64Image
            }
        };

        return fetch(process.env.REACT_APP_IMAGE_SERVICE_API_URL, {
            headers: {
                'content-type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(body)
        }).then(
            results => {
                console.log(results);
                let output = results.json();
                this.setState(prevState => {
                    return {
                        output: [...prevState.output, output]
                    };
                });
            },
            error => {
                console.error(error);
                this.setState(prevState => {
                    return {
                        output: [...prevState.output, error]
                    };
                });
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
        document
            .querySelectorAll('.form-group input, .form-group textarea')
            .forEach(function(input) {
                form.toggleActive(input);
            });
    }

    // componentDidUpdate() {
    //     console.log(this.state.tags);
    // }

    render() {
        // console.log(this.state);

        return (
            <React.Fragment>
                <HeaderNav history={this.props.history} label="Create Pin" modal={true} />
                <main className="settings-page container">
                    <ImageUploader
                        withIcon={true}
                        buttonText="Choose images"
                        onChange={this.onDrop}
                        imgExtension={['.jpg', '.JPG', '.jpeg', '.JPEG', '.gif', '.GIF', '.png', '.PNG']}
                        maxFileSize={5242880}
                        withPreview={true}
                    />
                    <br />
                    <form className="my-settings" onSubmit={this.handleSubmit}>
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
                            <label htmlFor="tags">tags</label>
                            <textarea
                                id="tags"
                                name="tags"
                                rows="8"
                                defaultValue={JSON.stringify(this.state.tags)}
                                onChange={this.parseTags}
                            />
                            <div>
                                <pre>
                                    {Object.keys(this.state.tags).length === 0
                                        ? 'Example JSON: \n\n' +
                                          JSON.stringify(
                                              {
                                                  tag_name: 'tag_value',
                                                  tag_with_many_values: ['value', 'value']
                                              },
                                              null,
                                              2
                                          )
                                        : JSON.stringify(this.state.tags, null, 2)}
                                </pre>
                            </div>
                        </div>
                        <br />
                        <br />
                        <hr />
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
