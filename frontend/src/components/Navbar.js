import React from 'react';
import { Menu, Header, Button, Dropdown } from 'semantic-ui-react';
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
                <Menu size="large">
                    <Menu.Item>
                        <Header>ThoughtBank</Header>
                    </Menu.Item>
                    <Menu.Item
                        as={Link}
                        to='/'
                        name='home'
                        active={this.state.activeItem === 'home'}
                        onClick={this.handleItemClick}>
                        {sessionStorage.user ? "Post":"Withdraw"}
                    </Menu.Item>
                    {sessionStorage.user ? <Menu.Item
                        as={Link}
                        to='/withdraw'
                        name='withdraw'
                        active={this.state.activeItem === 'withdraw'}
                        onClick={this.handleItemClick}>
                        Withdraw
                    </Menu.Item>:null}
                    {sessionStorage.user ? 
                    <Menu.Menu position='right'>
                        <Dropdown item text='Account'>
                            <Dropdown.Menu>
                                <Dropdown.Item>My Account</Dropdown.Item>
                                <Dropdown.Item>Russian</Dropdown.Item>
                                <Dropdown.Divider/>
                                <Dropdown.Item onClick={this.handleClickLogout}>Log Out</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Menu.Menu>:
                    <Menu.Item
                    position='right'
                    name='logIn' onClick={this.handleItemClick}
                    as='span'>
                        <Link to='/logIn'>
                            <Button primary>Log In</Button>
                        </Link>
                    </Menu.Item>}
                </Menu>
        );
    }
}