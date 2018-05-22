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

const Router = () => (
    <BrowserRouter>
        <React.Fragment>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/authenticate/:token" component={AuthRedirect} />
                <Route exact path="/settings" component={Settings} />
                {/* <Route path="/user/:userId" component={User} /> */}
                <Route path="/pin/:pinId" component={PinPage} />
                <Route path="/collections" component={MyCollections} />
                <Route path="/collection/:collectionId" component={CollectionPage} />
                {/* <Route path="/set/:setId" component={PinSet} /> */}
                 <Route path="/create_pin" component={CreatePin} />
                <Route path="/legal" component={Legal} />

                {/* <Route component={NotFound} /> */}
            </Switch>
            <Route path="/" component={NavBar} />
        </React.Fragment>
    </BrowserRouter>
);

export default Router;
