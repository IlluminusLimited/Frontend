import React, { Component } from 'react';
import Loader from './Loader';
import SvgRaccoon from './svg/SvgRaccoon';

class Login extends Component {
    state = {
        loading: false,
        oauthProviders: {}
    };

    fetchAuth = () => {
        fetch('https://api-dev.pinster.io/login')
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
                console.log(response);
                this.setState({
                    loading: true,
                    oauthProviders: response.oauth_providers
                });
            });
    };

    componentDidMount() {
        this.fetchAuth();
    }

    render() {
        return (
            <main className="container">
                <div className="login-splash full-bleed">
                    <SvgRaccoon color="white" />
                    <h1>pinster</h1>
                    {this.state.loading ? (
                        Object.keys(this.state.oauthProviders).map(key => {
                            return (
                                <a
                                    key={key}
                                    href={this.state.oauthProviders[key]}
                                    className="auth-link"
                                >
                                    <span>Login with {key}</span>
                                </a>
                            );
                        })
                    ) : (
                        <Loader />
                    )}
                </div>
            </main>
        );
    }
}

export default Login;
