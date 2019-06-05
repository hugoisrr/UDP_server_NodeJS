import React, { Component } from "react";

class AddLocationsForm extends Component {
  state = {
    location: "",
    workstations: []
  };
  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.addLocation(this.state);
    this.setState({
      location: ""
    });
  };

  render() {
    return (
      <div className="container">
        <form className="white" onSubmit={this.handleSubmit}>
          <h5 className="grey-text text-darken-3">Add Locations</h5>
          <div className="input-field">
            <input
              type="text"
              id="location"
              onChange={this.handleChange}
              value={this.state.location}
            />
            <label htmlFor="location">Location</label>
          </div>
          <div className="input-field">
            <button className="btn pink lighten-1">Add</button>
          </div>
        </form>
      </div>
    );
  }
}

export default AddLocationsForm;
