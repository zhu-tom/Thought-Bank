import React from 'react';
import { Container, Loader, Card } from 'semantic-ui-react';

export default class Withdraw extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            thoughts: [],
            loading: true
        }
    }

    componentDidMount() {
        fetch('http://localhost:4000/api/withdraw', {
            method: "GET",
        }).then(res=>res.json())
        .then(res=>{
            this.setState({thoughts: res, loading: false});
            console.log(res);
        });
    }

    render() {
        return (
            <Container>
                <Loader active={this.state.loading} inline='centered'/>
                {this.state.thoughts.map(thought=><Withdrawal key={thought.id} data={thought}/>)}
            </Container>
        );
    }
}

function Withdrawal(props) {
    return (
        <Card fluid>
            <Card.Content header={props.data.username}/>
            <Card.Content description={props.data.thought}/>
            <Card.Content extra>
                {(() => {
                    let date = new Date(props.data.date);
                    date = new Date(date.getTime()-date.getTimezoneOffset()*60*1000);
                    return `Deposited: ${date.toLocaleString()}`;
                })()}
            </Card.Content>
        </Card>
    );
}