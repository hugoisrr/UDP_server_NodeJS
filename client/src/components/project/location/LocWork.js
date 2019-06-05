import React from "react";

const LocWork = ({ locworks }) => {
  const locationsList = locworks.length ? (
    locworks.map(location => {
      return (
        <li key={location.id} className="active">
          <div className="collapsible-header">
            <a href="#!">
              <i className="material-icons">delete</i>
            </a>
            {location.location}
          </div>
          <div className="collapsible-body">
            <ul className="collection with-header">
              <li className="collection-header">
                <h6>Workstations</h6>
              </li>
              {location.workstations.length ? (
                location.workstations.map(workstation => {
                  return (
                    <li className="collection-item" key={workstation.id}>
                      <div>
                        {workstation.workstation}
                        <a href="#!" className="secondary-content">
                          <i className="material-icons">delete</i>
                        </a>
                      </div>
                    </li>
                  );
                })
              ) : (
                <li className="collection-header">No workstations!</li>
              )}
            </ul>
          </div>
        </li>
      );
    })
  ) : (
    <li className="collapsible-header">No locations added!</li>
  );
  return <ul className="collapsible">{locationsList}</ul>;
};

export default LocWork;
