import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom';
import { fetchUpdateReview } from '../../store/review';
import { fetchUserReviews } from '../../store/review';

export default function EditReviewForm({ setShowModal, reviewEdit }) {

  const { itemId } = useParams()
  const dispatch = useDispatch()
  const history = useHistory()


  const user = useSelector(state => state.session?.user)
  // const currentItem = useSelector(state => state.items.oneItem)
  const reviews = useSelector(state => state.reviews?.user)

  const [title, setTitle] = useState(reviewEdit?.title)
  const [review, setReview] = useState(reviewEdit?.review)
  const [rating, setRating] = useState(reviewEdit?.rating)
  const [errors, setErrors] = useState([])
  const [editReview, setEditReview] = useState({})


  const handleSubmit = async (e) => {
    e.preventDefault()

    const updateReview = {
      id: reviewEdit.id,
      title,
      review,
      rating
    }

    const response = await dispatch(fetchUpdateReview(updateReview))
      .then(() => {
        dispatch(fetchUserReviews())
        setShowModal(false)
        setErrors([])
      })
      // .then(() => dispatch(fetchUserReviews())
      .catch(async res => {
        console.log(res, 'BAD RES????')
        const badData = await res.json()
        if (badData && badData.errors) {
          setErrors([badData.errors])
        }
      })
    setTitle('')
    setReview('')
    setRating('')

    history.push(`/users/${user?.id}`)
  }

  const handleCancel = async (e) => {
    e.preventDefault()
    setTitle(review?.title)
    setReview(review?.review)
    setRating(review?.rating)
    setShowModal(false)

    // history.push(`/items/${itemId}/reviews`)
  }

  if (!user) history.push(`/`)


  useEffect(() => {
    history.push(`/users/${user?.id}`)
  }, [dispatch, setShowModal])

  return (
    <div className='create-review-container'>
      <div className='exit-button'>
        <button type='button' onClick={handleCancel} className='create-review-exit-button'>
          X
        </button>
      </div>
      <div className='create-review-image-container'>
        {/* {reviewEdit?.item?.title} */}
        <img src={reviewEdit?.item?.image} alt='A Small Product Preview' className='create-review-item-image' />
      </div>
      {errors.length > 0 && errors[0](
        <ul className="errors">
          <li>{errors[0]}</li>
        </ul>
      )}
      <div className='create-review-form-header'>
        Changed your mind?
      </div>
      <div className='create-review-follow-up'>
        Update us on your thoughts on <span className='create-review-item-title'>{reviewEdit?.item?.title}</span>
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
              New Rating
            </div>
            <input
              type='number'
              onChange={e => setRating(e.target.value)}
              placeholder={reviewEdit?.rating}
              value={rating}
              name='stars'
              min={1}
              max={5}
              required
            />
          </div>
          <div className='create-review-form-recommend-container'>
            <div className='create-review-form-recommend-header'>
              Still worth recommending?
            </div>
            <div className='create-review-form-recommend-button-container'>
              <div className='create-review=form-recommend-button'>
                <input type='checkbox' className='create-review-form-recommend-button' />
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
              placeholder={reviewEdit?.title}
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
            placeholder={reviewEdit?.review}
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
          <button type='submit' className='create-review-form-submit-button'>
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