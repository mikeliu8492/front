import React, { Component } from 'react'
import { Image, List, Menu, Button, Input, Dropdown, Card, Label, Segment, Table, Message , Loader} from 'semantic-ui-react'
import {Redirect, Link } from 'react-router-dom'
import axios from "axios"

import styles from './ViewPlan.scss'
const createPlanStr = "Create Plan";
const viewPlanStr = "View Plan";
const logOutStr = "Log Out";

const active = true;


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
				<Menu.Item name={logOutStr} active={active} onClick={props.logout} position="right">
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
        //console.log(props.currPlan.schedules);


        temp = props.currPlan.schedules.map((element, index)=>{
            //if(props.currPlan.favourate !== element.name)
            //console.log(element);
            let temp1 = element.split(";");
            let i = 0
            let status = "available";
            let crn= "";
            let first= true;

            for(i=0; i<temp1.length - 2;i++){

                if(temp1[i] == "" || temp1[i] == "A" || temp1[i] == "U"){
                    continue;
                }
                //console.log(temp1[i]);
                //console.log(props.state.dict[temp1[48199]]);
                if(!first) crn += " , ";
                else first=false;
                crn += temp1[i];
                if(props.state.dict[temp1[i]].available == false){
                    status = "unavailable"
                }

            }
            return(

                <Card centered key={index} name={index} onClick={props.ScheduleClick}>
                    <Card.Content>
                        <div className="card_in">
                            <h3 className="schedule_name">Schedule {index}</h3>
                        </div>
                        <div className="available_tag">
                            <Get_button status={status}/>
                        </div>
                    </Card.Content>
                    <Card.Content extra>
                        <p className="crns">CRN:&nbsp;&nbsp;{crn}</p>
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
					<Dropdown className="dropdown" selection options={props.options} size="small"
					   onChange={props.OnChange} value={props.currPlan}/>
				</div>
			</div>
			<div className="scheduleLabel">
				<h3>Possible Schedules</h3>
			</div>
			<div className="scheduleListContainer">
				<ScheduleList currPlan={props.currPlan} currSchedule={props.currSchedule}
							  ScheduleClick={props.ScheduleClick} state={props.state}/>
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
        for(i=0; i<schedule.length - 2; i++){                  //loop over the sections for the schedule
            if(schedule[i] === ""){
                continue;
            }
            let info = props.state.dict[schedule[i]];
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
                            <Table.Cell className={info.available.toString()} rowSpan='4' key={props.time + element}>
                                <p className="sectionName">{info.courseName}</p>
                                <p className="sectionID">{info.sectionId}</p>
                                <p className="sectionTime">{info.start}-
                                    {info.end}</p>
                            </Table.Cell>
                        )
                    }
                    else if(endH > Number(currTime[0]))   // if longer than an hour, make the block 3 rows
                    {
                        return(
                            <Table.Cell className={info.available.toString()}  rowSpan='3' key={props.time + element}>
                                <p className="sectionName">{info.courseName}</p>
                                <p className="sectionID">{info.sectionId}</p>
                                <p className="sectionTime">{info.start}-
                                    {info.end}</p>
                            </Table.Cell>
                        )
                    }
                    else{
                        return(
                            <Table.Cell className={info.available.toString()} rowSpan='2' key={props.time + element}>
                                <p className="sectionName">{info.courseName}</p>
                                <p className="sectionID">{info.sectionId}</p>
                                <p className="sectionTime">{info.start}-
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
            <ScheduleBlock key={index} time={element} currPlan={props.currPlan} currSchedule={props.currSchedule} state={props.state}/>
        )

    })

    return(
        <div className="calendar">
            <Table celled striped padded size="small">
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
    let status1 = "available"
    if (props.currPlan != null) {
        temp = props.currPlan.courses.map((element, index) => {
            //console.log(element);
            return (
				<a className="planInfoCourses" key={index}>{element.courseId}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a>

            )

        })

        if(props.currPlan.schedules.length == 0){
            return(
                <div className="rightDiv">
                    <div  className="no_possible">
                        <h1>No Possibles schedule for this plan</h1>
                        <Label onClick={props.deletePlan} size="large" as='a' color="red" image>
                            Delete Plan
                        </Label>
                    </div>
                </div>
            );
        }

        let temp1 = props.currPlan.schedules[props.currSchedule].split(";");
        let i = 0
        for(i=0; i<temp1.length - 2;i++){
            if(temp1[i] == ""){
                continue;
            }
            if(props.state.dict[temp1[i]].available == false){
                status1 = "unavailable"
            }

        }
    }
	return(
		<div className="rightDiv">
			<div className="scheduleNameLabel">
                <Segment raised className="planInfoSeg" color="yellow">
                <Segment vertical>
    				<h1 className="main_title">{props.currPlan.name}</h1>
                    <a className="current_schedule">{props.currPlan.schedules[props.currSchedule].name}</a>
                    <div className="labels">
                        <Label size="large" as='a' color="blue" image>
                            Semester
                            <Label.Detail>Spring</Label.Detail>
                        </Label>
                        <Label size="large" as='a' color="blue" image>
                            Credits
                            <Label.Detail>2018</Label.Detail>
                        </Label>
                        <Label onClick={props.deletePlan} size="large" as='a' color="red" image>
                            Delete
                        </Label>
                    </div>
                </Segment>
				<h3 className="status">Status: <span className={status1}>
					&nbsp;&nbsp;&nbsp;{status1}</span>
				</h3>
                <div className="courses">
                    <a className="planInfoCourses course">Courses:&nbsp;&nbsp;&nbsp;</a>
                    {temp}
                </div>
                </Segment>
			</div>
            <div className="calendarSeg">
                <Segment raised>
                    <Calendar currPlan={props.currPlan} currSchedule={props.currSchedule} state={props.state}/>
                </Segment>
            </div>
		</div>

	)
}

function Header(props){
    return(
		<div className="header1">
			<div className="headerImage"></div>
			<a className="header_title">UIUC Course Scheduler</a>
			<NavBar OnClick={props.OnClick} logout={props.logout}/>
		</div>
    );
}

function Body(props){
	return(
		<div className="bodyDiv">
			<LeftDiv OnChange = {props.OnChange} currPlan={props.currPlan} options={props.options}
					 currSchedule={props.currSchedule} ScheduleClick={props.ScheduleClick} state={props.state}/>

			<RightDiv currPlan={props.currPlan} currSchedule={props.currSchedule} ScheduleClick={props.ScheduleClick}
                      state={props.state}       deletePlan={props.deletePlan} />
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
            data: false,
			redirectStr:null,
            plans:[],
			currPlan: null,
			currScheduleIndex: 0,
            dict: {},
            options: [],
            logout: false,
            no_plan: false,
            reload_page: false
		};
        this.menuOnClick = this.menuOnClick.bind(this);
        this.inputOnChange = this.inputOnChange.bind(this);
        this.scheduleOnClick = this.scheduleOnClick.bind(this);
        this.deletePlan      = this.deletePlan.bind(this);
        this.baseUrl = "https://uiuc-course-scheduler.herokuapp.com";

	}

    logout(){
        let url = this.baseUrl + "/users/logout"
        axios.get(url).then(res => {
            this.setState({
                logout: true
            });
        });
    }

    deletePlan(){
        console.log(this.state.currPlan._id);
        let url = this.baseUrl + "/users/plan/" + this.state.currPlan._id;
        axios.delete(url).then(res => {
            this.setState({
                reload_page: true
            })
        });
    }

    componentWillMount(){

        let url = this.baseUrl + "/users/plan"

        axios.get(url).then(res => {


            console.log(res.data.data.length);
            if(res.data.data.length == 0){
                console.log("no");
                this.setState({
                    no_plan: true,
                    data: true
                });
                return;
            }

            console.log("load plan")
            let arr=[];
            res.data.data.map((plan,index) => {
                arr.push({key: index+1 , text: plan.name, value: plan});
            });

            res.data.data[0].courses.map((course,index) => {
                  course.sections.map((section,index) => {
                      section.courseName = course.courseId;
                      this.state.dict[section.crn]= section;
                  });
            });

            this.setState({
                dict: this.state.dict,
                currPlan: res.data.data[0],
                options: arr,
                plans: res.data.data,
                data: true
            });


        })

      }

    inputOnChange(event, data){

        data['value'].courses.map((course,index) => {
              course.sections.map((section,index) => {
                  section.courseName = course.courseId;
                  this.state.dict[section.crn]= section;
              });
        });

        this.setState({
            currPlan: data['value'],
            dict: this.state.dict
        },()=>{
        /*console.log("currPlan: " + this.state.currPlan)*/});


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

        if(this.state.reload_page){
            window.location.reload();
        }

        if(this.state.logout){
            return <Redirect to="/login"/>
        }

        if(this.state.redirectStr === createPlanStr){
            console.log("Redirect to create");
            return <Redirect to="/create"/>
        }

        if(!this.state.data){
            return (
                <div>
                    <Header OnClick={this.menuOnClick} logout={this.logout.bind(this)}/>
                    <div className="blank"></div>
                    <div className="bodyDiv">
                        <div className="loading_box">
                            <Loader active inline size="huge"/>
                            <h1>Loading Your Plans</h1>
                        </div>
                    </div>
                </div>
            );
        }


        if(this.state.no_plan){

            return(
                <div>
                    <Header OnClick={this.menuOnClick} logout={this.logout.bind(this)}/>
                    <div className="blank"></div>
                    <div className="bodyDiv">
                        <div className="message_box">
                            <h1>Your Plan Repository is Empty</h1>
                            <h3 className="lookback">look back here after you have created a plan</h3>
                        </div>
                    </div>
                </div>
            );

        }


        if(this.state.redirectStr === viewPlanStr){
            console.log("Refresh view");
            window.location.reload();
            this.setState({redirectStr: null});
        }

		return (
			<div>
				<Header OnClick={this.menuOnClick} logout={this.logout.bind(this)}/>
                <div className="blank"></div>
				<Body deletePlan={this.deletePlan} OnChange={this.inputOnChange} currPlan={this.state.currPlan} ScheduleClick={this.scheduleOnClick}
				currSchedule={this.state.currScheduleIndex} options={this.state.options} state={this.state}/>
                <Footer/>
			</div>
		);
	}
}

export default ViewPlan;
