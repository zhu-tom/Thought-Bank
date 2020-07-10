import React from 'react';
import { Segment, Form, Button, Container, Checkbox, Message, Transition } from 'semantic-ui-react';

export default class Post extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            post: "",
            isAnon: false,
            loading: false,
            success: false,
            error: false
        }
    }

    handleChange = (e) => {
        e.persist();
        const { name, value } = e.target;
        this.setState({[name]: value});
    }

    handleChangeCheck = (e) => {
        this.setState(prevState=>{
            return {isAnon: !prevState.isAnon}
        });
    }

    handleClick = () => {
        this.setState({loading: true});
        fetch('http://localhost:4000/api/post', {
            method: "POST",
            headers: {
                "Content-Type":"application/json",
            },
            body: JSON.stringify({thought:this.state.post, asAnon:this.state.isAnon, userId: sessionStorage.id, date: new Date().toISOString().slice(0,23).replace('T', ' ')})
        }).then(res=>{
            this.setState({loading: false, post: ''});
            if (res.status === 200) {
                this.setState({success: true, error: false});
            } else {
                this.setState({success: false, error: true});
            }
            setTimeout(()=>this.setState({success: false, error: false}), 5000);
        });
    }

    handleDismiss = (e, {id}) => {
        this.setState({[id]: false});
    }

    render() {
        return (
            <Container>
                <Segment raised>
                    <Form size={"big"} loading={this.state.loading}>
                        <Form.TextArea name='post' value={this.state.post} onChange={this.handleChange}/>
                        <Transition.Group animation="fade" duration={500}>
                            {this.state.success && <Message success id="success" onDismiss={this.handleDismiss} header="Deposit Sucessful" content="Now we wait..."/>}
                            {this.state.error && <Message error id="error" onDismiss={this.handleDismiss} header="Whoops!" content="Something went wrong."/>}
                        </Transition.Group>
                        <Button onClick={this.handleClick} type='submit'>Deposit</Button>
                        <Checkbox toggle name="isAnon" style={{float:'right'}}
                            label={`Anonymous: ${this.state.isAnon?'On':'Off'}`}
                            onChange={this.handleChangeCheck}
                            checked={this.state.isAnon}/>
                    </Form>
                </Segment>
            </Container>
        );
    }
}