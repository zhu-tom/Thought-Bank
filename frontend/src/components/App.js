import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SignUp from './SignUp';
import LogIn from './LogIn';
import Post from './Post';
import Navbar from './Navbar';
import Home from './Home';
import Withdraw from './Withdraw';
import Account from './Account';

export default function App() {
    return (
        <Router>
            <Navbar/>
                <Switch>
                    <Route path='/' exact component={Home}/>
                    <Route path='/signUp' component={SignUp}/>
                    <Route path='/logIn' component={LogIn}/>
                    <Route path='/post' component={Post}/>
                    <Route path='/withdraw' component={Withdraw}/>
                    <Route path='/user/:username' component={Account}/>
                </Switch>
        </Router>
    );
}