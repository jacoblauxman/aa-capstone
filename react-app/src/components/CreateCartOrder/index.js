import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import CreateCartOrderForm from './CreateCartOrderForm';
import './CreateCartOrder.css'
import { useSelector } from 'react-redux';


function CreateCartOrderFormModal({ currTotal }) {
  const [showModal, setShowModal] = useState(false);

  const user = useSelector(state => state.session?.user)

  return (
    <>
      <button className='create-review-modal' onClick={() => setShowModal(true)}>Write a Review</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CreateCartOrderForm setShowModal={setShowModal} currTotal={currTotal} />
        </Modal>
      )}
    </>
  );
}

export default CreateCartOrderFormModal;
