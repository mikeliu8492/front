import React, { Component } from 'react'
import { Image, List, Menu, Button, Input, Dropdown, Card, Label, Segment, Table } from 'semantic-ui-react'
import {Redirect, Link } from 'react-router-dom'
import axios from "axios"

import styles from './ViewPlan.scss'
const createPlanStr = "Create Plan";
const viewPlanStr = "View Plan";
const logOutStr = "Log Out";

const active = true;

const courses = [

    {
        "courseId": "CS 374",
        "courseName": "Introduction to Algorithms & Models of Computation",
        "creditInfo": "4 hours.",
        "description": "Analysis of algorithms, major paradigms of algorithm design including recursive algorithms, divide-and-conquer algorithms, dynamic programming, greedy algorithms, and graph algorithms. Formal models of computation including finite automata and Turing machines. Limitations of computation arising from fundamental notions of algorithm and from complexity-theoretic constraints. Reductions, undecidability and NP-completeness. Same as ECE 374. Prerequisite: CS 225; MATH 225 or MATH 415.",
        "sections": [
            {
                "crn": "65088",
                "sectionId": "AL1",
                "type": "LEC",
                "days": "TR",
                "start": "11:00",
                "end": "12:15"
            },
            {
                "crn": "65089",
                "sectionId": "AYA",
                "type": "DIS",
                "days": "WF",
                "start": "09:00",
                "end": "09:50"
            },
            {
                "crn": "65090",
                "sectionId": "AYB",
                "type": "DIS",
                "days": "WF",
                "start": "10:00",
                "end": "10:50"
            },
            {
                "crn": "65091",
                "sectionId": "AYC",
                "type": "DIS",
                "days": "WF",
                "start": "11:00",
                "end": "11:50"
            },
            {
                "crn": "65092",
                "sectionId": "AYD",
                "type": "DIS",
                "days": "WF",
                "start": "12:00",
                "end": "12:50"
            },
            {
                "crn": "65093",
                "sectionId": "AYE",
                "type": "DIS",
                "days": "WF",
                "start": "13:00",
                "end": "13:50"
            },
            {
                "crn": "65094",
                "sectionId": "AYF",
                "type": "DIS",
                "days": "WF",
                "start": "14:00",
                "end": "14:50"
            },
            {
                "crn": "65095",
                "sectionId": "AYG",
                "type": "DIS",
                "days": "WF",
                "start": "15:00",
                "end": "15:50"
            },
            {
                "crn": "65096",
                "sectionId": "AYH",
                "type": "DIS",
                "days": "WF",
                "start": "16:00",
                "end": "16:50"
            },
            {
                "crn": "65097",
                "sectionId": "AYJ",
                "type": "DIS",
                "days": "WF",
                "start": "13:00",
                "end": "13:50"
            },
            {
                "crn": "65098",
                "sectionId": "AYK",
                "type": "DIS",
                "days": "WF",
                "start": "14:00",
                "end": "14:50"
            },
            {
                "crn": "67005",
                "sectionId": "BL1",
                "type": "LEC",
                "days": "TR",
                "start": "11:00",
                "end": "12:15"
            },
            {
                "crn": "67949",
                "sectionId": "BYA",
                "type": "DIS",
                "days": "WF",
                "start": "09:00",
                "end": "09:50"
            },
            {
                "crn": "67951",
                "sectionId": "BYB",
                "type": "DIS",
                "days": "WF",
                "start": "10:00",
                "end": "10:50"
            },
            {
                "crn": "67953",
                "sectionId": "BYC",
                "type": "DIS",
                "days": "WF",
                "start": "13:00",
                "end": "13:50"
            },
            {
                "crn": "67955",
                "sectionId": "BYD",
                "type": "DIS",
                "days": "WF",
                "start": "14:00",
                "end": "14:50"
            },
            {
                "crn": "67957",
                "sectionId": "BYE",
                "type": "DIS",
                "days": "WF",
                "start": "15:00",
                "end": "15:50"
            },
            {
                "crn": "67959",
                "sectionId": "BYF",
                "type": "DIS",
                "days": "WF",
                "start": "16:00",
                "end": "16:50"
            },
            {
                "crn": "67961",
                "sectionId": "BYG",
                "type": "DIS",
                "days": "WF",
                "start": "15:00",
                "end": "15:50"
            },
            {
                "crn": "67963",
                "sectionId": "BYH",
                "type": "DIS",
                "days": "WF",
                "start": "16:00",
                "end": "16:50"
            }
        ]
    },
    {
        "courseId": "CS 421",
        "courseName": "Progrmg Languages & Compilers",
        "creditInfo": "3 OR 4 hours.",
        "description": "Structure of programming languages and their implementation. Basic language design principles; abstract data types; functional languages; type systems; object-oriented languages. Basics of lexing, parsing, syntax-directed translation, semantic analysis, and code generation. 3 undergraduate hours. 3 or 4 graduate hours. Prerequisite: CS 233 and CS 373.",
        "sections": [
            {
                "crn": "31375",
                "sectionId": "B3",
                "type": "LEC",
                "days": "TR",
                "start": "17:00",
                "end": "18:15"
            },
            {
                "crn": "31376",
                "sectionId": "B4",
                "type": "LEC",
                "days": "TR",
                "start": "17:00",
                "end": "18:15"
            },
            {
                "crn": "63756",
                "sectionId": "C3",
                "type": "LEC",
                "days": "TR",
                "start": "15:30",
                "end": "16:45"
            },
            {
                "crn": "63757",
                "sectionId": "C4",
                "type": "LEC",
                "days": "TR",
                "start": "15:30",
                "end": "16:45"
            }
        ]
    },
    {
        "courseId": "CS 411",
        "courseName": "Database Systems",
        "creditInfo": "3 OR 4 hours.",
        "description": "Examination of the logical organization of databases: the entity-relationship model; the hierarchical, network, and relational data models and their languages. Functional dependencies and normal forms. Design, implementation, and optimization of query languages; security and integrity; concurrency control, and distributed database systems. 3 undergraduate hours. 3 or 4 graduate hours. Prerequisite: CS 225.",
        "sections": [
            {
                "crn": "31352",
                "sectionId": "N3",
                "type": "LEC",
                "days": "MW",
                "start": "08:00",
                "end": "09:15"
            },
            {
                "crn": "31355",
                "sectionId": "N4",
                "type": "LEC",
                "days": "MW",
                "start": "08:00",
                "end": "09:15"
            }
        ]
    },
    {
        "courseId": "CS 431",
        "courseName": "Embedded Systems",
        "creditInfo": "3 or 4 hours.",
        "description": "A survey of sampled data systems and embedded architecture; key concepts in common embedded system applications; signal processing and control; embedded microprocessor and device interface; time-critical I/O handling; data communications; real-time operating systems and techniques for the development and analysis of embedded real-time software; hands-on laboratory projects. 3 undergraduate hours. 3 or 4 graduate hours. Prerequisite: CS 241 or ECE 391.",
        "sections": [
            {
                "crn": "31398",
                "sectionId": "AB1",
                "type": "LAB",
                "days": "W",
                "start": "15:00",
                "end": "16:50"
            },
            {
                "crn": "31401",
                "sectionId": "AB2",
                "type": "LAB",
                "days": "W",
                "start": "17:00",
                "end": "18:50"
            },
            {
                "crn": "31399",
                "sectionId": "AB3",
                "type": "LAB",
                "days": "R",
                "start": "17:00",
                "end": "18:50"
            },
            {
                "crn": "31393",
                "sectionId": "AL3",
                "type": "LEC",
                "days": "TR",
                "start": "12:30",
                "end": "13:45"
            },
            {
                "crn": "31396",
                "sectionId": "AL4",
                "type": "LEC",
                "days": "TR",
                "start": "12:30",
                "end": "13:45"
            }
        ]
    },
    {
        "courseId": "CS 423",
        "courseName": "Operating Systems Design",
        "creditInfo": "3 OR 4 hours.",
        "description": "Organization and structure of modern operating systems and concurrent programming concepts. Deadlock, virtual memory, processor scheduling, and disk systems. Performance, security, and protection. Same as CSE 423. 3 undergraduate hours. 3 or 4 graduate hours. Prerequisite: CS 241 or ECE 391.",
        "sections": [
            {
                "crn": "31378",
                "sectionId": "C3",
                "type": "LEC",
                "days": "MWF",
                "start": "11:00",
                "end": "11:50"
            },
            {
                "crn": "31379",
                "sectionId": "C4",
                "type": "LEC",
                "days": "MWF",
                "start": "11:00",
                "end": "11:50"
            }
        ]
    }

]

