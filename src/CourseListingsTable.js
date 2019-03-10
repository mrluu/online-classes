import React, { Component } from 'react';
import "./App.css"

class CourseListingsTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topic: null,
    };
  }

  onCourseClick(course) {
    this.props.courseClickHandler(course);
  }

  renderClassListings() {
    let listOfClasses = [];
    for (let theClass of this.props.classesForTopic) {
      listOfClasses.push(
        <tr key={theClass.record_id}>
          <td>
          <button className="course-number-button"
            onClick={() => this.onCourseClick(theClass)}>{theClass.name}</button>
          </td>
          <td>{theClass.short_summary} </td>
        </tr>
      );
    }
    return listOfClasses;
  }

  render() {
    return (
      <table>
        <tbody>
          {this.renderClassListings()}
        </tbody>
      </table>
    );
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
}

export default CourseListingsTable;
