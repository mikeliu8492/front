import React, { Component } from 'react'
import { Image, List, Menu, Button, Input } from 'semantic-ui-react'
import { Redirect, Link } from 'react-router-dom'

import styles from './CreatePlan.scss'

const createPlanStr = "Create Plan";
const viewPlanStr = "View Plan";
const logOutStr = "Log Out";

const active = true;
const notActive = false;

// the navigation menu
function NavBar(props){
	return(
		<div className="navbarDiv">
			<Menu className="navbar" floated="right" size="massive" borderless color="green" inverted>
				<Menu.Item name={createPlanStr} active={active} onClick={props.OnClick} position="right">
		          	{createPlanStr}
		        </Menu.Item>
		        <Menu.Item name={viewPlanStr} active={notActive} onClick={props.OnClick} position="right">
		          	{viewPlanStr}
		        </Menu.Item>
		        <Menu.Item name={logOutStr} active={notActive} onClick={props.OnClick} position="right">
		          	{logOutStr}
		        </Menu.Item>
			</Menu>
		</div>
	);
}

// logo + navigation bar
function Header(props){
	return(
		<div className="header">
			<div className="image">
			</div>
			<NavBar OnClick={props.OnClick}/>
		</div>
	);
}

function InputField(props){
	return(
		<div className="inputFieldDiv">
			<div className="inputField">
			</div>
			<div className="inputField">
			</div>
		</div>
	);
}

function CourseList(props){
	return(
		<div className="courseListDiv">
		</div>
	);
}

function PlanInfo(props){
	return(
		<div className="planInfoDiv">
		</div>
	);
}

// wrapper for body
function Body(props){
	return(
		<div className="bodyDiv">
			<div className="innerLeftDiv">
				<InputField />
				<CourseList />
			</div>
			<PlanInfo />
		</div>
	);

}


class CreatePlan extends Component{
	constructor(props){
		super(props);
		this.state = {
			redirectStr: null
		}

		this.menuOnClick = this.menuOnClick.bind(this);
	}

	menuOnClick(e, {name}){
		this.setState({redirectStr: name}, ()=>{
			console.log("Redirect to" + name);
		})
	}

	render(){
		if(this.state.redirectStr === createPlanStr){
			console.log("Refresh create");
			window.location.reload();
			this.setState({redirectStr: null});
		}
		if(this.state.redirectStr === viewPlanStr){
			console.log("Redirect to view");
			return <Redirect to="/view"/>
		}
		// else render this page
		return (
			<div>
				<Header OnClick={this.menuOnClick}/>
				<Body />
			</div>
		);
	}
}

export default CreatePlan;