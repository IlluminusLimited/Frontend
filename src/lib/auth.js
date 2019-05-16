import auth0 from "auth0-js";
import history from "./history";
import jwtDecode from "jwt-decode";

export default class Auth {
  auth0 = new auth0.WebAuth({
    clientID: process.env.REACT_APP_AUTH0_KEY,
    domain: process.env.REACT_APP_AUTH0_DOMAIN,
    responseType: process.env.REACT_APP_AUTH0_RESPONSE_TYPE,
    audience: process.env.REACT_APP_AUTH0_AUDIENCE,
    redirectUri: process.env.REACT_APP_AUTH0_CALLBACK,
    scope: process.env.REACT_APP_AUTH0_SCOPE
  });

  constructor() {
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.getAccessToken = this.getAccessToken.bind(this);
    this.renewSession = this.renewSession.bind(this);
    this.hasPermission = this.hasPermission.bind(this);
  }

  hasPermission(perm) {
    const perms = localStorage.getItem("perms").split(',');
    return perms.indexOf(perm) >= 0;
  }

  checkApiUser(name, token) {
    fetch(process.env.REACT_APP_API_URL + "/v1/users", {
      method: "post",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ data: { display_name: name } })
    })
      .then(data => {
        return data.json();
      })
      .then(response => {
        return true;
      })
      .catch(error => {
        console.error(error);
      });
  }

  handleAuthentication() {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
      } else if (err) {
        console.error(err);
        // Handle authentication error, for example by displaying a notification to the user
      }
    });
  }

  getAccessToken() {
    // console.log("called getAccessToken()");
    return localStorage.getItem("access_token");
  }

  setSession(authResult) {
    this.checkApiUser(authResult.idTokenPayload.name, authResult.accessToken);
    localStorage.setItem("access_token", authResult.accessToken);
    localStorage.setItem("expires_at", authResult.expiresIn * 1000 + new Date().getTime());
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("perms", jwtDecode(authResult.accessToken).permissions);

    history.push("/settings");
  }

  renewSession() {
    this.auth0.checkSession({}, (err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
      } else if (err) {
        this.logout();
        console.error(err);
        // alert( `Could not get a new token (${err.error}: ${err.error_description}).`);
      }
    });
  }

  login() {
    this.auth0.authorize();
  }

  logout() {
    localStorage.setItem("expires_at", 0);
    localStorage.removeItem("access_token");
    localStorage.removeItem("isLoggedIn");
    this.auth0.logout({ returnTo: window.location.origin });
  }

  isAuthenticated() {
    return new Date().getTime() < localStorage.getItem("expires_at");
  }
}
