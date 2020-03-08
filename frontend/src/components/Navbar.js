import React from 'react';
import { Menu, Header, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeItem: 'home'
        }
    }

    handleItemClick = (e, { name }) => this.setState({activeItem: name});
    handleClickLogout = () => {
        sessionStorage.clear();
        window.location.href = '/';
    };

    render() {
        return (
                <Menu>
                    <Menu.Item>
                        <Header>ThoughtBank</Header>
                    </Menu.Item>
                    <Menu.Item
                        as={Link}
                        to='/'
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
                        name='logIn' onClick={this.handleItemClick}
                        as='div'>
                        {sessionStorage.user ? 
                        <Button color="red" onClick={this.handleClickLogout}>Log Out</Button>:
                        <Link to='/logIn'>
                            <Button primary>Log In</Button>
                        </Link>}
                    </Menu.Item>
                </Menu>
        );
    }
}