import React from 'react';
import { Container, Header, Segment, Button } from 'semantic-ui-react';
import Post from './Post';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>{sessionStorage.user ? 
                <Post/>:
                <Segment raised secondary style={{paddingTop: '15em', paddingBottom:'15em'}}>
                    <Header size={"huge"} textAlign="center">
                        <Header.Content>What are you thinking about?</Header.Content>
                        <Header.Subheader>Deposit your thoughts for someone to read.</Header.Subheader>
                        <Button color='blue' style={{marginTop:'1em'}}>Get Started</Button>
                    </Header>
                </Segment>}
                
                
            </div>
        );
    }
}