import React, {Component} from 'react';
import ImageUploader from 'react-images-upload';
import HeaderNav from "./HeaderNav";

class CreatePin extends Component {

    constructor(props) {
        super(props);
        this.state = {output: {}, images: [], name: '', description: '', year: 2018, tags: {}};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onDrop = this.onDrop.bind(this);
    }

    onDrop(picture) {
        this.setState({
            images: this.state.images.concat(picture)
        });
    }

    parseTags = (event) => {
        try {
            const input = event.target;
            this.toggleActive(input);
            this.setState({tags: JSON.parse(input.value)})
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
        if (this.state.images.length === 0) {
            this.setState({output: "Must include all required fields and images!"});
            return;
        }

        console.log(data);

        fetch(process.env.REACT_APP_API_URL + '/v1/pins', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('pinsterUserToken'),
                'content-type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(data)
        })
            .then(
                results => {
                    const output = results.json();
                    this.setState({output: output});
                    return output;
                },
                error => {
                    console.error(error);
                    throw error;
                }
            )
            .then(response => {
                this.setState({
                    name: response.data.name,
                    description: response.data.description,
                    year: response.data.year,
                    tags: response.data.tags
                });
                return response.data;
            }).then(imageableData => {
            const imagePromises = this.state.images.map(image => {
                return this.postImage(imageableData, image);
            });

            Promise.all(imagePromises).then((responses) => {
                this.setState({output: [...this.state.output, JSON.stringify(responses)]});
            })
        }).catch(exception => {
            this.setState({output: JSON.stringify(exception)});
        });
    }

    postImage = (imageable, image) => {
        const body = {
            data: {
                metadata: {
                    user_id: sessionStorage.getItem('pinster-user-id'),
                    year: imageable.year,
                    imageable_type: 'Pin',
                    imageable_id: imageable.id
                },
                image: image
            }
        };

        fetch(process.env.REACT_APP_IMAGE_SERVICE_API_URL + '/images', {
            headers: {
                'content-type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(body)
        }).then(
            results => {
                console.log(results);
                let output = results.json();
                this.setState({output: [...this.state.output, output]});
                return output;
            },
            error => {
                console.error(error);
                this.setState({output: [...this.state.output, JSON.stringify(error)]});
                return JSON.stringify(error);
            }
        )
    };

    handleChange = (event) => {
        const input = event.target;
        const name = input.name;
        this.setState({[name]: input.value});
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
            .forEach(function (input) {
                form.toggleActive(input);
            });
    }

    // componentDidUpdate() {
    //     console.log(this.state.tags);
    // }

    render() {
        console.log(this.state);

        return (
            <React.Fragment>
                <HeaderNav history={this.props.history} label='Create Pin' modal={true}/>
                <main className="settings-page container sub-header-content">
                    <ImageUploader
                        withIcon={true}
                        buttonText='Choose images'
                        onChange={this.onDrop}
                        imgExtension={['.jpg', '.gif', '.png', '.gif']}
                        maxFileSize={5242880}
                        withPreview={true}
                    />
                    <br/>
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
                            <label htmlFor='tags'>tags</label>
                            <textarea
                                id="tags"
                                name="tags"
                                rows="8"
                                defaultValue={JSON.stringify(this.state.tags)}
                                onChange={this.parseTags}
                            />
                            <div>
                                <pre>{
                                    Object.keys(this.state.tags).length === 0 ? 'Example JSON: \n\n' + JSON.stringify({
                                        "tag_name": "tag_value",
                                        "tag_with_many_values": ["value", "value"]
                                    }, null, 2) : JSON.stringify(this.state.tags, null, 2)
                                }</pre>
                            </div>
                        </div>
                        <br/>
                        <br/>
                        <hr/>
                        <label htmlFor='output'>api output</label>
                        <div id='output'>
                            <pre>{JSON.stringify(this.state.output, null, 2)}</pre>
                        </div>

                        <div className="form-group form-action">
                            <input type="submit" id="submit" name="submit" value="save changes"/>
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
    ;
}

export default CreatePin;
