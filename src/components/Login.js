import React, { Component } from 'react';
import SvgRaccoon from './svg/SvgRaccoon';

class Login extends Component {
    render() {
        return (
            <main class="container">
                <div class="login-splash full-bleed">
                    <SvgRaccoon color="white" />
                    <h1>pinster</h1>

                    <a href="/" class="auth-link">
                        <span>login with facebook</span>
                    </a>

                    <a href="/" class="auth-link">
                        <span>login with google</span>
                    </a>

                    <a href="/" class="auth-link">
                        <span>login with twitter</span>
                    </a>
                </div>
            </main>
        );
    }
}

export default Login;
