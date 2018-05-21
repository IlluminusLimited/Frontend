import React, { Component } from 'react';
import SettingsForm from './SettingsForm';
import Loader from './Loader';

class Settings extends Component {
    state = {
        loaded: false
    };

    makeFetch = () => {
        fetch('https://api-dev.pinster.io/v1/me', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('userToken')
            }
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
                    loaded: true,
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
                {this.state.loaded ? <SettingsForm data={this.state.data} /> : <Loader />}
            </main>
        );
    }
}

export default Settings;
