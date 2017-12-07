import React, { Component } from 'react'
import { Image, List, Menu, Button, Input, Dropdown, Card, Label, Segment } from 'semantic-ui-react'
import {Redirect, Link } from 'react-router-dom'

import styles from './ViewPlan.scss'
const createPlanStr = "Create Plan";
const viewPlanStr = "View Plan";
const logOutStr = "Log Out";

const active = true;

//-----For Testing------------
const plan1 = {
    name: "Plan 1",
    semester: "Spring 2018",
    courses:["CS 374", "CS 498", "CS 440", "CS 225"],
	credits: "13",
    favourate:"Schedule 1_1",
	schedules:[
		{
			name: "Schedule 1",
			status:"available",
			sections:[
				{
                    name:"CS 374",
					code:"AL1",
					type:"LEC",
					start:"10:00",
					end:"10:50"
				},
				{
                    name:"CS 498",
                    code:"AL1",
                    type:"LEC",
                    start:"13:00",
                    end:"13:50"
				},
				{
                    name:"CS 440",
                    code:"AL1",
                    type:"LEC",
                    start:"15:30",
                    end:"16:45"
				},
				{
					name:"CS 225",
					code:"AL1",
					type:"LEC",
					start:"11:00",
					end:"11:50",
				}

			]
		},
		{
            name: "Schedule 2",
			status: "unavailable",
            sections:[
                {
                    name:"CS 374",
                    code:"AL1",
                    type:"LEC",
                    start:"11:00",
                    end:"11:50"
                },
                {
                    name:"CS 498",
                    code:"AL1",
                    type:"LEC",
                    start:"14:00",
                    end:"14:50"
                },
                {
                    name:"CS 440",
                    code:"AL1",
                    type:"LEC",
                    start:"16:30",
                    end:"17:45"
                },
                {
                    name:"CS 225",
                    code:"AL1",
                    type:"LEC",
                    start:"12:00",
                    end:"12:50",
                }

            ]
		}

	]
};
const plan2 = {
    name: "Plan 2",
    semester: "Spring 2018",
	credits:"12",
    courses:["MATH 374", "MATH 498", "MATH 440", "MATH 225"],
    favourate:"Schedule 2_1",
    schedules:[
        {
            name: "Schedule 1",
			status:"unavailable",
            sections:[
                {
                    name:"MATH 374",
                    code:"AL1",
                    type:"LEC",
                    start:"10:00",
                    end:"10:50"
                },
                {
                    name:"MATH 498",
                    code:"AL1",
                    type:"LEC",
                    start:"13:00",
                    end:"13:50"
                },
                {
                    name:"MATH 440",
                    code:"AL1",
                    type:"LEC",
                    start:"15:30",
                    end:"16:45"
                },
                {
                    name:"MATH 225",
                    code:"AL1",
                    type:"LEC",
                    start:"11:00",
                    end:"11:50",
                }

            ]
        },
        {
            name: "Schedule 2",
			status:"available",
            sections:[
                {
                    name:"MATH 374",
                    code:"AL1",
                    type:"LEC",
                    start:"11:00",
                    end:"11:50"
                },
                {
                    name:"MATH 498",
                    code:"AL1",
                    type:"LEC",
                    start:"14:00",
                    end:"14:50"
                },
                {
                    name:"MATH 440",
                    code:"AL1",
                    type:"LEC",
                    start:"16:30",
                    end:"17:45"
                },
                {
                    name:"MATH 225",
                    code:"AL1",
                    type:"LEC",
                    start:"12:00",
                    end:"12:50",
                }

            ]
        }

    ]

}
const options = [
    {key:1, text: "Plan1", value: plan1},
	{key:2, text: "Plan2", value: plan2}
]

//-----------------------------

//the navigation menu
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
//show schedules for current plan
function Get_button(props){
    if(props.status == "available") return( <Button size="mini" positive>&nbsp;&nbsp;&nbsp;available&nbsp;&nbsp;&nbsp;</Button>);
    else return (<Button size="mini" negative>unavailable</Button>);
}


function ScheduleList(props){
	let temp      = "";
    let favourate = "";
	if(props.currPlan != null){
        favourate = props.currPlan.schedules.map((element, index)=>{
            if(props.currPlan.favourate === element.name)
            return(
                <Card centered className="favourate" key={index} name={index} onClick={props.ScheduleClick}>
                    <Card.Content>
                        <div className="card_in">
                            <h3 className="schedule_name">{element.name}</h3>
                        </div>
                        <div className="available_tag">
                            <Get_button status={element.status}/>
                        </div>
                    </Card.Content>
                    <Card.Content extra>

                    </Card.Content>
               </Card>
            )
        });

        temp = props.currPlan.schedules.map((element, index)=>{
            if(props.currPlan.favourate !== element.name)
            return(

                <Card centered key={index} name={index} onClick={props.ScheduleClick}>
                    <Card.Content>
                        <div className="card_in">
                            <h3 className="schedule_name">{element.name}</h3>
                        </div>
                        <div className="available_tag">
                            <Get_button status={element.status}/>
                        </div>
                    </Card.Content>
                    <Card.Content extra>

                    </Card.Content>
               </Card>
            )
        });
	}

	return(
        <div className="scheduleList">
	        <Card.Group itemsPerRow="1">
                {favourate}
			    {temp}
		    </Card.Group>
        </div>
	)
}

