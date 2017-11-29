import React, { Component } from 'react'
import { Image, List, Menu, Button, Input } from 'semantic-ui-react'
import { Redirect, Link } from 'react-router-dom'

import styles from './CreatePlan.scss'

const createPlanStr = "Create Plan";
const viewPlanStr = "View Plan";
const logOutStr = "Log Out";

const subjectStr = "Subject";
const courseNumStr = "Course Number";

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
// image will be replaced by Image
function Header(props){
	return(
		<div className="header">
			<div className="headerImage">
			</div>
			<NavBar OnClick={props.OnClick}/>
		</div>
	);
}

// top left input field div
function InputField(props){
	return(
		<div className="inputFieldDiv">
			<div className="inputField">
				<span className="inputFieldText"> Subject </span>
				<Input className="input"  placeholder={subjectStr} name={subjectStr}
				onChange={props.OnChange} size="big"/> 
			</div>
			<div className="inputField">
				<span className="inputFieldText"> Course Number </span>
				<Input className="input" placeholder={courseNumStr} name={courseNumStr}
				onChange={props.OnChange} size="big"/>
			</div>
		</div>
	);
}

// inside the course list, the left subject list
function LeftList(props){
	let listItems = props.subjectList.map((element, index)=>{
		return(
			<div key={index} className="listItem">
				<Button className="listButton" content={element} size="huge"/>
			</div>
		);
	})

	return(
		<div className="leftList">
			{listItems}
		</div>
	);
}

// inside the course list, the right subject list
function RightList(props){
	let listItems = props.courseList.map((element, index)=>{
		return(
			<div key={index} className="listItem">
				<Button className="listButton" content={element} size="huge"/>
			</div>
		);
	})

	return(
		<div className="rightList">
			{listItems}
		</div>
	);
}

// bottom left course list
function CourseList(props){
	return(
		<div className="courseListDiv">
			<div className="courseListLeftSubject">
				<div className="courseListTitle"> Subjects </div>
				<LeftList subjectList={props.subjectList}/>
			</div>
			
			<div className="courseListRightCourse">
				<div className="courseListTitle"> Courses </div>
				<RightList courseList={props.courseList}/>
			</div>
			
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
			<div className="bodyDivInnerLeft">
				<InputField OnChange={props.OnChange} />
				<CourseList subjectList={props.subjectList} courseList={props.courseList}/>
				<div className="bottomHintText">
					*Click on the courses to view details or add it to the plan
				</div>
			</div>
			<PlanInfo />
		</div>
	);

}


class CreatePlan extends Component{
	constructor(props){
		super(props);
		this.state = {
			redirectStr: null,
			inputSubject: "",
			inputCourseNum: "",
			subjectList: ["Computer Science", "Math", "Chemical Engineering"],
			courseList: ["CS 357", "CS 374", "CS 241", "CS 446", "CS 440", "CS 498", "MATH 415", "MATH 486", "CPSC 110"]
		}

		this.menuOnClick = this.menuOnClick.bind(this);
		this.inputOnChange = this.inputOnChange.bind(this);
	}

	// header menu
	menuOnClick(event, {name}){
		this.setState({redirectStr: name}, ()=>{
			console.log("Redirect to " + name);
		})
	}

	// input field
	inputOnChange(event, {name}){
		if(name == subjectStr){
			this.setState({inputSubject: event.target.value}, ()=>{
				console.log("inputSubject: " + this.state.inputSubject);
			})
		}
		if(name == courseNumStr){
			this.setState({inputCourseNum: event.target.value}, ()=>{
				console.log("inputCourseNum: " + this.state.inputCourseNum);
			})
		}
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
				<Body OnChange={this.inputOnChange} subjectList={this.state.subjectList} 
				courseList={this.state.courseList}/>
			</div>
		);
	}
}

export default CreatePlan;