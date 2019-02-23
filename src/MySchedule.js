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
      var ref = db.collection("student-classes");
      var query = ref.where("username", "==", this.props.getUser().user.email);
      console.log("2. about to execute query");
      let enrolledClasses = [];
      query.get().then((results) => {
        if (results.size > 0) {
          console.log("3. DOCS: " + results.size + results.docs);
          //console.log("Document data:", doc.data().class_id + " " + doc.data().username);
          results.docs.map((doc) => {
            console.log("4. Class: " + doc.data().class_id);
            enrolledClasses.push({class_id: doc.data().class_id});
          });

          console.log("refresh items 5");
          this.setState({myClasses: enrolledClasses});
          console.log("refresh items 6");
        }
      });
    }
  }

  listClasses() {
    let listOfClasses = [];
    for (let theClass of this.state.myClasses) {
      console.log("class ID: " + theClass);
      listOfClasses.push(<p key={theClass.class_id}>Class: {theClass.class_id}</p>);
    }
    return listOfClasses;
  }

  render() {
    console.log("RENDER");
    if (this.props.getUser()) {
      return (
        <div>
          {this.listClasses()}
        </div>
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
