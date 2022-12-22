import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom';
import { createReview } from '../../store/review';


export default function CreateReviewModal({ setShowModal }) {

  const { itemId } = useParams()
  const dispatch = useDispatch()
  const history = useHistory()

  const user = useSelector(state => state.session.user)
  const currentItem = useSelector(state => state.items.oneItem)
  const reviews = useSelector(state => state.reviews.oneItem)

  const [title, setTitle] = useState('')
  const [review, setReview] = useState('')
  const [rating, setRating] = useState('')
  const [errors, setErrors] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const newReview = {
      title,
      review,
      rating
    }

    const response = await dispatch(createReview(itemId, newReview))
    .then(() => setShowModal(false))
    .catch(async res => {
      const badData = await res.json()
      if (badData && badData.errors) {
        setErrors([badData.errors])
      }
    })
    setTitle('')
    setReview('')
    setRating('')
  }

  const handleCancel = async (e) => {
    e.preventDefault()
    setTitle('')
    setReview('')
    setRating('')
    setShowModal(false)

    history.push(`/items/${itemId}/reviews`)
  }

  if (!user) history.push('/')

  return (
    <div className='create-review-container'>
      <div className='exit-button'>
        <button type='button' onClick={handleCancle} classname='create-review-exit-button'>
        X - exit coming soon
        </button>
      </div>
      <div className='create-review-image-container'>
        <img scr={currentItem?.image} alt='A Small Product Preview' className='create-review-item-image' />
      </div>
      <div>
        Write a Review
      </div>
      <div className='create-review-follow-up'>
        Let us know your thoughts on {currentItem?.title}
      </div>
      <div className='create-review-form-container'>
        <form onSubmit={handleSubmit}>
          <div className='create-review-form-errors-container'>
            {errors?.length > 0 && errors.map((err, i) => (
              <div className='create-review-form-errors-error' key={i}>
                {err}
              </div>
            ))}
          </div>
          <div className='create-review-form-rating-container'>
            <div className='create-review-form-rating-header'>
              Overall Rating
            </div>
            <input
              type='number'
              onChange={e => setRating(e.target.value)}
              placeholder='Rating'
              value={rating}
              name='stars'
              min={1}
              max={5}
              required
            />
          </div>
          <div className='create-review-form-recommend-container'>
            <div className='create-review-form-recommend-header'>
              Would you recommend this item to a friend?
            </div>
            <div className='create-review-form-recommend-button-container'>
              <div className='create-review=form-recommend-button'>
                <button type='checkbox' className='create-review-form-recommend-button' />
              </div>
              <div className='create-review-form-recommend-confirm-message'>
                Yes, I would recommend this item.
              </div>
            </div>
          </div>
          <div className='create-review-form-email-container'>
            <input
              type='text'
              onChange={e => setTitle(e.target.value)}
              value={title}
              placeholder='Review Title'
              name='review title'
              required
              minLength={5}
              maxLength={25}
            />
            <div className='create-review-form-email-message'>
              This will not be shared publicly.
            </div>
          </div>
          <input
            type='text'
            onChange={e => setReview(e.target.value)}
            value={review}
            placeholder='Review'
            name='review'
            required
            minLength={25}
            maxLength={250}
          />
          <div className='create-review-form-add-photo-video-container'>
            <button className='create-review-form-add-photo-button'>
              Add Photo
            </button>
            <button className='create-review-form-add-video-button'>
              Add Video
            </button>
          </div>
          <button type='submit' class='create-review-form-submit-button'>
            Share Review
          </button>
        </form>
        <div className='create-review-form-privacy-container'>
          Privacy Policy
        </div>
      </div>
    </div>
  )
}
