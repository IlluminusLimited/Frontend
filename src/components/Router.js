import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Callback from "./Callback";
import CollectionPage from "./CollectionPage";
import CreateCollectionForm from "./CreateCollectionForm";
import CreatePin from "./CreatePin";
import EditPin from "./EditPin";
import Home from "./Home";
import Legal from "./Legal";
import MyCollections from "./MyCollections";
import NavBar from "./NavBar";
import PinPage from "./PinPage";
import Settings from "./Settings";

import Auth from "../lib/auth";

const auth = new Auth();

const handleAuthentication = ({ location }) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication();
  }
};

const login = () => {
  auth.login();
};

const logout = () => {
  auth.logout();
};

const Router = () => (
  <BrowserRouter>
    <React.Fragment>
      <Switch>
        <Route exact path="/" render={props => <Home auth={auth} {...props} />} />
        <Route exact path="/settings" render={props => <Settings auth={auth} {...props} />} />
        <Route path="/pins/new" render={props => <CreatePin auth={auth} {...props} />} />
        <Route path="/pin/:pinId" render={props => <PinPage auth={auth} {...props} />} />
        <Route path="/pins/:pinId/edit" render={props => <EditPin auth={auth} {...props} />} />
        <Route exact path="/collections" render={props => <MyCollections auth={auth} {...props} />} />
        <Route exact path="/collections/create" render={props => <CreateCollectionForm auth={auth} {...props} />} />
        <Route path="/collection/:collectionId" render={props => <CollectionPage auth={auth} {...props} />} />
        <Route path="/legal" component={Legal} />

        <Route exact path="/login" render={props => { login(); return null; }} />
        <Route exact path="/logout" render={props => { logout(); return null; }} />
        <Route exact path="/callback" render={props => { handleAuthentication(props); return <Callback {...props} />; }} />
      </Switch>
      <Route path="/" render={props => <NavBar auth={auth} {...props} />} />
    </React.Fragment>
  </BrowserRouter>
);

export default Router;
