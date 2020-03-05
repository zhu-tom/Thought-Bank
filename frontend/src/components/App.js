import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            apiResponse: {},
        };
    }
    
    getThoughts() {
        fetch('localhost:8080/getThoughts').then(res=>{
            console.log(res);
            res = res.json();
            console.log(res);
            this.setState({apiResponse:res});
        });
    }
    
    render() {
        return (
            <div>
                <button onClick={()=>this.getThoughts()}>Get Thoughts</button>
            </div>
        );
    }
}