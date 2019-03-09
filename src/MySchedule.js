import React, { Component } from 'react';
import firebase, {auth, db} from "./firebase";

class MySchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
        myClasses: [],
    };
  }

  componentDidMount() {
    console.log("component did mount");
    this.refreshItems();
  }

  refreshItems() {
    console.log("refresh items 1");
    if (this.props.getUser()) {
      var collectionRef = db.collection("student-classes");
      var query = collectionRef.where("username", "==", this.props.getUser().email);
      let enrolledClasses = [];
      query.get().then((results) => {
        //results is a QuerySnapshot
        if (results.size > 0) {
          //results.docs is an array of QueryDocumentSnapshot
          console.log("refresh items 2. DOCS: " + results.size + results.docs);
          results.docs.map((doc) => {
            console.log("refresh items 3. Class: " + doc.data().class_id + " ID: " + doc.id);
            enrolledClasses.push({
              class_id: doc.data().class_id,
              record_id: doc.id,
            });
          });
        }
        this.setState({myClasses: enrolledClasses});
      });
    }
  }

  removeClass(record_id) {
    db.collection("student-classes").doc(record_id).delete().then(() => {
        console.log("REMOVED: " + record_id);
        this.refreshItems();
    }).catch(function(error) {
        console.error("Error removing document: " + record_id, error);
    });
  }

  listClasses() {
    let listOfClasses = [];
    let id = 0;
    for (let theClass of this.state.myClasses) {
      console.log("class ID: " + theClass);
      listOfClasses.push(
        <li key={theClass.record_id}>
          <h3>{theClass.class_id}</h3>
          <button onClick={() => {this.removeClass(theClass.record_id)}}>Remove</button>
        </li>
      );
      id++;
    }
    return listOfClasses;
  }

  render() {
    if (this.props.getUser()) {
      return (
        <ul>
          {this.listClasses()}
        </ul>
      );
    }
    else {
      return (
        <p>Log in to see your classes</p>
      );
    }
  }
}

export default MySchedule;
