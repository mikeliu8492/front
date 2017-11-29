import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import styles from './register.scss'

class Register extends Component {

    constructor(){
        super();
    }

    render() {
        return(
            <div className='login-form'>
                <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
                    <Grid.Column style={{ maxWidth: 450 }}>
                        <Header as='h2' color='teal' textAlign='center'>Create Your Account</Header>
                        <Form size='large'>
                            <Segment stacked>
                                <Form.Input fluid placeholder='user name'/>
                                <Form.Input fluid placeholder='email'/>
                                <Form.Input fluid placeholder='password' type='password'/>
                                <Form.Input fluid placeholder='confirm password' type='password'/>
                                <Button color='teal' fluid size='large'>sign in now!</Button>
                            </Segment>
                        </Form>
                    </Grid.Column>
                </Grid>
            </div>
        );
    }

}

export default Register;