//-----For Testing------------

const plan = {"name": "Plan 1",
    courses:['CS421, CS411, CS431, CS423, CS374'],
    schedules:[
    '31375;31352;31393;31378;65088;;;;;65090;;;31398;;;',
    '63756;31352;31393;31378;65088;;;;;65090;;;31398;;;',
    '31375;31352;31393;31378;65088;;;;;65092;;;31398;;;',
    '31375;31352;31393;31378;65088;;;;;65093;;;31398;;;',
    '31375;31352;31393;31378;65088;;;;;65094;;;31398;;;',
    '31375;31352;31393;31378;65088;;;;;65095;;;31401;;;',
    '31375;31352;31393;31378;65088;;;;;65096;;;31401;;;',
    '63756;31352;31393;31378;65088;;;;;65092;;;31398;;;',
    '63756;31352;31393;31378;65088;;;;;65093;;;31398;;;',
    '63756;31352;31393;31378;65088;;;;;65094;;;31398;;;',
    '63756;31352;31393;31378;65088;;;;;65095;;;31401;;;',
    '63756;31352;31393;31378;65088;;;;;65096;;;31401;;;',
    '31375;31352;31393;31378;65088;;;;;65090;;;31401;;;',
    '63756;31352;31393;31378;65088;;;;;65090;;;31401;;;',
    '31375;31352;31393;31378;65088;;;;;65092;;;31401;;;',
    '31375;31352;31393;31378;65088;;;;;65093;;;31401;;;',
    '31375;31352;31393;31378;65088;;;;;65094;;;31401;;;',
    '63756;31352;31393;31378;65088;;;;;65092;;;31401;;;',
    '63756;31352;31393;31378;65088;;;;;65093;;;31401;;;',
    '63756;31352;31393;31378;65088;;;;;65094;;;31401;;;' ]}

