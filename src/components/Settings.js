import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import SettingsForm from './SettingsForm';
import Loader from './Loader';
import HeaderNav from './HeaderNav';

class Settings extends Component {
    state = {
        loaded: false,
        data: {}
    };

    isLoggedIn = () => {
        if (localStorage.getItem('pinster-user-token')) {
            return this.state.loaded ? (
                <SettingsForm data={this.state.data} history={this.props.history} />
            ) : (
                <Loader />
            );
        }
        return <Redirect to="/login" />;
    };

    fetchUserData = () => {
        fetch(process.env.REACT_APP_API_URL + '/v1/me', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('pinster-user-token')
            }
        })
            .then(
                results => {
                    if (results.status === 401) {
                        localStorage.clear();
                        sessionStorage.clear();
                        this.props.history.push('/login');
                    }
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
        if (localStorage.getItem('pinster-user-token')) {
            this.fetchUserData();
        }
    }

    render() {
        return (
            <React.Fragment>
                <HeaderNav history={this.props.history} label="Settings" modal={false} />
                <main className="settings-page container">{this.isLoggedIn()}</main>
            </React.Fragment>
        );
    }
}

export default Settings;
