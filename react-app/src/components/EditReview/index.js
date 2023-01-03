import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditReviewForm from './EditReviewForm';
import './EditReview.css'

function EditReviewFormModal({ reviewEdit }) {
  const [showModal, setShowModal] = useState(false);


  return (
    <>
      <button className='edit-review-modal' onClick={() => setShowModal(true)}>Edit</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditReviewForm setShowModal={setShowModal} reviewEdit={reviewEdit} />
        </Modal>
      )}
    </>
  );
}

export default EditReviewFormModal;
