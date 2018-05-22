import React, { Component } from 'react';
import HeaderNav from './HeaderNav';

class AddCollectionForm extends Component {
    state = {
        loaded: false,
        name: '',
        description: ''
    };

    toggleActive = input => {
        if (input.value !== '') {
            input.parentNode.classList.add('active');
        } else {
            input.parentNode.classList.remove('active');
        }
    };

    prepData = () => {
        return {
            data: {
                name: this.state.name,
                description: this.state.description
            }
        };
    };

    createCollection = data => {
        const userId = sessionStorage.getItem('pinster-user-id');
        fetch(process.env.REACT_APP_API_URL + `/v1/users/${userId}/collections`, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('pinster-user-token'),
                'content-type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(this.prepData())
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
                    name: response.name,
                    description: response.description
                });
                this.props.history.push('/collections');
            });
    };

    handleChange = event => {
        event.preventDefault();
        const input = event.target;
        const name = input.name;
        this.setState({ [name]: input.value });
        this.toggleActive(input);
    };

    handleSubmit = event => {
        event.preventDefault();
        this.createCollection();
    };

    componentDidMount() {
        const form = this;
        document
            .querySelectorAll('.form-group input, .form-group textarea')
            .forEach(function(input) {
                form.toggleActive(input);
            });
    }

    render() {
        return (
            <React.Fragment>
                <HeaderNav label="Add a Collection" modal={false} history={this.props.history} />
                <main className="settings-page container">
                    <form className="my-settings" onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">collection name</label>
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
                                defaultValue={this.state.description}
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
                    </form>
                </main>
            </React.Fragment>
        );
    }
}

export default AddCollectionForm;
