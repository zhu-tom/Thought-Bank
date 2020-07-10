import React from 'react';
import { Container, Loader, Card, Comment, Icon, Feed, Label, Divider } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

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

    let date = new Date(props.data.date);
    date = new Date(date.getTime()-date.getTimezoneOffset()*60*1000);
    let dateString = date.toLocaleString();

    // <Card fluid>
    //     <Card.Content>
    //         <Card.Header>{props.data.username}</Card.Header>
    //         <Card.Meta>{dateString}</Card.Meta>
    //         <Card.Description>{props.data.thought}</Card.Description>
    //     </Card.Content>
    // </Card>
    // <Comment>
    //         <Comment.Content>
    // <Comment.Author as={Link} to={`/user/${props.data.username}`}>{props.data.username}</Comment.Author>
    //             <Comment.Metadata><span>{dateString}</span></Comment.Metadata>
    //             <Comment.Text>{props.data.thought}</Comment.Text>
    //             <Comment.Actions>
    //                 <a><Icon name="reply"/>Reply</a>
    //                 <a><Icon name="archive"/>Withdraw</a>
    //             </Comment.Actions>
    //         </Comment.Content>
    //     </Comment>

    return (
        <Feed size="large">
        <Feed.Event>
            <Feed.Content>
                <Feed.Summary>
                    <Feed.User as={Link} to={`/user/${props.data.username}`}>{props.data.username}</Feed.User>
                    <Feed.Date>{dateString}</Feed.Date>
                </Feed.Summary>
                <Feed.Extra text style={{whiteSpace: 'pre-wrap'}}>{props.data.thought}</Feed.Extra>
                <Feed.Meta>
                    <Label size="tiny" as='a' image>
                        <Icon style={{marginRight: 0}} name='reply'/>
                        <Label.Detail>0</Label.Detail>
                    </Label>
                    <Label size="tiny" as='a' image>
                        <Icon style={{marginRight: 0}} name='archive'/>
                        <Label.Detail>0</Label.Detail>
                    </Label>
                </Feed.Meta>
            </Feed.Content>
        </Feed.Event>
        <Divider/>
        </Feed>
    );
}