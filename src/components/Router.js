import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './Home';
import MyCollections from './MyCollections';
import Collection from './Collection';
import CollectionPage from './CollectionPage';
import PinPage from './PinPage';
import Login from './Login';
// import Help from './Help';
import NavBar from './NavBar';

const Router = () => (
    <BrowserRouter>
        <React.Fragment>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/login" component={Login} />
                {/*<Route exact path="/settings" component={Settings} />*/}
                {/* <Route path="/user/:userId" component={User} /> */}
                <Route path="/pin/:pinId" component={PinPage} />
                <Route path="/collections" component={MyCollections} />
                <Route
                    path="/collection/:collectionId"
                    component={CollectionPage}
                />
                {/* <Route path="/set/:setId" component={PinSet} /> */}
                {/* <Route path="/help" component={Help} /> */}
                {/* <Route component={NotFound} /> */}
            </Switch>
            <Route path="/" component={NavBar} />
        </React.Fragment>
    </BrowserRouter>
);

export default Router;
