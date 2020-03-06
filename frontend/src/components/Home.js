import React from 'react';
import { Menu, Header, Button } from 'semantic-ui-react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import SignUp from './SignUp';

export default class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            activeItem: 'home'
        }

    }

    handleItemClick = (e, { name }) => this.setState({activeItem: name});

    render() {
        return (
            <div>
                <Router>
                    <Menu>
                        <Menu.Item>
                            <Header>ThoughtBank</Header>
                        </Menu.Item>
                        <Menu.Item
                            name='home'
                            active={this.state.activeItem === 'home'}
                            onClick={this.handleItemClick}>
                            Home
                        </Menu.Item>
                        <Menu.Item
                            name='about'
                            active={this.state.activeItem === 'about'}
                            onClick={this.handleItemClick}>
                            About
                        </Menu.Item>
                        <Menu.Item
                            position='right'
                            name='signUp' onClick={this.handleItemClick}
                            as='div'>
                            <Link to='/signUp'>
                                <Button primary>Sign Up</Button>
                            </Link>
                        </Menu.Item>
                    </Menu>
                    <Switch>
                        <Route path='/signUp' component={SignUp}/>
                    </Switch>
                </Router>
            </div>
        );
    }
}