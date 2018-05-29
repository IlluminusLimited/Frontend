import React, { Component } from 'react';
import { Creatable } from 'react-select';
import HeaderNav from './HeaderNav';

class PinPage extends Component {
    state = {
        loaded: false,
        pinData: {},
        tags: [],
        selectedTags: []
    };

    prepData() {
        return {
            data: {
                display_name: this.state.display_name,
                bio: this.state.bio,
                email: this.state.email
            }
        };
    }

    putForm(data) {
        fetch(process.env.REACT_APP_API_URL + '/v1/me', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('pinster-user-token'),
                'content-type': 'application/json'
            },
            method: 'PUT',
            body: JSON.stringify(data)
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
                this.setState({
                    display_name: response.display_name,
                    bio: response.bio,
                    email: response.email
                });
            });
    }

    toggleActive(input) {
        if (input.value !== '') {
            input.parentNode.classList.add('active');
        } else {
            input.parentNode.classList.remove('active');
        }
    }

    handleChange(event) {
        const input = event.target;
        const name = input.name;
        this.setState({ [name]: input.value });
        this.toggleActive(input);
    }

    handleSubmit(event) {
        this.putForm(this.prepData());
        event.preventDefault();
    }

    makeFetch = () => {
        fetch(process.env.REACT_APP_API_URL + `/v1/pins/${this.props.match.params.pinId}`)
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

    componentDidMount() {
        this.makeFetch();
    }

    render() {
        return (
            <React.Fragment>
                <HeaderNav history={this.props.history} label="Edit" />
                <form className="edit-pin" onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            defaultValue={this.state.pinData.name}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="year">year</label>
                        <input
                            type="year"
                            id="year"
                            name="year"
                            defaultValue={this.state.pinData.year}
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
                            defaultValue={this.state.pinData.description}
                        />
                    </div>
                    <Creatable
                        multi
                        creatable
                        isLoading={this.state.loaded}
                        onChange={this.handleSelectChange}
                        options={this.state.tags}
                        placeholder="Tag(s)"
                        value={this.state.selectedTags}
                    />
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
                </form>
            </React.Fragment>
        );
    }
}

export default PinPage;
