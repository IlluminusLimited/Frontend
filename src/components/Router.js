import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './Home';
import MyCollections from './MyCollections';
import CollectionPage from './CollectionPage';
import PinPage from './PinPage';
import Login from './Login';
import Legal from './Legal';
import CreatePin from './CreatePin';
import NavBar from './NavBar';
import Settings from './Settings';
import AuthRedirect from './AuthRedirect';
import CreateCollectionForm from './CreateCollectionForm';
import LoadUserData from './LoadUserData';
import EditPin from './EditPin';

const Router = () => (
    <BrowserRouter>
        <React.Fragment>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/authenticate/:token" component={AuthRedirect} />
                <Route exact path="/settings" component={Settings} />
                {/* <Route path="/user/:userId" component={User} /> */}
                <Route path="/pins/new" component={CreatePin} />
                <Route path="/pin/:pinId" component={PinPage} />
                <Route path="/pins/:pinId/edit" component={EditPin} />
                <Route exact path="/collections" component={MyCollections} />
                <Route exact path="/collections/create" component={CreateCollectionForm} />
                <Route path="/collection/:collectionId" component={CollectionPage} />
                {/* <Route path="/set/:setId" component={PinSet} /> */}
                <Route path="/legal" component={Legal} />

                {/* <Route component={NotFound} /> */}
            </Switch>
            <Route path="/" component={NavBar} />
            <Route path="/" component={LoadUserData} />
        </React.Fragment>
    </BrowserRouter>
);

export default Router;
