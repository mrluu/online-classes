import React, { Component } from 'react';
import Modal from 'react-modal';
import {auth, db} from './firebase.js';

Modal.setAppElement(document.getElementById('root'));

class ClassDetails extends Component {
  constructor(props) {
    super(props);
    this.close = this.close.bind(this);
    this.enroll = this.enroll.bind(this);
  }

  close() {
    this.props.hideModalHandler();
  }

  enroll() {
    console.log("enrolling user " + this.props.getUser().user.email + " in class " + this.props.selectedClass);
    db.collection("student-classes").add({
        username: this.props.getUser().user.email,
        class_id: this.props.selectedClass,
    })
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
    this.close();
  }

  render() {
    return (
      <Modal overlayClassName='classDetailsDialog' isOpen={this.props.showModal}>
        <div>
          <p>This is the class description for {this.props.selectedClass}</p>
          <div className="btn-holder">
            {this.props.getUser() ?
              <React.Fragment>
                <button onClick={this.enroll}>Enroll</button>
                <div className="divider"/>
              </React.Fragment>
              :
              <React.Fragment>
                <div>Log in to enroll</div>
                <div className="divider"/>
              </React.Fragment>
            }
            <button onClick={this.close}>Close</button>
          </div>
        </div>
      </Modal>
    );
  }
}

export default ClassDetails;
