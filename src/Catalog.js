import React, { Component } from 'react';
import firebase, {auth, db} from "./firebase";
import ClassDetails from './ClassDetails'
import CourseListingsTable from './CourseListingsTable'
import "./App.css"

class TopicForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: '*'};
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    //console.log("TopicForm.handleChange " + event.target.value);
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

class Catalog extends Component {
  constructor(props) {
    super(props);
    this.state = {
        selected_topic: null,
        selected_course: null,
        showClassDetailsModal: false,
        classesForTopic: [],
    };
  }

  showClassDetails() {
    this.setState({showClassDetailsModal: true});
  }

  hideClassDetails() {
    this.setState({showClassDetailsModal: false});
  }

  setSelectedTopic(topic) {
    //console.log("Catalog.setSelectedTopic() " + topic);
    this.getClassesForTopic(topic);
    this.setState({
      selected_topic: topic,
      selected_course: null
    });
  }

  courseClickHandler(course) {
    this.setState({
      selected_course: course,
    })
    this.showClassDetails();
  }

  getClassesForTopic(topic) {
    //console.log("Catalog.getClassesForTopic() " + topic);
    if (topic) {
      var collectionRef = db.collection("classes");
      var query = collectionRef.where("topic", "==", topic);
      let matchingClasses = [];
      query.get().then((results) => {
        //results is a QuerySnapshot
        if (results.size > 0) {
          //results.docs is an array of QueryDocumentSnapshot
          //console.log("getClassesForTopic 2. DOCS: " + results.size + results.docs);
          results.docs.map((doc) => {
            //console.log("getClassesForTopics 3. Class: " + doc.data().class_id + " ID: " + doc.id);
            matchingClasses.push({
              class_id: doc.data().class_id,
              description: doc.data().description,
              name: doc.data().name,
              short_summary: doc.data().short_summary,
              teacher: doc.data().teacher,
              record_id: doc.id,
            });
          });
        }
        this.setState({classesForTopic: matchingClasses});
      });
    }
  }

  render() {
    //console.log("Catalog.render() " + this.state.selected_topic);
    return (
      <div className="catalog">
        <div className="page-banner"> Course Catalog </div>
        <TopicForm submitHandler={(topic) => this.setSelectedTopic(topic)}/>
        <CourseListingsTable classesForTopic={this.state.classesForTopic}
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
