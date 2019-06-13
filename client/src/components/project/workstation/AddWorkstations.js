import React, { Component } from "react";
import CollectionWorkstations from "./CollectionWorkstations";
import AddWorkstationForm from "./AddWorkstationForm";
import uuid from "uuid";

class AddLocationsWorkstations extends Component {
  state = {
    workstations: [
      {
        id: 1,
        workstation: "Workstation-A"
      },
      {
        id: 2,
        workstation: "Workstation-B"
      }
    ]
  };
  addWorkstation = workstation => {
    workstation.id = uuid.v4();
    let workstations = [...this.state.workstations, workstation];
    this.setState({
      workstations
    });
  };
  deleteWorkstation = id => {
    const workstations = this.state.workstations.filter(workstation => {
      return workstation.id !== id;
    });
    this.setState({
      workstations
    });
  };

  render() {
    return (
      <div className="container section workstations-list">
        <CollectionWorkstations
          workstations={this.state.workstations}
          deleteWorkstation={this.deleteWorkstation}
        />
        <AddWorkstationForm addWorkstation={this.addWorkstation} />
      </div>
    );
  }
}

export default AddLocationsWorkstations;
