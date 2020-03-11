import React from 'react';
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Item, Image, Loader, Container } from "semantic-ui-react";

export default function Account() {
    const { username } = useParams();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({});
    useEffect(() => {
        fetch(`http://localhost:4000/api/users?name=${username}`).then(res=>res.json()).then(res=>{
            setData(res);
            setLoading(false);
        });
    });

    return (
        <Container>
            {loading ? <Loader active inline="centered"/>:
        <Item>
            <Item.Image size='tiny' src='https://react.semantic-ui.com/images/wireframe/image.png' />
            <Item.Content>
            <Item.Header as='a'>{data.username}</Item.Header>
            <Item.Meta>{data.email}</Item.Meta>
            <Item.Description>
                <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
            </Item.Description>
            <Item.Extra>Additional Details</Item.Extra>
            </Item.Content>
        </Item>}
        </Container>
    );
}