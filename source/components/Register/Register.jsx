import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import styles from './Register.scss';
import axios from "axios";

class Register extends Component {

    constructor(){
        super();
        this.state={
            success: false,
            name: "",
            username: "",
            email:"",
            password: "",
            confirmPassword: "",
            prompt: "create your account",
            error: false
        }

        this.baseUrl = "https://uiuc-course-scheduler.herokuapp.com"
        this.register = this.register.bind(this);
        this.passwordChange = this.passwordChange.bind(this);
        this.usernameChange = this.usernameChange.bind(this);
        this.nameChange = this.nameChange.bind(this);
        this.emailChange = this.emailChange.bind(this);
        this.confirmPasswordChange = this.confirmPasswordChange.bind(this);

    }

    register(){
        console.log(this.state);
        let url = this.baseUrl + "/users/register";
        axios.post(url,{"username" : this.state.username,
                        "password" : this.state.password,
                        "name"     : this.state.name,
                        "email"    : this.state.email,
                        "confirmPassword" : this.state.confirmPassword}
                   ).then(res => {
                       console.log(res);
                       if(res.data.error){
                           this.setState({
                               error: true,
                               prompt: res.data.message
                           });
                       }
                       else{
                           this.setState({
                               success: true
                           });
                       }
                   });
    }

    passwordChange(e){
        this.setState({
            password: e.target.value
        })
    }

    usernameChange(e){
        this.setState({
            username: e.target.value
        })
    }

    nameChange(e){
        this.setState({
            name: e.target.value
        })
    }

    emailChange(e){
        this.setState({
            email: e.target.value
        })
    }

    confirmPasswordChange(e){
        this.setState({
            confirmPassword: e.target.value
        })
    }

    render() {
        if(this.state.success == true){
            return <Redirect to="/login"/>
        }

        return(
            <div className='login-form'>
                <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
                    <Grid.Column style={{ maxWidth: 510 }}>
                        <div>
                            <div className="title1"></div>
                            <div className="logo"></div>
                        </div>
                        <Form size='large'>
                            <Segment stacked>
                                <Message negative={this.state.error}>{this.state.prompt}</Message>
                                <Form.Input onChange={this.nameChange} size="large" fluid placeholder='name'/>
                                <Form.Input onChange={this.usernameChange} size="large" fluid placeholder='user name'/>
                                <Form.Input onChange={this.emailChange} size="large" fluid placeholder='email'/>
                                <Form.Input onChange={this.passwordChange} size="large" fluid placeholder='password' type='password'/>
                                <Form.Input onChange={this.confirmPasswordChange} size="large" fluid placeholder='confirm password' type='password'/>
                                <Button onClick={this.register} color='teal' fluid size='large'>sign in now!</Button>
                            </Segment>
                        </Form>
                        <Message><Link to="/login">back to login</Link></Message>
                    </Grid.Column>
                </Grid>

            </div>

        );
    }

}

export default Register;
