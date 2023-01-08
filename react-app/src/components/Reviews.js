import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { fetchReviews } from '../store/review';
import "../css/Reviews.css"
import { fetchOneItem } from '../store/item';
import CreateReviewFormModal from './CreateReview';
import { avgRating, timeFormatter } from '../utils';


export default function Reviews() {

  const { itemId } = useParams()
  const dispatch = useDispatch()
  const history = useHistory()

  const [isLoaded, setIsLoaded] = useState(false)
  const [showCreate, setShowCreate] = useState(false)

  const user = useSelector(state => state.session?.user)
  const currentItem = useSelector(state => state.items?.oneItem)
  const reviews = useSelector(state => state.reviews?.oneItem)
  const reviewsArr = Object?.values(reviews)

  useEffect(() => (
    dispatch(fetchReviews(itemId))
      .then(dispatch(fetchOneItem(itemId)))
      .then(() => setIsLoaded(true))

  ), [dispatch, itemId])

  if (!itemId) return null;
  if (!isLoaded) return "Loading...";

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
                <div className='smile'>
                  <i class="fa-regular fa-face-smile"></i>
                </div>
                <div className='frown'>
                  <i class="fa-regular fa-face-frown"></i>
                </div>
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
                    <div className='reviews-page-item-title'>
                      {currentItem?.title}
                    </div>
                    <div className='reviews-page-item-creator'>
                      {currentItem?.creator}
                    </div>
                  </div>
                </div>
                <div className='reviews-page-item-back-container'>
                  <NavLink className='reviews-page-back-link' to={`/items/${itemId}`}>
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
