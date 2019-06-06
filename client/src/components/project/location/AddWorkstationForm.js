import React, { Component } from "react";

class AddWorkstationForm extends Component {
  state = {
    location: "",
    workstations: [
      {
        workstation: ""
      }
    ]
  };
  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  render() {
    return (
      <form className="white">
        <h6 className="grey-text text-darken-3">Add Workstations</h6>
        <div className="input-field">
          <input
            type="text"
            onChange={this.handleChange}
            id="workstation"
            value={this.state.workstations.workstation}
          />
          <label htmlFor="workstation">Workstation</label>
        </div>
        <div className="input-field">
          <button className="btn pink lighten-1">Add</button>
        </div>
      </form>
    );
  }
}

export default AddWorkstationForm;
