import React, {Component} from 'react';
import ImageUploader from 'react-images-upload';
import HeaderNav from "./HeaderNav";

class CreatePin extends Component {

    constructor(props) {
        super(props);
        this.state = {output: {}, pictures: [], data: {name: '', description: '', year: 2018, tags: {}}};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onDrop = this.onDrop.bind(this);
    }

    onDrop(picture) {
        this.setState({
            pictures: this.state.pictures.concat(picture)
        });
    }

    parseTags = (event) => {
        event.preventDefault();
        try {
            const input = event.target;
            this.toggleActive(input);
            this.setState({data: {tags: JSON.parse(input.value)}})
        } catch (e) {
            console.log(`Json was invalid: ${e}`);
        }
    };

    prepData() {
        return {
            data: {
                name: this.state.data.name,
                description: this.state.data.description,
                year: 2018,
                tags: this.state.data.tags
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
                    this.setState({output: results.json()});
                    return results.json();
                },
                error => {
                    console.error(error);
                    this.setState({output: JSON.stringify(error)});
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

            this.postImage(imageableData);
        });
    }

    postImage = (imageable) => {

        const data = {}



        fetch(process.env.REACT_APP_IMAGE_SERVICE_API_URL + '/images/upload', {
            headers: {
                'content-type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(data))
    };

    handleChange(event) {
        const input = event.target;
        const name = input.name;
        this.setState({[name]: input.value});
        this.toggleActive(input);
    }

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

    componentDidUpdate() {
        console.log(this.state.data.tags);
    }

    render() {
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
                                defaultValue={this.state.tags}
                                onChange={this.parseTags}
                            />
                            <div>
                                <pre>{
                                    Object.keys(this.state.data.tags).length === 0 ? 'Example JSON: \n\n' + JSON.stringify({
                                        "tag_name": "tag_value",
                                        "tag_with_many_values": ["value", "value"]
                                    }, null, 2) : JSON.stringify(this.state.data.tags, null, 2)
                                }</pre>
                            </div>
                        </div>
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
    };
}

export default CreatePin;
