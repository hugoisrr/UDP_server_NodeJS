import React, { Component } from "react";
import LocWork from "./LocWork";
import AddLocationsForm from "./AddLocationsForm";
import uuid from "uuid";

class AddLocationsWorkstations extends Component {
  state = {
    locations: [
      {
        id: 1,
        location: "Hall-A",
        workstations: [
          {
            id: 4,
            workstation: "Machine-A"
          },
          {
            id: 6,
            workstation: "Machine-B"
          }
        ]
      },
      {
        id: 2,
        location: "Hall-B",
        workstations: [
          {
            id: 7,
            workstation: "Machine-K"
          },
          {
            id: 9,
            workstation: "Machine-M"
          }
        ]
      }
    ]
  };
  addLocation = location => {
    location.id = uuid.v4();
    let locations = [...this.state.locations, location];
    this.setState({
      locations
    });
  };

  render() {
    return (
      <div className="container section locations-list">
        <LocWork locworks={this.state.locations} />
        <AddLocationsForm addLocation={this.addLocation} />
      </div>
    );
  }
}

export default AddLocationsWorkstations;
