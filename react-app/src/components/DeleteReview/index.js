import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import DeleteReviewForm from './DeleteReviewForm';
import './DeleteReview.css'

function DeleteReviewFormModal({ review }) {
  const [showModal, setShowModal] = useState(false);


  return (
    <>
      <button className='delete-review-modal' onClick={() => setShowModal(true)}>X</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <DeleteReviewForm setShowModal={setShowModal} review={review} />
        </Modal>
      )}
    </>
  );
}

export default DeleteReviewFormModal;
