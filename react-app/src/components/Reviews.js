import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom';
import { fetchReviews } from '../store/review';
// import "../css/Reviews.css"




export default function Reviews() {

  const { itemId } = useParams()
  const dispatch = useDispatch()
  const history = useHistory()

  const [isLoaded, setIsLoaded] = useState(false)

  const user = useSelector(state => state.session.user)
  const currentItem = useSelector(state => state.items.oneItem)
  const reviews = useSelector(state => state.reviews.oneItem)
  const reviewsArr = Object.values(reviews)

  console.log(currentItem, 'CURRENT ITEM in REVIEWS COMPONENT!!')
  console.log(reviews, 'REVIEWS in REVIEWS COMPONENT')
  console.log(reviewsArr, 'REVIEWS ARR TO CHECK!!!!')


  useEffect(() => (
    dispatch(fetchReviews(itemId))
      .catch(async res => {
        const ans = await res.json()
        if (ans && ans.errors.length > 0) {
          history.push('/404')
        }
      })
      .then(() => setIsLoaded(true))

  ), [dispatch, itemId])

  if (!itemId) return null;

  return (
    <>
      {isLoaded &&
        <div className='reviews-page-container'>
          <div className='reviews-page-reviews-container'>
            <div className='reviews-page-reviews-header-container'>
              <div className='reviews-page-reviews-header-info-container'>
                <div className='reviews-page-reviews-title'>
                  Custom Ratings & Reviews
                </div>
                <div className='reviews-page-reviews-avg-rating'>
                  <div className='reviews-page-reviews-big-avg-rating'>
                    !!! HELPER FUNC BEING BUILT NOW !!!
                  </div>
                </div>

              </div>
              <div className='reviews-page-reviews-stars-breakdown-container'>
                !!! STARS BREAKDOWN COMING SOON !!!
              </div>
            </div>
          </div>

          {currentItem && (
            <div className='reviews-page-item-container'>
              <div className='reviews-page-item-preview-container'>
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
                <button>
                  Return to Product Details
                </button>
              </div>
            </div>
          )}
        </div>
      }
    </>
  )
}