//left div
function LeftDiv(props){
	return(
		<div className="leftDiv">
			<div className="inputContainer">
				<h3 className="inputLabel"> Plan Name: </h3>
				<div className="dropdownContainer">
					<Dropdown className="dropdown" selection options={options} size="small"
					   onChange={props.OnChange} value={props.currPlan}/>
				</div>
			</div>
			<div className="scheduleLabel">
				<h3>Possible Schedules</h3>
			</div>
			<div className="scheduleListContainer">
				<ScheduleList currPlan={props.currPlan} currSchedule={props.currSchedule}
							  ScheduleClick={props.ScheduleClick}/>
			</div>
		</div>
	)

}

function Calendar(props){
	return(
		<div className="calendar">


		</div>
	)
}

//Right Div
function RightDiv(props) {
	let temp = ""
    if (props.currPlan != null) {
        temp = props.currPlan.courses.map((element, index) => {
            console.log(element);
            return (
				<a className="planInfoCourses" key={index}>{element}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a>

            )

        })
    }
	return(
		<div className="rightDiv">
			<div className="scheduleNameLabel">
                <Segment raised>
                <Segment vertical>
    				<h1 className="main_title">{props.currPlan.name}</h1>
                    <a className="current_schedule">{props.currPlan.schedules[props.currSchedule].name}</a>
                    <div className="labels">
                        <Label size="large" as='a' color="blue" image>
                            Semester
                            <Label.Detail>{props.currPlan.semester}</Label.Detail>
                        </Label>
                        <Label size="large" as='a' color="blue" image>
                            Credits
                            <Label.Detail>{props.currPlan.credits}</Label.Detail>
                        </Label>
                    </div>
                </Segment>
				<h3 className="status">Status: <span className={props.currPlan.schedules[props.currSchedule].status}>
					&nbsp;&nbsp;&nbsp;{props.currPlan.schedules[props.currSchedule].status}</span>
				</h3>
                <div className="courses">
                    <a className="planInfoCourses course">Courses:&nbsp;&nbsp;&nbsp;</a>
                    {temp}
                </div>
                </Segment>
			</div>
			<Calendar/>


		</div>

	)
}

function Header(props){
    return(
		<div className="header1">
			<div className="headerImage"></div>
			<a className="header_title">UIUC Course Scheduler</a>
			<NavBar OnClick={props.OnClick}/>
		</div>
    );
}

function Body(props){
	return(
		<div className="bodyDiv">
			<LeftDiv OnChange = {props.OnChange} currPlan={props.currPlan}
					 currSchedule={props.currSchedule} ScheduleClick={props.ScheduleClick}/>

			<RightDiv currPlan={props.currPlan} currSchedule={props.currSchedule} ScheduleClick={props.ScheduleClick} />
		</div>
	)

}

function Footer(){
    return(<div className="footer"></div>);
}


class ViewPlan extends Component{
	constructor(props){
		super(props);
		this.state={
			redirectStr:null,
			currPlan:plan1,
			currScheduleIndex:0
		};
        this.menuOnClick = this.menuOnClick.bind(this);
        this.inputOnChange = this.inputOnChange.bind(this);
        this.scheduleOnClick = this.scheduleOnClick.bind(this);

	}

    inputOnChange(event, data){
        this.setState({currPlan:data['value']},()=>{
            console.log("currPlan: " + this.state.currPlan)});
    }

    menuOnClick(event, {name}){
        this.setState({redirectStr: name}, ()=>{
            console.log("Redirect to " + name);
        })
    }
    scheduleOnClick(event, {name}){
    	this.setState({currScheduleIndex:name});
		console.log(this.state.currScheduleIndex);

	}

	render(){
        if(this.state.redirectStr === createPlanStr){
            console.log("Redirect to create");
            return <Redirect to="/create"/>
        }
        if(this.state.redirectStr === viewPlanStr){
            console.log("Refresh view");
            window.location.reload();
            this.setState({redirectStr: null});
        }

		return (
			<div>
				<Header OnClick={this.menuOnClick}/>
				<Body OnChange={this.inputOnChange} currPlan={this.state.currPlan} ScheduleClick={this.scheduleOnClick}
				currSchedule={this.state.currScheduleIndex}/>
                <Footer/>
			</div>
		);
	}
}

export default ViewPlan;
