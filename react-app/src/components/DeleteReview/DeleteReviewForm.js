import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { removeReview } from '../../store/review'


export default function DeleteReviewForm({ setShowModal, review }) {

  const user = useSelector(state => state.session.user)

  const dispatch = useDispatch()
  const history = useHistory()

  const handleDelete = async (e) => {
    e.preventDefault()

    const res = await dispatch(removeReview(review?.id))
      .catch(async res => {
        const data = await res.json()
        if (data && data.errors.length > 0) history.push('/')
      })
      .then(() => setShowModal(false))
  }

  const handleCancel = (e) => {
    e.preventDefault()
    setShowModal(false)
  }

  if (!user) history.push('/')

  return (
    <div className='delete-review-container'>
      <div className='delete-review-header'>
        Are you sure you want to delete this review?
      </div>
      <div className='delete-review-subheader'>
        This action cannot be undone
      </div>
      <button className='delete-review-confirm-container-button'
        type='button'
        onClick={handleDelete}
      >
        Confirm
      </button>
      <button className='delete-review-cancel-container-button'
        type='button'
        onClick={handleCancel}>
        Cancel
      </button>
    </div>
  )
}
