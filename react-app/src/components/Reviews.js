import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { fetchReviews } from '../store/review';
import "../css/Reviews.css"
import { fetchOneItem } from '../store/item';

import CreateReviewFormModal from './CreateReview';


export default function Reviews() {

  const { itemId } = useParams()
  const dispatch = useDispatch()
  const history = useHistory()

  const [isLoaded, setIsLoaded] = useState(false)
  const [showCreate, setShowCreate] = useState(false)


  const user = useSelector(state => state.session.user)
  const currentItem = useSelector(state => state.items?.oneItem)
  const reviews = useSelector(state => state.reviews?.oneItem)
  const reviewsArr = Object?.values(reviews)


  useEffect(() => (
    dispatch(fetchReviews(itemId))
      .then(dispatch(fetchOneItem(itemId)))
      .then(() => setIsLoaded(true))

  ), [dispatch, itemId])



  // --- helper funcs --- //

  const timeFormatter = (date) => {
    let now = new Date()
    let then = new Date(date)
    let timeElapsed = now - then
    let oneDay = (1000 * 3600 * 24)
    let daysSince = (timeElapsed / oneDay)
    daysSince = Math.round(daysSince)
    if (daysSince < 1) {
      return `less than 1 day ago...`
    } else if (daysSince === 1) {
      return `Just 1 day ago...`
    } else if (daysSince > 14) {
      return `more than 2 week ago...`
    } else if (daysSince > 31) {
      return `over a month ago...`
    } else if (daysSince > 365) {
      return `over a year ago...`
    } else {
      return `About ${daysSince} days ago...`
    }
  }

  const avgRating = (arr) => {

    const avg = arr?.reduce((a, c) => {
      console.log(a.rating, 'A in REDUCE!')
      console.log(c.rating, 'C in REDUCE !!!')
      return a + c.rating
    }, 0) / arr.length

    return avg.toFixed(2)
  }



  if (!itemId) return null;

  return (
    <>
      {isLoaded &&
        <div className='reviews-page-container'>
          <div className='reviews-page-reviews-container'>
            <div className='reviews-page-reviews-header-container'>
              <div className='reviews-page-reviews-header-info-container'>
                <div className='reviews-page-reviews-title'>
                  Customer Ratings & Reviews
                </div>
                <div className='reviews-page-reviews-avg-rating'>
                  <div className='reviews-page-reviews-big-avg-rating'>
                    <div className='reviews-page-reviews-big-num'>
                      {reviewsArr?.length > 0 ? avgRating(reviewsArr) : 'N/A'}
                    </div>
                    <div className='reviews-page-reviews-ratings-amount'>
                      {reviewsArr?.length} product ratings
                    </div>
                  </div>
                </div>
                <div className='reviews-page-reviews-prompt-container'>
                  <div className='reviews-page-reviews-bought'>
                    Bought this product?
                  </div>
                  <div className='reviews-page-reviews-share'>
                    Share your thought with the community.
                  </div>
                  <div className='reviews-page-reviews-add-button'>
                    <CreateReviewFormModal />
                  </div>
                </div>
              </div>
              <div className='reviews-page-reviews-stars-breakdown-container'>
                !!! STARS BREAKDOWN COMING SOON !!!
              </div>
            </div>
            {reviewsArr && reviewsArr.map(review => (
              < div key={review?.id} className='reviews-page-single-review-container'>
                <div className='reviews-page-single-review-title'>
                  {review?.title}
                </div>
                <div className='reviews-page-single-review-star-display'>
                  {review?.rating && [...Array(review.rating)].map((star, i) => (
                    <img key={i} src='https://res.cloudinary.com/dixbzsdnm/image/upload/v1671671732/aa-capstone-gamebaux/svgs/solid-star_zc14zs.svg' alt='Reviews Stars' className='reviews-review-single-stars' />
                  ))}
                </div>
                <div className='reviews-page-single-review-username'>
                  {review?.user?.username}
                </div>
                <div className='reviews-page-single-review-verified'>
                  Verified Purchaser
                </div>
                <div className='reviews-page-single-review-ago-container'>
                  {timeFormatter(review?.createdAt)}
                </div>
                <div className='reviews-page-single-review-review'>
                  {review?.review}
                </div>
              </div>
            ))}
            <div className='reviews-page-all-reviews-container'>
            </div>
          </div>

          {currentItem && (
            <div className='reviews-page-item-container'>
              <div className='reviews-page-item-preview-container'>
                <div className='reviews-page-all-item-container'>

                  <div className='reviews-page-item-image-container'>
                    <img src={currentItem?.image} alt='Reviews Single Item Preview' className='reviews-page-item-image' />
                  </div>
                  <div className='reviews-page-item-info-container'>
                  </div>
                  <div className='reviews-page-item-title'>
                    {currentItem?.title}
                  </div>
                  <div className='reviews-page-item-creator'>
                    {currentItem?.creator}
                  </div>
                </div>
                <div className='reviews-page-item-back-container'>
                  <NavLink to={`/items/${itemId}`}>
                    <button className='reviews-page-back-button'>
                      Return to Product Details
                    </button>
                  </NavLink>
                </div>
              </div>
            </div>
          )}
        </div>
      }
    </>
  )
}
