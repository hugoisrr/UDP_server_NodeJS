import React, { useEffect } from 'react';
import Form from './ProjectForm';
import M from 'materialize-css';

const FormContainer = () => {
  useEffect(() => M.AutoInit());
  return (
    <div className='container' id='containerForm'>
      <div className='row'>
        <div className='col s12 m6 offset-m3'>
          <Form />
        </div>
      </div>
    </div>
  );
};

export default FormContainer;
