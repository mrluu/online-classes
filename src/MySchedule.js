import React, { Component } from 'react';
import {db} from "./firebase";

class MySchedule extends Component {
  render() {
    if (this.props.getUser()) {
      var ref = db.collection("student-classes");
      var query = ref.where("username", "==", this.props.getUser().user.email);
      console.log("about to execute query");
      query.get().then(function(results) {
        if(results.empty) {
          console.log("No documents found!");
          return (
            <div className="MySchedule">
              <p>You are not enrolled in any classes</p>
            </div>
          );
        }
        else {
          return (
            <React.Fragment>
              {
                results.forEach(function (doc) {
                  console.log("Document data:", doc.data().class_id + " " + doc.data().username);
                  return (
                    console.log("HEHE"),
                    <p>
                      {doc.data().class_id}
                    </p>
                  )
                })
              }
            </React.Fragment>
          );
        }
      }).catch(function(error) {
        console.log("Error getting documents:", error);
        return null;
      });
    }
    else {
      return null;
    }
  }
}

export default MySchedule;
