import React, { Component } from 'react'
import { Image, List, Menu, Button, Input, Table, Message, Form, Label, Icon} from 'semantic-ui-react'
import { Redirect, Link } from 'react-router-dom'

import styles from './CreatePlan.scss'

const createPlanStr = "Create Plan";
const viewPlanStr = "View Plan";
const logOutStr = "Log Out";

const subjectStr = "example: CS";
const courseNumStr = "example: 374";

const active = true;
const notActive = false;




// the navigation menu
function NavBar(props){
	return(
		<div className="navbarDiv">

			<Menu className="navbar" floated="right" inverted secondary>
				<Menu.Item name={createPlanStr} active={active} onClick={props.OnClick} position="right">
		          	{createPlanStr}
		        </Menu.Item>
		        <Menu.Item name={viewPlanStr} active={active} onClick={props.OnClick} position="right">
		          	{viewPlanStr}
		        </Menu.Item>
		        <Menu.Item name={logOutStr} active={active} onClick={props.OnClick} position="right">
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
			<div className="headerImage"></div>
            <a className="header_title">UIUC Course Scheduler</a>
			<NavBar OnClick={props.OnClick}/>
		</div>
	);
}

// top left input field div
function InputField(props){
	return(
		<div className="inputFieldDiv">
            <h1 className="inputFieldTitle title">Look Up Course</h1>
			<div className="inputField1">
				<Input className="input"  label="&nbsp;&nbsp;Subject&nbsp;&nbsp;&nbsp;&nbsp;" color="blue" placeholder={subjectStr} name={subjectStr}
				onChange={props.OnChange} />
			</div>
			<div className="inputField2">
				<Input className="input" label="Course ID" placeholder={courseNumStr} name={courseNumStr}
				onChange={props.OnChange} />
			</div>

            <div className="inputFieldMessage">
                <Message size="big">
                    <div className="content">
                        <p> Click on the course to view detailed information and add it to your course list.</p>
                    </div>
                </Message>
            </div>
		</div>
	);
}

// inside the course list, the left subject list
function LeftList(props){
	let listItems = props.subjectList.map((element, index)=>{
		return(
			<li key={index} className="listItem">
				{element}
			</li>
		);
	})

	return(

            <ul className="leftList">
			{listItems}
            </ul>

	);
}

// inside the course list, the right subject list
function RightList(props){
	let listItems = props.courseList.map((element, index)=>{
		return(
            <List.Item key={index}>
                <div className="rightItem">{element}</div>
            </List.Item>
		);
	})

	return(
        <div className="rightList">
	        <List selection>
			        {listItems}
            </List>
        </div>
	);
}

// bottom left course list
function CourseList(props){
	return(
		<div className="courseListDiv">
            <Table celled size="large" color="yellow">
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Subjects</Table.HeaderCell>
                        <Table.HeaderCell>Courses</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    <Table.Row>
                        <Table.Cell width="1"><LeftList subjectList={props.subjectList}/></Table.Cell>
                        <Table.Cell><RightList courseList={props.courseList}/></Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table>
		</div>
	);
}

function PlanInfo(props){
	return(
		<div className="planInfoDiv">
            <h1 className="planInfoTitle title">New Plan</h1>
            <div className="planName">
                <h3 className="nameTag">Plan Name:</h3>
                <Input className="nameInput" placeholder='' size="small" />
            </div>
            <div className="courseListTag">
                <h3> Course List</h3>
                <a className="credit"> total: {props.credit} credit</a>
            </div>
            <div className="courseList">
                <AddList course={props.course}/>
            </div>
            <div className="buttons">
                <Button size="large" primary>Create Plan</Button>
                <Button size="large" primary>Reset Plan</Button>
            </div>
		</div>
	);
}

function AddList(props){
	let listItems = props.course.map((element, index)=>{
		return(
			<li key={index} className="addTag">
			    <Label size="large" as='a' tag>
                    {element}
                </Label>
			</li>
		);
	})

	return(

            <ul className="addList">
			{listItems}
            </ul>

	);
}

// wrapper for body
function Body(props){
	return(
		<div className="bodyDiv">
            <PlanInfo credit={props.credit} course={props.course}/>
			<div className="bodyDivInnerRight">
				<InputField OnChange={props.OnChange} />
				<CourseList subjectList={props.subjectList} courseList={props.courseList}/>
			</div>

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
			subjectList: ["CS","CE","CEE","MATH","PHYS","PHIL"],
			courseList: ["CS 357 	Numerical Methods I", "CS 374 Algorithms & Models of Computation", "CS 241 	System Programming", "CS 446 Machine Learning", "CS 440 Artificial Intelligence", "CS 411 Database System"],
            course: ["CS 357 	Numerical Methods I", "CS 374 Algorithms & Models of Computation","MATH 415 Linear Algebra","CS 225 Data Structure"],
            credit: 12
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
				courseList={this.state.courseList} course={this.state.course} credit={this.state.credit}/>
			</div>
		);
	}
}

export default CreatePlan;
