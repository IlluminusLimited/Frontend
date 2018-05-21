import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class AuthRedirect extends Component {
    componentDidMount() {
        localStorage.setItem('userToken', this.props.match.params.token);
    }

    render() {
        return <Redirect to="/" />;
    }
}

export default AuthRedirect;
