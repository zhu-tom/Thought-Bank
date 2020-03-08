import React from 'react';
import { Form, Button, Container, Header } from 'semantic-ui-react';

export default class SignUp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            email: "",
            password: "",
            confirm: "",
        }
    }

    handleChange = (event) => {
        event.persist();
        const { name, value } = event.target;
        this.setState({[name]: value});
    }

    handleSubmit = (event) => {
        event.preventDefault();
        if (this.state.password !== this.state.confirm) return;
        const {username, email, password} = this.state;
        fetch("http://localhost:4000/api/signUp",
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({username: username, email: email, password: password}),
            }
        ).then(res=>res.json()).then(res=>{
            if (res) {
                sessionStorage.setItem('user', this.state.username);
                window.location.href = '/';
            }
        });
    }

    render() {
        return (
            <Container>
                <Header as='h1' dividing>Sign Up</Header>
                <Form>
                    <Form.Field>
                        <label>Username</label>
                        <input name='username' type='text' placeholder='Username' value={this.state.username} onChange={this.handleChange}></input>
                    </Form.Field>
                    <Form.Field>
                        <label>Email</label>
                        <input name='email' type='text' placeholder='Email' value={this.state.email} onChange={this.handleChange}></input>
                    </Form.Field>
                    <Form.Field>
                        <label>Password</label>
                        <input name='password' type='password' placeholder='Password' value={this.state.password} onChange={this.handleChange}></input>
                    </Form.Field>
                    <Form.Field>
                        <label>Confirm Password</label>
                        <input name='confirm' type='password' placeholder='Confirm Password' value={this.state.confirm} onChange={this.handleChange}></input>
                    </Form.Field>
                    <Button type='submit' onClick={this.handleSubmit}>Sign Up</Button>
                </Form>
            </Container>
        );
    }
}