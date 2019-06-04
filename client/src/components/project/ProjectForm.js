import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { createProject } from "../../actions/project";
import PropTypes from "prop-types";

const ProjectForm = ({ createProject, isCreated }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: ""
  });

  const { name, description } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    createProject({ name, description });
  };

  // if (isCreated) {
  //   return <Redirect to="/locations" />;
  // }

  return (
    <Fragment>
      <div className="card-panel z-depth-5">
        <h4 className="center">Setup a Project</h4>
        <div className="row">
          <form className="col s12 m12" onSubmit={e => onSubmit(e)}>
            <div className="row">
              <div className="input-field col s12 m12">
                <input
                  id="name"
                  name="name"
                  type="text"
                  className="validate"
                  value={name}
                  onChange={e => onChange(e)}
                />
                <label htmlFor="name">Project's Name</label>
              </div>

              <div className="input-field col s12 m12">
                <textarea
                  name="description"
                  id="description"
                  className="materialize-textarea"
                  value={description}
                  onChange={e => onChange(e)}
                />
                <label htmlFor="description">Description</label>
              </div>
            </div>
            <button
              className="btn waves-effect waves-light center"
              type="submit"
              name="action"
            >
              Submit
              <i className="material-icons right">send</i>
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

ProjectForm.propTypes = {
  createProject: PropTypes.func.isRequired,
  isCreated: PropTypes.bool
};

const mapStateToProps = state => ({
  isCreated: state.project.isCreated
});

export default connect(
  mapStateToProps,
  { createProject }
)(ProjectForm);
