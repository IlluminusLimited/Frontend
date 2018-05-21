import React, { Component } from 'react';
import SettingsForm from './SettingsForm';
import Loader from './Loader';

class Settings extends Component {
    state = {
        loading: false,
    };

    makeFetch = () => {
        fetch(
            'https://api-dev.pinster.io/v1/me',
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
                    <SettingsForm data={this.state.data} />
                ) : (
                    <Loader />
                )}
            </main>
        );
    }
}

export default Settings;
