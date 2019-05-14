import React, {Component} from 'react';
import Loader from './Loader';
import SvgRaccoon from './svg/SvgRaccoon';
import Auth from '../lib/auth';
const auth = new Auth();

class Login extends Component {
    state = {
        loaded: false,
        oauthProviders: {}
    };

    linkToLegal = () => {
        this.props.history.push('/legal');
    };

    fetchAuth = () => {
        auth.login();
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
                    <Loader/>
                </div>
            </main>
        );
    }
}

export default Login;
