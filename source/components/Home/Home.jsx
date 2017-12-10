import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import { HashRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom'

import styles from './Home.scss'

// import component
import Login from "../Login/Login.jsx"
import Register from "../Register/Register.jsx"
import CreatePlan from "../CreatePlan/CreatePlan.jsx"
import ViewPlan from "../ViewPlan/ViewPlan.jsx"

// var BrowserHistory = require('react-router/lib/BrowserHistory').default;

class Home extends Component {
	// router
    render() {
        return(
            <Router>
				<Switch>
					<Route exact path="/" render={()=>{
						return <Redirect to="/login"/>;
					}}/>
					<Route exact path="/login" render={()=>{
						return <Login />;
					}} />
					<Route exact path="/register" render={()=>{
						return <Register />
					}} />
					<Route exact path="/create" render={()=>{
						return <CreatePlan />;
					}} />
					<Route exact path="/view" render={()=>{
						return <ViewPlan />
					}} />
				</Switch>
			</Router>
        )
    }
}

export default Home
