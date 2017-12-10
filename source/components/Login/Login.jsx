import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { Button, Form, Grid, Header, Image, Message, Segment} from 'semantic-ui-react'
import styles from './login.scss'
import axios from "axios";


class Login extends Component {

    constructor(){
        super();
        this.state={
            success: false,
            username: "",
            password: "",
            prompt: "sign in with your username and password",
            error: false
        }

        this.baseUrl = "https://uiuc-course-scheduler.herokuapp.com"
        this.login = this.login.bind(this);
        this.passwordChange = this.passwordChange.bind(this);
        this.usernameChange = this.usernameChange.bind(this);
    }

    login(){
        console.log(this.state);
        let url = this.baseUrl + "/users/login";
        axios.post(url,{"username" : this.state.username,
                        "password" : this.state.password }
                   ).then(response => {
                       this.setState({
                           success: true
                       });
                    })
                    .catch(error => {
                        this.setState({
                            error: true,
                            prompt: "Incorrect username or password"
                        });

        });
    }

    passwordChange(e){
        this.state.password = e.target.value;
    }

    usernameChange(e){
        this.state.username = e.target.value;
    }

    render() {

        if(this.state.success == true){
            return <Redirect to="/view"/>
        }

        return(
            <div className='login-form'>
                <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
                    <Grid.Column style={{ maxWidth: 520 }}>
                        <div>
                            <div className="title1"></div>
                            <div className="logo"></div>
                        </div>
                        <Form size='large'>
                            <Segment stacked>
                                <Message negative={this.state.error}>{this.state.prompt}</Message>
                                <Form.Input onChange={this.usernameChange} size="large" fluid placeholder='user name'/>
                                <Form.Input onChange={this.passwordChange} size="large" fluid placeholder='Password' type='password'/>
                                <Button  onClick={this.login} color='teal' fluid size='large'>Login</Button>
                            </Segment>
                        </Form>
                        <Message>New User: &nbsp;&nbsp;<Link to="/register"> Sign Up</Link> &nbsp;&nbsp; here
                        </Message>
                    </Grid.Column>
                </Grid>
            </div>
        );
    }

}

export default Login;
