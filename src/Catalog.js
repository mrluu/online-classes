import React, { Component } from 'react';
import "./App.css"

class TopicForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: '*'};

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    //console.log("handleChange " + event.target.value);
    this.setState({value: event.target.value});
    this.props.submitHandler(event.target.value);
  }

  render() {
    return (
      <div>
        <label>
          To browse course listings:&nbsp;
          <select value={this.state.value} onChange={this.handleChange}>
            <option value="">Select a topic</option>
            <option value="art">Art</option>
            <option value="math">Math</option>
            <option value="technology">Technology</option>
            <option value="writing">Writing</option>
          </select>
        </label>
      </div>
    );
  }
}

class CourseListingsTable extends Component {
  constructor(props) {
    super(props);
    this.state = {topic: null};
  }

  onCourseClick(course) {
    this.props.courseClickHandler(course);
  }

  getCourseListings() {
    //console.log("CourseListingsTable: " + this.props.topic);
    if (this.props.topic==="art") {
      return (
        <tr>
          <td>
            <button className="course-number-button"
              onClick={() => this.onCourseClick("ART101")}>ART 101</button>
          </td>
          <td>Introduction to Drawing</td>
        </tr>
      );
    }
    else if (this.props.topic==="math") {
      return (
        <tr>
          <td>
            <button className="course-number-button"
              onClick={() => this.onCourseClick("MATH101")}>MATH 101</button>
          </td>
          <td>Basic Algebra</td>
        </tr>
      );
    }
    else if (this.props.topic==="technology") {
      return (
        <tr>
          <td>
            <button className="course-number-button"
              onClick={() => this.onCourseClick("CS101")}>CS 101</button>
          </td>
          <td>Introduction to Programming</td>
        </tr>
      );
    }
    else if (this.props.topic==="writing") {
      return (
        <tr>
        <td>
          <button className="course-number-button"
            onClick={() => this.onCourseClick("WRT101")}>WRT 101</button>
        </td>
          <td>Introduction to Creative Writing</td>
        </tr>
      );
    }
  }

  render() {
    return (
      <table className="course-listings-table">
        <thead>
        <tr>
          <th>Course Number</th>
          <th>Course Title</th>
        </tr>
        </thead>
        <tbody>
          {this.getCourseListings()}
        </tbody>
      </table>
    );
  }
}

class Catalog extends Component {
  constructor(props) {
    super(props);
    this.state = {
        selected_topic: null,
        selected_course: null
    };
  }

  setSelectedTopic(topic) {
    this.setState({
      selected_topic: topic,
      selected_course: null
    });

    //this.renderCourseDescription();
    //console.log("selected topic is: " + topic);
  }

  courseClickHandler(course) {
    this.setState({
      selected_course: course,
    })
    //console.log("clicked course: " + course);
  }

  renderCourseDescription() {
    //console.log("render course desc");
    if (this.state.selected_course) {
      return (
        <p>This is the description for {this.state.selected_course}</p>
      );
    }
  }

  render() {
    return (
      <div>
        <h1> Course Catalog </h1>
        <TopicForm submitHandler={(topic) => this.setSelectedTopic(topic)}/>
        <CourseListingsTable topic={this.state.selected_topic}
          courseClickHandler={(course) => this.courseClickHandler(course)}/>
        <div className="course-desc-row">
          {this.renderCourseDescription()}
        </div>
      </div>
    );
  }
}

export default Catalog;