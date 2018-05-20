import React, { Component } from 'react';
import SettingsForm from './SettingsForm';
import Loader from './Loader';

class Settings extends Component {
    state = {
        loading: false,
    };

    makeFetch = () => {
        fetch(
            'http://api-dev.pinster.io/v1/me',
            {
                headers: {
                    Authorization: 'Bearer 729f0b555734beed00b07588a5616ad2'
                }
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
                this.setState({
                    loading: true,
                    data: response
                });
            });
    };

    componentDidMount() {
        this.makeFetch();
    }

    render() {
        return (
            <main className="settings-page container">
                {this.state.loading ? (
                    <SettingsForm />
                ) : (
                    <Loader />
                )}
            </main>
        );
    }
}

export default Settings;
