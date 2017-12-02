import React, { Component } from 'react'
import { Image, List, Menu, Button, Input, Dropdown } from 'semantic-ui-react'
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
	schedules:[
		{
			name: "Schedule 1_1",
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
            name: "Schedule 1_2",
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
    schedules:[
        {
            name: "Schedule 2_1",
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
            name: "Schedule 2_2",
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
function ScheduleList(props){
	let temp = ""
	if(props.currPlan != null){
        temp = props.currPlan.schedules.map((element, index)=>{
            return(
				<List.Item key={index} active={props.currScheduleIndex == index} name={index} className="scheduleItem"
						   content={element.name} onClick={props.ScheduleClick}/>
            )
        });
	}

	return(
		<List selection celled className="scheduleList" size="big">
			{temp}
		</List>
	)
}

//left div
function LeftDiv(props){
	return(
		<div className="leftDiv">
			<h1 className="planTitle title">Select a Plan</h1>
			<div className="inputContainer">
				<h3 className="inputLabel"> Plan Name: </h3>
				<div className="dropdownContainer">
					<Dropdown className="dropdown" selection options={options}
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
				<h2 className="planInfoCourses" key={index}>{element}</h2>
            )

        })
    }
	return(
		<div className="rightDiv">
			<div className="planInfoContainer">
				<h2 className="planInfo">{props.currPlan.name}</h2>
				<h2 className="planInfo">Semester: {props.currPlan.semester}</h2>
				<h2 className="planInfo">Credits: {props.currPlan.credits}</h2>
                {temp}
			</div>
			<div className="scheduleNameLabel">
				<h2>{props.currPlan.schedules[props.currSchedule].name}</h2>
				<h3>Status: <span className={props.currPlan.schedules[props.currSchedule].status}>
					{props.currPlan.schedules[props.currSchedule].status}</span>
					</h3>
			</div>
			<Calendar/>


		</div>

	)
}

function Header(props){
    return(
		<div className="header">
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
			</div>
		);
	}
}

export default ViewPlan;