import React, { Component } from 'react';
import firebase, {auth, db} from "./firebase";
import CourseDetails from './CourseDetails'
import CourseListingsTable from './CourseListingsTable'
import TopicForm from './TopicForm'
import "./App.css"

class Catalog extends Component {
  constructor(props) {
    super(props);
    this.state = {
        selected_topic: null,
        selected_course: null,
        showCourseDetailsModal: false,
        coursesForTopic: [],
    };
  }

  showCourseDetails() {
    this.setState({showCourseDetailsModal: true});
  }

  hideCourseDetails() {
    this.setState({showCourseDetailsModal: false});
  }

  setSelectedTopic(topic) {
    //console.log("Catalog.setSelectedTopic() " + topic);
    this.getCoursesForTopic(topic);
    this.setState({
      selected_topic: topic,
      selected_course: null
    });
  }

  courseClickHandler(course) {
    this.setState({
      selected_course: course,
    })
    this.showCourseDetails();
  }

  getCoursesForTopic(topic) {
    if (topic) {
      let matchingCourses = [];
      
      matchingCourses.push({
        class_id: "CLASS123",
        description: "Class description",
        name: "Class name",
        short_summary: "Class summary",
        teacher: "Teacher",
        record_id: "CLASS123",
      });

      this.setState({coursesForTopic: matchingCourses});
    }
  }

  render() {
    return (
      <div className="catalog">
        <div className="page-banner"> Course Catalog </div>
        <TopicForm submitHandler={(topic) => this.setSelectedTopic(topic)}/>
        <CourseListingsTable coursesForTopic={this.state.coursesForTopic}
          courseClickHandler={(course) => this.courseClickHandler(course)}/>
        <CourseDetails
          getUser={()=>this.props.getUser()}
          selectedCourse={this.state.selected_course}
          showModal={this.state.showCourseDetailsModal}
          hideModalHandler={() => this.hideCourseDetails()}/>
      </div>
    );
  }
}

export default Catalog;
