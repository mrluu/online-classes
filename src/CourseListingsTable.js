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
    const liStyle = {
      width: "40%",
      listStyleType: "none",
      marginRight: "55px",
      marginLeft: "15px",
      marginTop: "15px",
      backgroundColor: "rgb(237, 237, 237)",
      color: "#000",
      marginBottom: "40px",
      boxShadow: "0 3px 4px 0 rgba(0,0,0,.14), 0 3px 3px -2px rgba(0,0,0,.12), 0 1px 8px 0 rgba(0,0,0,.2)"
    };

    const headingStyle = {
      backgroundColor: "#fa6900",
      color: "white",
      height: "25%",
      fontSize: "22px",
      fontFamily: "'Mukta', sans-serif",
      textAlign: "center"
    };

    const bodyStyle = {
      padding: "10px",
    };

    let listOfClasses = [];
    for (let theClass of this.props.classesForTopic) {
      listOfClasses.push(
        <li style={liStyle} key={theClass.record_id}>
          <div style={headingStyle}>{theClass.class_id}</div>
          <div style={bodyStyle}>
            <p>{theClass.short_summary}</p>
            <button className="course-number-button"
              onClick={() => this.onCourseClick(theClass)}>Details ...</button>
          </div>
        </li>
      );
    }
    return listOfClasses;
  }

  render() {
    const ulStyle = {
      display: "flex",
      flexWrap: "wrap",
      marginLeft: "70px",
      padding: "50"
    };

    return (
      <ul style={ulStyle}>
        {this.renderClassListings()}
      </ul>
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
