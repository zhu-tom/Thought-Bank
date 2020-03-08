import React from 'react';
import { Container, Form, Header, Button, Message, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default class LogIn extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: ""
        }
    }

    handleChange = (event) => {
        event.persist();
        const {name, value} = event.target;
        this.setState({[name]: value});
    }

    handleSubmit = (event) => {
        event.preventDefault();
        fetch('http://localhost:4000/api/logIn', {
            method: "POST",
            headers: {
                "Content-Type":"application/json",
            },
            body: JSON.stringify({username: this.state.username, password: this.state.password})
        }).then(res => res.json()).then(data => {
            if (data) {
                sessionStorage.setItem('user', data.id);
                window.location.href = '/';
            }
        });
    }

    render() {
        return (
            <Container>
                <Header as='h1' dividing>Log In</Header>
                <Form>
                    <Form.Field>
                        <label>Username</label>
                        <input type='text' name='username' onChange={this.handleChange} value={this.state.username} placeholder='Username'/>
                    </Form.Field>
                    <Form.Field>
                        <label>Password</label>
                        <input type='password' name='password' onChange={this.handleChange} value={this.state.password} placeholder='Password'/>
                    </Form.Field>
                    <Button type='submit' onClick={this.handleSubmit}>Log In</Button>
                    <Message warning visible>
                        <Icon name='help'/>
                        Don't have an account?&nbsp;<Link to='/signUp'>Sign up here</Link>&nbsp;instead.
                    </Message>
                </Form>
            </Container>
        );
    }
}