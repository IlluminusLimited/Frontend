import auth0 from 'auth0-js';
// import history from '../lib/history';


export default class Auth {
    auth0 = new auth0.WebAuth({
        clientID:     process.env.REACT_APP_AUTH0_KEY,
        domain:       process.env.REACT_APP_AUTH0_DOMAIN,
        responseType: process.env.REACT_APP_AUTH0_RESPONSE_TYPE,
        audience:     process.env.REACT_APP_AUTH0_AUDIENCE,
        redirectUri:  process.env.REACT_APP_AUTH0_CALLBACK,
        scope:        process.env.REACT_APP_AUTH0_SCOPE
    })

    constructor() {
        this.login = this.login.bind(this);
        this.handleAuthentication = this.handleAuthentication.bind(this);
    }

    login() {
        this.auth0.authorize();
    }


    handleAuthentication() {
        console.dir("handleAuthentication called");

        this.auth0.parseHash((err, authResult) => {
            if (authResult && authResult.accessToken && authResult.idToken) {
                console.dir(authResult);

                window.location.hash = '/';
                // Store the authResult in local storage and redirect the user elsewhere
                localStorage.setItem('access_token', authResult.accessToken);
                localStorage.setItem('id_token', authResult.idToken);

            } else if (err) {
                console.dir(err);
                // Handle authentication error, for example by displaying a notification to the user
            }
        });
    }
}
