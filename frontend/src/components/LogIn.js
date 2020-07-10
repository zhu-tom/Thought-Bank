import React from 'react';
import { Container, Form, Header, Button, Message, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default class LogIn extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
            wrongUser: false,
            wrongPass: false,
            loading: false
        }
    }

    handleChange = (event) => {
        event.persist();
        const {name, value} = event.target;
        this.setState({[name]: value});
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({wrongUser:false, wrongPass:false, loading: true})
        fetch('http://localhost:4000/api/logIn', {
            method: "POST",
            headers: {
                "Content-Type":"application/json",
            },
            body: JSON.stringify({username: this.state.username, password: this.state.password})
        }).then(res => res.json()).then(data => {
            this.setState({loading: false});
            if (data.id) {
                sessionStorage.setItem('user', data.user);
                sessionStorage.setItem('id', data.id);
                window.location.href = '/';
            } else {
                if (data.errCode === 'username') this.setState({wrongUser: "Username does not exist."});
                if (data.errCode === 'password') this.setState({wrongPass: "Incorrect password."});
            }
        });
    }

    render() {
        return (
            <Container>
                <Header as='h1' dividing>Log In</Header>
                <Form loading={this.state.loading}>
                    <Form.Input 
                        label='Username'
                        name='username'
                        onChange={this.handleChange}
                        value={this.state.username}
                        placeholder="Username"
                        error={this.state.wrongUser}/>
                    <Form.Input
                        label='Password'
                        name='password'
                        placeholder='Password'
                        type='password'
                        onChange={this.handleChange}
                        value={this.state.password}
                        error={this.state.wrongPass}/>
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