import React from "react";

const CollectionWorkstations = ({ workstations, deleteWorkstation }) => {
  const workstationsList = workstations.length ? (
    workstations.map(workstation => {
      return (
        <li key={workstation.id} className="collection-item">
          <div>
            {workstation.workstation}
            <a
              href="#!"
              className="secondary-content"
              onClick={() => {
                deleteWorkstation(workstation.id);
              }}
            >
              <i className="material-icons">delete</i>
            </a>
          </div>
        </li>
      );
    })
  ) : (
    <li className="collection-item">
      <div> No workstations added!</div>
    </li>
  );
  return <ul className="collection">{workstationsList}</ul>;
};

export default CollectionWorkstations;
