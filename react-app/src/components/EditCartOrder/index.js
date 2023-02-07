import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import './EditCartOrder.css'
import EditCartOrderForm from './EditCartOrderForm';
import { useSelector } from 'react-redux';


function EditCartOrderFormModal({ currTotal, order }) {
  const [showModal, setShowModal] = useState(false);

  const user = useSelector(state => state.session?.user)

  return (
    <>
      <button className='create-review-modal' onClick={() => setShowModal(true)}>Edit Shipping</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditCartOrderForm setShowModal={setShowModal} currTotal={currTotal} order={order} />
        </Modal>
      )}
    </>
  );
}

export default EditCartOrderFormModal;
