import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { NavLink, useHistory, useParams } from 'react-router-dom'
import { fetchOneItem } from '../store/item'
import { fetchReviews } from '../store/review'
import { createCartItem, fetchCart } from '../store/cart'
import { timeFormatter } from '../utils'
import "../css/Item.css"
import { reviewSample, randomReview } from '../utils'


export default function Item() {

  const { itemId } = useParams()
  const dispatch = useDispatch()
  const history = useHistory()

  const [isLoaded, setIsLoaded] = useState(false)
  const [errors, setErrors] = useState([])

  const user = useSelector(state => state.session?.user)
  const userCart = useSelector(state => state.cart?.allItems)
  const cartItem = Object?.values(userCart).filter(item => item.itemId === +itemId)[0]

  const currentItem = useSelector(state => state.items?.oneItem)
  const itemReviews = useSelector(state => state.reviews?.oneItem)
  const reviewsArr = Object?.values(itemReviews)

  const test = useSelector(state => state.items?.oneItem?.reviews)
  const currentItemReviews = useSelector(state => state.items?.oneItem?.reviews)

  // console.log('TESTING TESTING', randomReview(currentItemReviews))

  useEffect(() => {
    dispatch(fetchOneItem(itemId))
    dispatch(fetchReviews(itemId))
      .then(() => setIsLoaded(true))

  }, [dispatch, itemId])

  // -- First Review for display -- //
  const reviewSample = reviews => {
    const firstFew = [...reviews]
    const selected = firstFew.slice(0, 1)

    return selected
  }

  // -- Add Item to user's cart -- //
  const addToCart = async (e) => {
    e.preventDefault()

    if (cartItem?.quantity >= 10) {
      setErrors(['Cart Item Quantity must not exceed 10'])
      return
    } else if (cartItem && cartItem?.quantity < 10) {
      dispatch(createCartItem(itemId))
        .then(() => history.push('/cart'))
    } else {
      dispatch(createCartItem(itemId))
        .then(() => history.push('/cart'))
    }
  }

  // --- check for load --- //
  if (!isLoaded) return "Loading..."

  return (
    <div className='single-item-container'>
      <div className='single-item-left-side-container'>
        <div className='single-item-image-container'>
          <img src={currentItem?.image} alt='Current Item Display Preview' className='single-item-image' />
        </div>
        <div className='single-item-description-container'>
          <div className='single-item-text-header'>
            Product Description:
          </div>
          <div className='single-item-description-text'>
            {currentItem?.description}
          </div>
        </div>
        <div className='single-item-reviews-sample'>
          <div className='single-item-text-header'>
            One customer's thoughts...
          </div>
          {test?.length > 0 && reviewSample(test).map(review => (
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
        </div>
        <div className='single-item-reviews-all-reviews'>
          <NavLink to={`/items/${itemId}/reviews`}>
            <button
              type="button"
              className='single-item-all-reviews-button'
            >
              See All Reviews
            </button>
          </NavLink>
        </div>
      </div>
      <div className='single-item-right-side-container'>
        <div className='single-item-sticky'>
          <div className='single-item-info-container'>
            <div className='single-item-header-container'>
              {currentItem?.title} - {currentItem?.platform}
            </div>
            <div className='single-item-creator-container'>
              <span className='single-item-descript-label'>by&nbsp;</span>{currentItem?.creator}
            </div>
            <div className='single-item-condition-container'>
              <span className='single-item-descript-label'>Condition:&nbsp; </span> New
            </div>
            <div className='single-item-edition-container'>
              <span className='single-item-descript-label'>Edition:&nbsp; </span> Standard
            </div>
          </div>
          <div className='single-item-purchase-side-container'>
            <div className='single-item-purchase-stock'>
              <div className='single-item-purchase-stock-header'>
                <span className='in-stock'>In Stock</span> for pickup nearby
              </div>
              <div className='single-item-purchase-stock-sub'>
                Today - always free
              </div>
              <div className='single-item-purchase-stock-header'>
                <span className='in-stock'>In Stock</span> for delivery
              </div>
              <div className='single-item-purchase-stock-sub'>
                Free 1-3 Day Shipping Over $59
              </div>
            </div>
            <div className='errors-container'>
              {errors && errors?.length > 0 && errors.map((err, i) => (
                <div className='error-message' key={i}>{err}</div>
              ))}
            </div>
            <button
              type='button'
              className='single-item-add-to-cart-button'
              onClick={addToCart}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
