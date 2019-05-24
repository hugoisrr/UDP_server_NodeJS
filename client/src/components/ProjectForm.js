import React from 'react';

const ProjectForm = () => {
  return (
    <div className='card-panel z-depth-5'>
      <h4 className='center'>Setup a Project</h4>
      <div className='row'>
        <form className='col s12 m12'>
          <div className='row'>
            <div className='input-field col s12 m12'>
              <input id='name' type='text' className='validate' />
              <label htmlFor='name'>Project's Name</label>
            </div>

            <div className='input-field col s12 m12'>
              <textarea
                name=''
                id='description'
                className='materialize-textarea'
              />
              <label htmlFor='description'>Description</label>
            </div>
          </div>
        </form>
      </div>

      <button
        className='btn waves-effect waves-light center'
        type='submit'
        name='action'
      >
        Submit
        <i className='material-icons right'>send</i>
      </button>
    </div>
  );
};

export default ProjectForm;