const d = {};


const options = [
    {key:1, text: plan.name, value: plan}
]
const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
const times = ["8:00", "8:30", "9:00", "9:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30",
    "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30"]

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
	    /*
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
        });**/

        temp = props.currPlan.schedules.map((element, index)=>{
            //if(props.currPlan.favourate !== element.name)
            return(

                <Card centered key={index} name={index} onClick={props.ScheduleClick}>
                    <Card.Content>
                        <div className="card_in">
                            <h3 className="schedule_name">Schedule {index}</h3>
                        </div>
                        <div className="available_tag">
                            <Get_button status="available"/>
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
            <div className="scheduleListUnder"></div>
		</div>
	)

}

//function to display a row in schedule calendar
function ScheduleBlock(props){
    let schedule = props.currPlan.schedules[props.currSchedule].split(";");
    let blocks = days.map((element,index)=>{
        let i = 0;
        for(i=0; i<schedule.length; i++){                  //loop over the sections for the schedule
            if(schedule[i] === ""){
                continue;
            }
            let info = d[schedule[i]];
            //-------parsing the times
            let sDays = info.days.split('');
            let j = 0;
            for(j = 0; j<sDays.length;j++){
                if(sDays[j] == 'M'){
                    sDays[j] = 'Monday'
                }
                else if(sDays[j] == 'T'){
                    sDays[j] = 'Tuesday'
                }
                else if(sDays[j] == 'W'){
                    sDays[j] = 'Wednesday'
                }
                else if(sDays[j] == 'R'){
                    sDays[j] = 'Thursday'
                }
                else if(sDays[j] == 'F'){
                    sDays[j] = 'Friday'
                }
            }
            let startTime = info.start.split(':');
            let endTime = info.end.split(':');
            let currTime = props.time.split(":");
            let startH = Number(startTime[0]);
            let endH = Number(endTime[0]);

            //----------------
            //console.log(startH)
            //console.log(currTime[0]);
            if(startH == currTime[0] && Number(startTime[1]) >= Number(currTime[1]) && Number(startTime[1]) < Number(currTime[1]) + 30){           //check if any sections have a start time matching the current row's time range
                if(sDays.indexOf(element) > -1){//if time matches, check which day
                    if(endH > Number(currTime[0]) && Number(endTime[1]) >= Number(currTime[1])+20)   // if 2 hours long, make the block 4 rows
                    {
                        return(
                            <Table.Cell active rowSpan='4' key={props.time + element}>
                                <p>{info.courseName}</p>
                                <p>{info.sectionId}</p>
                                <p>{info.start}-
                                    {info.end}</p>
                            </Table.Cell>
                        )
                    }
                    else if(endH > Number(currTime[0]))   // if longer than an hour, make the block 3 rows
                    {
                        return(
                            <Table.Cell active rowSpan='3' key={props.time + element}>
                                <p>{info.courseName}</p>
                                <p>{info.sectionId}</p>
                                <p>{info.start}-
                                    {info.end}</p>
                            </Table.Cell>
                        )
                    }
                    else{
                        return(
                            <Table.Cell active rowSpan='2' key={props.time + element}>
                                <p>{info.courseName}</p>
                                <p>{info.sectionId}</p>
                                <p>{info.start}-
                                    {info.end}</p>
                            </Table.Cell>
                        )
                    }



                }

            }
            //check if the block is two rows so we can avoid adding a block in that spot
            else if(endH == currTime[0] && Number(endTime[1]) >= Number(currTime[1]) && startH <= Number(currTime[0])){
                if(sDays.indexOf(element) > -1) {
                    return;
                }
            }
            else if(endH > Number(currTime[0]) &&  startH <= Number(currTime[0])){
                if(sDays.indexOf(element) > -1) {
                    return;
                }
            }
        }
        //if no matches, just return an empty cell
        return(
            <Table.Cell key={props.time + element}>

            </Table.Cell>

        )
    })


    return(
        <Table.Row>
            <Table.Cell rowSpan='1'>{props.time}</Table.Cell>
            {blocks}
        </Table.Row>

    )

}
//calendar component
function Calendar(props){
    let headers = days.map((element,index)=>{
        return(
            <Table.HeaderCell key={element}>{element}</Table.HeaderCell>
        )

    });

    //each row is a particular time
    let rows = times.map((element, index)=>{
        return(
            <ScheduleBlock key={index} time={element} currPlan={props.currPlan} currSchedule={props.currSchedule}/>
        )

    })

    return(
        <div className="calendar">
            <Table fixed celled striped padded>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell width="1"/>
                        {headers}

                    </Table.Row>

                </Table.Header>

                <Table.Body>
                    {rows}

                </Table.Body>


            </Table>


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
            <Calendar currPlan={props.currPlan} currSchedule={props.currSchedule}/>


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
			currPlan:plan,
			currScheduleIndex:0,
            dict:d

		};
        this.menuOnClick = this.menuOnClick.bind(this);
        this.inputOnChange = this.inputOnChange.bind(this);
        this.scheduleOnClick = this.scheduleOnClick.bind(this);
        this.baseUrl = "http://localhost:3000";

	}

    componentWillMount(){

          courses.map((course,index) => {
              course.sections.map((section,index) => {
                  section.courseName = course.courseId;
                  d[section.crn]= section;
              });
          });

          console.log(d);

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
		//console.log(this.state.currScheduleIndex);

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
