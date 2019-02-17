import React, { Component } from 'react';
import Modal from 'react-modal';

Modal.setAppElement(document.getElementById('root'));

class ClassDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.user,
    };
    this.cancel = this.cancel.bind(this);
  }

  cancel() {
    this.props.hideModalHandler();
  }

  render() {
    return (
      <Modal overlayClassName='classDetailsDialog' isOpen={this.props.showModal}>
        <div>
          <p>This is the class description for {this.props.selectedClass}</p>
          <div className="btn-holder">
            {this.props.getUser() ?
              <React.Fragment>
                <button onClick={this.cancel}>Enroll</button>
                <div className="divider"/>
              </React.Fragment>
              :
              <React.Fragment>
                <div>Log in to enroll</div>
                <div className="divider"/>
              </React.Fragment>
            }
            <button onClick={this.cancel}>Close</button>
          </div>
        </div>
      </Modal>
    );
  }
}

export default ClassDetails;
