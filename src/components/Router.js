import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Callback from "./Callback";
import CollectionPage from "./CollectionPage";
import CreateCollectionForm from "./CreateCollectionForm";
import CreatePin from "./CreatePin";
import EditPin from "./EditPin";
import Home from "./Home";
import Legal from "./Legal";
import Login from "./Login";
import Logout from "./Logout";
import MyCollections from "./MyCollections";
import NavBar from "./NavBar";
import PinPage from "./PinPage";
import Settings from "./Settings";

const Router = () => (
  <BrowserRouter>
    <React.Fragment>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/settings" component={Settings} />
        <Route path="/pins/new" component={CreatePin} />
        <Route path="/pin/:pinId" component={PinPage} />
        <Route path="/pins/:pinId/edit" component={EditPin} />
        <Route exact path="/collections" component={MyCollections} />
        <Route exact path="/collections/create" component={CreateCollectionForm} />
        <Route path="/collection/:collectionId" component={CollectionPage} />
        <Route path="/legal" component={Legal} />
        <Route path="/callback" component={Callback} />
        <Route path="/logout" component={Logout} />
      </Switch>
      <Route path="/" component={NavBar} />
    </React.Fragment>
  </BrowserRouter>
);

export default Router;
