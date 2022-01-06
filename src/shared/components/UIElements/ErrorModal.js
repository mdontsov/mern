import React from 'react';

import Modal from './Modal';
import Button from '../FormElements/Button';

const ErrorModal = params => {
  return (
    <Modal
      onCancel={params.onClear}
      header="An Error Occurred!"
      show={!!params.error}
      footer={
        <Button onClick={params.onClear}>
          Okay
        </Button>}
    >
      <p>{params.error}</p>
    </Modal>
  );
};

export default ErrorModal;
