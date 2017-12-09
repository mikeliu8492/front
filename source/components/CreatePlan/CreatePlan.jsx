import React, { Component } from 'react'
import { Image, List, Menu, Button, Input, Table, Message, Form, Label, Icon, Card} from 'semantic-ui-react'
import { Redirect, Link } from 'react-router-dom'
import axios from "axios";
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
        <div className="header1">
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
        let classes = "listItem";
        if(element === props.state.currentSubject) classes += " selected";
        return(
            <li key={index} onClick={props.selectSubject} className={classes}>
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
        let content = element.courseId + " : "  + element.courseName;
        if(content.length > 50){
             content = content.substring(0,50);
             content = content + " ..."
        }
        let str_index = "" + index;

        return(
            <List.Item key={index} onClick={props.selectCourse}>
                <div name={str_index} className="rightItem">{content}</div>
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

function CourseDetail(props){
    if(props.state.currentCourse == ""){
        return(<div></div>);
    }

    let course = props.state.currentCourse;
    let credit = "";
    if(course.creditInfo != undefined){
        let len = course.creditInfo.length;
        credit = course.creditInfo.substring(0,len-1);
    }

    return (
        <div className="courseDetail">
            <h2 className="courseId"> {course.courseId}</h2>
            <h3 className="courseName"> {course.courseName}</h3>
            <h3 className="creditInfo"> {credit}</h3>
            <p  className="courseInfo">  {course.description} </p>
            <div className="addCourseButton">
                <Button onClick={props.addCourse} size="large" primary >Add to Plan</Button>
            </div>
        </div>

    )
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
                        <Table.HeaderCell>Course Detail</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    <Table.Row>
                        <Table.Cell width="1"><LeftList subjectList={props.subjectList} selectSubject={props.selectSubject} state={props.state}/></Table.Cell>
                        <Table.Cell><RightList courseList={props.courseList} selectCourse={props.selectCourse}/></Table.Cell>
                        <Table.Cell width="6"><CourseDetail addCourse={props.addCourse} state={props.state}/></Table.Cell>
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
                <Input onChange={props.planNameChange} className="nameInput" placeholder='' size="small" />
            </div>
            <div className="courseListTag">
                <h3> Course List</h3>
                <a className="credit"> total: {props.credit} credit</a>
            </div>
            <div className="courseList">
                <AddList course={props.course} deleteCourse={props.deleteCourse}/>
            </div>
            <div className="buttons">
                <Button onClick={props.createPlan}   size="large" primary>Create Plan</Button>
                <Button onClick={props.clearCourse}  size="large" primary>Reset Plan</Button>
            </div>
        </div>
    );
}

function AddList(props){
    let listItems = props.course.map((element, index)=>{

        let show = element.courseId + " : " + element.courseName;
        let str_index = "" + index;

        return(
            <li key={index} className="addTag">
                <Label size="large" as='a' tag>
                    {show}
                    <a onClick={props.deleteCourse} name={str_index} className='delete'>x</a>
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
            <PlanInfo credit={props.credit} course={props.course} deleteCourse={props.deleteCourse}
                      clearCourse={props.clearCourse} planNameChange={props.planNameChange} createPlan={props.createPlan}/>
            <div className="bodyDivInnerRight">
                <InputField OnChange={props.OnChange} />
                <CourseList subjectList={props.subjectList} courseList={props.courseList} addCourse={props.addCourse}
                            selectSubject={props.selectSubject} state={props.state} selectCourse={props.selectCourse}/>
            </div>

        </div>
    );

}

function Footer(){
    return(<div className="footer"></div>);
}




class CreatePlan extends Component{
	constructor(props){
		super(props);
		this.state = {
            plan_name: "",
			redirectStr: null,
			inputSubject: "",
			inputCourseNum: "",
            currentSubject:"",
            currentCourse:"",
            allSubject:["ACCY", "AE", "ANTH", "BADM", "BIOE",
                        "CEE", "CHEM", "CS", "CSE", "ECE", "ECON", "ENGL", "FIN",
                        "GEOL", "HIST", "IE", "MATH", "ME", "PHIL", "PHYS", "PSYC", "REL",
                        "RHET", "STAT"],
			subjectList: ["ACCY", "AE", "ANTH", "BADM", "BIOE",
                        "CEE", "CHEM", "CS", "CSE", "ECE", "ECON", "ENGL", "FIN",
                        "GEOL", "HIST", "IE", "MATH", "ME", "PHIL", "PHYS", "PSYC", "REL",
                        "RHET", "STAT"],
			courseList: [],
            allcourseList: [],
            course: [],
            credit: 0
        }

		this.menuOnClick = this.menuOnClick.bind(this);
		this.inputOnChange = this.inputOnChange.bind(this);
        this.selectSubject = this.selectSubject.bind(this);
        this.baseUrl       = "http://localhost:3000";
        this.selectCourse  = this.selectCourse.bind(this);
        this.addCourse     = this.addCourse.bind(this);
        this.deleteCourse  = this.deleteCourse.bind(this);
        this.clearCourse   = this.clearCourse.bind(this);
        this.planNameChange = this.planNameChange.bind(this);
        this.createPlan     = this.createPlan.bind(this);
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
            let text = event.target.value;
			this.setState({inputSubject: event.target.value}, ()=>{
                this.setState({
                    courseList: []
                })
			});

            let result=[]
            this.state.allSubject.map((subject,index) => {
                if(subject.indexOf(text.toUpperCase()) == 0) result.push(subject)
            });
            this.setState({
                subjectList: result,
                currentSubject: result[0]
            });

            let url = this.baseUrl + "/courses/" + result[0]
            axios.get(url).then(res => {
                this.setState({
                    allcourseList: res.data.data,
                });

                let text = this.state.inputCourseNum;

                let result=[];
                this.state.allcourseList.map((course,index) => {
                    let len = course.courseId.length
                    let num = course.courseId.substring(len-3,len);
                    if(num.indexOf(text) == 0) result.push(course);
                });
                this.setState({
                    courseList: result
                });
            });

		}
		if(name == courseNumStr){
			this.setState({inputCourseNum: event.target.value}, ()=>{

			})

            let text = event.target.value;

            let result=[];
            this.state.allcourseList.map((course,index) => {
                let len = course.courseId.length
                let num = course.courseId.substring(len-3,len);
                if(num.indexOf(text) == 0) result.push(course);
            });
            this.setState({
                courseList: result
            });

		}

	}

    planNameChange(event){
        this.setState({plan_name: event.target.value});
    }

    selectSubject(event){
        this.setState({
            currentSubject: event.target.textContent
        })
        let url = this.baseUrl + "/courses/" + event.target.textContent
        axios.get(url).then(res => {
            this.setState({
                allcourseList: res.data.data,
            });

            let text = this.state.inputCourseNum;

            let result=[];
            this.state.allcourseList.map((course,index) => {
                let len = course.courseId.length
                let num = course.courseId.substring(len-3,len);
                if(num.indexOf(text) == 0) result.push(course);
            });

            this.setState({
                courseList: result
            });
        });
    }

    selectCourse(event){
        if(event.target.attributes.name == undefined) return;
        let index = event.target.attributes.name.value;
        let courseId = this.state.courseList[index].courseId;
        let len = this.state.courseList[index].courseId.length;
        let url = this.baseUrl + "/courses/" + courseId.substring(0,len-4)+"/"+courseId.substring(len-3,len);
        axios.get(url).then(res => {
            this.setState({
                currentCourse: res.data.data
            })
        });
    }

    addCourse(event){
        let course = this.state.currentCourse;
        let arr = this.state.course;
        if (arr.includes(course)) return;
        arr.push(course);
        let credit = this.state.credit + parseInt(this.state.currentCourse.creditInfo.substring(0,1));
        this.setState({
            course: arr,
            credit: credit
        });
    }

    deleteCourse(event){
        let index = event.target.attributes.name.value;
        let arr = this.state.course;
        let credit = this.state.credit - parseInt(this.state.course[index].creditInfo.substring(0,1));
        arr.splice(index,1);
        this.setState({
            credit : credit, 
            course : arr
        });
    }

    clearCourse(event){
        this.setState({
            course:[]
        });
    }

    createPlan(event){
        let url = this.baseUrl + "/users/plan";
        let send = {
            "name" : this.state.plan_name,
            "courses" : this.state.course
        }
        console.log(send);
        axios.post(url,send).then(response => {
                        console.log()
                    });
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
                      selectSubject={this.selectSubject} selectCourse={this.selectCourse}
                      deleteCourse={this.deleteCourse} courseList={this.state.courseList}
                      course={this.state.course} credit={this.state.credit} state={this.state}
                      addCourse={this.addCourse} clearCourse={this.clearCourse} planNameChange={this.planNameChange}
                      createPlan={this.createPlan}/>
                <Footer/>
			</div>
		);
	}
}

export default CreatePlan;
