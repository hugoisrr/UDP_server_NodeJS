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
  deleteLocation = id => {
    const locations = this.state.locations.filter(location => {
      return location.id !== id;
    });
    this.setState({
      locations
    });
  };
  deleteWorkstation = (idLocation, idWorkstation) => {
    this.setState(prevState => ({
      locations: prevState.locations.map(location => {
        if (location.id !== idLocation) {
          return location;
        }
        return {
          ...location,
          workstations: location.workstations.filter(
            workstation => workstation.id !== idWorkstation
          )
        };
      })
    }));
  };

  render() {
    return (
      <div className="container section locations-list">
        <LocWork
          locworks={this.state.locations}
          deleteLocation={this.deleteLocation}
          deleteWorkstation={this.deleteWorkstation}
        />
        <AddLocationsForm addLocation={this.addLocation} />
      </div>
    );
  }
}

export default AddLocationsWorkstations;
