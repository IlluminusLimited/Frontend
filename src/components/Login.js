import React, {Component} from 'react';
import Loader from './Loader';
import SvgRaccoon from './svg/SvgRaccoon';

class Login extends Component {
    state = {
        loading: false,
        oauthProviders: {}
    };

    linkToLegal = () => {
        console.log(this.props)
        this.props.history.push("/legal");
    };

    fetchAuth = () => {
        fetch(process.env.REACT_APP_API_URL + '/login')
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
                    <SvgRaccoon color="white"/>
                    <h1>pinster</h1>
                    {this.state.loading ? (
                        <React.Fragment>
                            {Object.keys(this.state.oauthProviders).map(key => {
                                return (
                                    <a
                                        key={key}
                                        href={this.state.oauthProviders[key]}
                                        className="auth-link"
                                    >
                                        <span>Login with {key}</span>
                                    </a>
                                );
                            })}
                            <br />
                            <button className="auth-link-legal" onClick={this.linkToLegal}>legal</button>
                        </React.Fragment>
                    ) : (
                        <Loader/>
                    )}
                </div>
            </main>
        );
    }
}

export default Login;
