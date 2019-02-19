import React, { Component } from 'react';
import {auth, db} from "./firebase";

class MySchedule extends Component {

  refreshItems() {
    const itemsRef = firebase.database().ref('items');
    itemsRef.on('value', (snapshot) => {
      let items = snapshot.val();
      let newState = [];
      for (let item in items) {
        newState.push({
          id: item,
          title: items[item].title,
          user: items[item].user
        });
      }
      this.setState({
        items: newState
      });
    });
  }

  componentDidMount() {
    this.refreshItems();

    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      }
    });
  }

  render() {
    if (this.props.getUser()) {
      var ref = db.collection("student-classes");
      var query = ref.where("username", "==", this.props.getUser().user.email);
      console.log("about to execute query");
      var enrolledClasses;
      query.get().then((results) => {
        if(results.empty) {
          console.log("No documents found!");
          return (
            <div className="MySchedule">
              <p>You are not enrolled in any classes</p>
            </div>
          );
        }
        else {
          console.log("DOCS: " + results.size + results.docs);
          //console.log("Document data:", doc.data().class_id + " " + doc.data().username);
          enrolledClasses = results.docs.map((doc) => {
            console.log("Class: " + doc.data().class_id);
            return (
              <p>
                {doc.data().class_id}
              </p>
            );
          });
          //console.log("ENROLLED CLASSES: " + enrolledClasses);
        }
      });
      console.log("ENROLLED CLASSES: " + enrolledClasses);
      return (
        <React.Fragment>
        <h1>Enrolled Classes</h1>
        <div>{enrolledClasses}</div>
        </React.Fragment>
      );
    }
    else {
      console.log("Not logged in");
      return (<div/>);
    }
  }
}

export default MySchedule;
