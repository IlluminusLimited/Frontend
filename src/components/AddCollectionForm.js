import React, { Component } from 'react';
import CollectableDetails from './CollectableDetails';
import SvgClose from './svg/SvgClose';

class AddCollectionForm extends Component {
    state = {
        loaded: false,
        pinData: {}
    };

    makeFetch = () => {
        const userId = sessionStorage.getItem('pinster-user-id');
        fetch(process.env.REACT_APP_API_URL + `/v1/users/${userId}/collections`, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('pinsterUserToken'),
                'content-type': 'application/json'
            },
            method: 'POST',
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
            </form>
        );
    }
}

export default AddCollectionForm;
