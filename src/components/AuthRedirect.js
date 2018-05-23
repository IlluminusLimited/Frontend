import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class AuthRedirect extends Component {
    componentDidMount() {
        localStorage.setItem('pinster-user-token', this.props.match.params.token.split('#')[0]);
    }

    render() {
        return <Redirect to="/" />;
    }
}

export default AuthRedirect;
