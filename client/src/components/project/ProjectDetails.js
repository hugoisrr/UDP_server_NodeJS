import React from "react";

const ProjectDetails = props => {
  const id = props.match.params.id;
  return (
    <div className="container section project-details">
      <div className="card z-depth-0">
        <div className="card-content">
          <span className="card-title">Project title - {id}</span>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia totam
            nam tenetur laborum delectus magni nihil culpa, beatae corrupti illo
            quisquam necessitatibus pariatur, sit ipsam ea esse voluptas!
            Deserunt, esse.
          </p>
        </div>
        <div className="card-action grey lighten-4 grey-text">
          <div>2nd September, 2019</div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
