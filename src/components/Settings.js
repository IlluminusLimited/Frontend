import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import SettingsForm from './SettingsForm';
import Loader from './Loader';
import HeaderNav from "./HeaderNav";

class Settings extends Component {
    state = {
        loaded: false
    };

    isLoggedIn = () => {
        if (localStorage.getItem('pinsterUserToken')) {
            return this.state.loaded ? (
                <SettingsForm data={this.state.data} history={this.props.history}/>
            ) : (
                <Loader/>
            );
        }
        return <Redirect to="/login"/>;
    };

    makeFetch = () => {
        fetch(process.env.REACT_APP_API_URL + '/v1/me', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('pinsterUserToken')
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
        if (localStorage.getItem('pinsterUserToken')) {
            this.makeFetch();
        }
    }

    render() {
        return (
            <React.Fragment>
                <header className="container">
                    <HeaderNav/>
                </header>
                <main className="settings-page container">{this.isLoggedIn()}</main>
            </React.Fragment>
        )
    }
}

export default Settings;
