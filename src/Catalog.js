import React, { Component } from 'react';
import ClassDetails from './ClassDetails'
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
    const labelStyle = {
      "fontSize": "32px",
    };

    const selectStyle = {
      "fontSize": "20px",
    };

    return (
      <div className="topic-selector">
        <label style={labelStyle}>
          Browse course listings by topic:&nbsp;
          <select style={selectStyle} value={this.state.value} onChange={this.handleChange}>
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
        <React.Fragment>
        <tr>
          <td>
            <button className="course-number-button"
              onClick={() => this.onCourseClick("ART101")}>ART 101</button>
          </td>
          <td>Introduction to Drawing</td>
        </tr>
        <tr>
          <td>
            <button className="course-number-button"
              onClick={() => this.onCourseClick("ART102")}>ART 102</button>
          </td>
          <td>Introduction to Painting</td>
        </tr>
        </React.Fragment>
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
        selected_course: null,
        showClassDetailsModal: false,
    };
  }

  showClassDetails() {
    this.setState({showClassDetailsModal: true});
  }

  hideClassDetails() {
    this.setState({showClassDetailsModal: false});
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
    this.showClassDetails();
    //console.log("clicked course: " + course);
  }

  renderCourseDescription() {
    //console.log("render course desc");
    const descStyle = {
      paddingLeft: "10px",
      paddingTop: "20px",
    };

    if (this.state.selected_course) {
      return (
        <div style={descStyle}>This is the description for {this.state.selected_course}</div>
      );
    }
  }

  render() {
    return (
      <div className="catalog">
        <div className="page-banner"> Course Catalog </div>
        <TopicForm submitHandler={(topic) => this.setSelectedTopic(topic)}/>
        <CourseListingsTable topic={this.state.selected_topic}
          courseClickHandler={(course) => this.courseClickHandler(course)}/>
        <ClassDetails
          getUser={()=>this.props.getUser()}
          selectedClass={this.state.selected_course}
          showModal={this.state.showClassDetailsModal}
          hideModalHandler={() => this.hideClassDetails()}/>
      </div>
    );
  }
}

export default Catalog;
