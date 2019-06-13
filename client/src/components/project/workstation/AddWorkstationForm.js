import React, { Component } from "react";

class AddWorkstationForm extends Component {
  state = {
    workstation: ""
  };
  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.addWorkstation(this.state);
    this.setState({
      workstation: ""
    });
  };

  render() {
    return (
      <div>
        <a
          className="btn-floating btn-large waves-effect waves-light pink modal-trigger"
          href="#addWorkstationModal"
        >
          <i class="material-icons">add</i>
        </a>

        <div id="addWorkstationModal" className="modal">
          <div className="modal-content">
            <h4>Add Workstation</h4>
            <form className="white" onSubmit={this.handleSubmit}>
              <div className="input-field">
                <input
                  type="text"
                  id="workstation"
                  onChange={this.handleChange}
                  value={this.state.workstation}
                  required
                />
                <label htmlFor="workstation">Workstation</label>
              </div>
              <div className="input-field">
                <button className="modal-close btn pink lighten-1 waves-light">
                  SUBMIT
                  <i className="material-icons  waves-effect right">send</i>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default AddWorkstationForm;
