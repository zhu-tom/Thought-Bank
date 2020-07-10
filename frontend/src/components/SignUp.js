import React from 'react';
import { Form, Button, Container, Header, Message, Icon } from 'semantic-ui-react';

export default class SignUp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            email: "",
            password: "",
            confirm: "",
            noMatch: false,
            userTaken: false,
            showPass: false
        }
    }

    handleChange = (event) => {
        event.persist();
        const { name, value } = event.target;
        this.setState({[name]: value});
    }

    handleSubmit = (event) => {
        event.preventDefault();
        if (this.state.password !== this.state.confirm) {
            this.setState({noMatch:"Passwords do not match."});
            return;
        }
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
            if (res.id === -1) {
                this.setState({userTaken: "Username Taken"});
                return;
            } else {
                sessionStorage.setItem('user', this.state.username);
                sessionStorage.setItem('id', res.id);
                window.location.href = '/';
            }
        });
    }

    toggleShowPass = () => {
        this.setState(prevState=>{
            return {showPass: !prevState.showPass};
        });
    }

    render() {
        return (
            <Container>
                <Header as='h1' dividing>Sign Up</Header>
                <Form>
                    <Form.Input 
                        label='Username' 
                        name='username' 
                        placeholder='Username' 
                        onChange={this.handleChange} 
                        value={this.state.username}
                        error={this.state.userTaken}/>
                    <Form.Field>
                        <label>Email</label>
                        <input name='email' type='text' placeholder='Email' value={this.state.email} onChange={this.handleChange}></input>
                    </Form.Field>
                    <Form.Input
                        label='Password' 
                        type={this.state.showPass ? 'text':'password'}
                        placeholder='Password' 
                        name='password'
                        value={this.state.password} 
                        onChange={this.handleChange} 
                        error={this.state.noMatch}
                        icon={<Icon name={this.state.showPass ? 'eye':'eye slash'} link size='large' onClick={this.toggleShowPass}/>}/>
                    <Form.Input
                        label='Confirm Password' 
                        type={this.state.showPass ? 'text':'password'}
                        placeholder='Confirm Password' 
                        value={this.state.confirm} 
                        onChange={this.handleChange} 
                        error={this.state.noMatch}
                        name='confirm'
                        icon={<Icon name={this.state.showPass ? 'eye':'eye slash'} link size='large' onClick={this.toggleShowPass}/>}/>
                    <Button type='submit' onClick={this.handleSubmit}>Sign Up</Button>
                </Form>
            </Container>
        );
    }
}