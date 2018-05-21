import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Loader from './Loader';

class AuthRedirect extends Component {
    componentDidMount() {
        localStorage.setItem('userToken', this.props.match.params.token.split('#')[0]);
    }

    render() {
        return <Redirect to="/" />;
    }
}

export default AuthRedirect;
