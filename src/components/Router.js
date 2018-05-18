import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import App from './App';
import Header from './Header';
import Collection from './Collection';
import Login from './Login';
// import Help from './Help';
import NavBar from './NavBar';

const Router = () => (
    <BrowserRouter>
        <React.Fragment>
            <Route path="/" component={Header} />
            <Switch>
                <Route exact path="/" component={App} />
                <Route exact path="/login" component={Login} />
                 {/*<Route exact path="/settings" component={Settings} />*/}
                {/* <Route path="/user/:userId" component={User} /> */}
                <Route path="/collections" component={Collection} />

                <Route path="/collection/:collectionId" component={Collection} />
                {/* <Route path="/set/:setId" component={PinSet} /> */}
                {/* <Route path="/help" component={Help} /> */}
                {/* <Route component={NotFound} /> */}
            </Switch>
            <Route path="/" component={NavBar} />
        </React.Fragment>
    </BrowserRouter>
);

export default Router;
