import auth0 from "auth0-js";

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
    this.handleAuthentication = this.handleAuthentication.bind(this);
  }

  login() {
    this.auth0.authorize();
  }

  logout(){
    localStorage.removeItem("pinster-user-token");
    this.auth0.logout({returnTo: process.env.REACT_APP_URL});
  }

  fetchUser(name, token) {
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
        console.dir(response);
        return true;
      })
      .catch(error => {
        console.error(error);
      });
  }

  handleAuthentication() {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        localStorage.setItem("pinster-user-token", authResult.accessToken);

        console.dir("auth0 response");
        console.dir(authResult);
        this.fetchUser(authResult.idTokenPayload.name, authResult.accessToken);

        return true;
      } else if (err) {
        console.dir(err);
        // Handle authentication error, for example by displaying a notification to the user
      }
    });
  }
}
