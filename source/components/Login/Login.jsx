import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import styles from './login.scss'

class Login extends Component {

    constructor(){
        super();
    }

    render() {
        return(
            <div className='login-form'>
                <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
                    <Grid.Column style={{ maxWidth: 450 }}>
                        <Header as='h2' color='teal' textAlign='center'>{' '}Log-in to your scheduler</Header>
                        <Form size='large'>
                            <Segment stacked>
                                <Form.Input fluid placeholder='user name'/>
                                <Form.Input fluid placeholder='Password' type='password'/>
                                <Button color='teal' fluid size='large'>Login</Button>
                            </Segment>
                        </Form>
                        <Message>new user: <a href='#'> Sign Up</a> here
                        </Message>
                    </Grid.Column>
                </Grid>
            </div>
        );
    }

}

export default Login;
