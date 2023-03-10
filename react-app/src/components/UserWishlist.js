import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { fetchDeleteWishlist } from '../store/wishlist';
import { createCartItem } from '../store/cart';


function UserWishlist({ userWishlist }) {

  const user = useSelector(state => state.session?.user)
  const userCart = useSelector(state => state.cart?.allItems)
  const userCartArr = Object?.values(userCart)
  const history = useHistory()
  const dispatch = useDispatch()
  const [errors, setErrors] = useState([])

  const addToCart = async (e, item) => {
    e.preventDefault()

    let cartItem = userCart[item?.id]

    if (cartItem?.quantity >= 10) {
      setErrors(['Cart Item Quantity must not exceed 10'])
      return
    } else if (cartItem && cartItem?.quantity < 10) {
      dispatch(createCartItem(item.id))
        .then(() => history.push('/cart'))
    } else {
      dispatch(createCartItem(item?.id))
        .then(() => history.push('/cart'))
    }
  }

  const removeFromList = async (e, item) => {
    e.preventDefault()

    const res = await dispatch(fetchDeleteWishlist(item?.id))
      .then(() => {
        history.push(`/users/${user?.id}`)
      })
  }

  if (!user) history.push('/')

  return (
    <>
      <div className='user-page-user-reviews-container'>
        <div className='user-cart-header'>
          Here's your Wishlist:
        </div>
        {userWishlist?.length > 0 && userWishlist?.map(item => (
          <div key={item?.id} className='single-wishlist-item'>
            <NavLink className='wishlist-item-link' to={`/items/${item.id}`}>
              <div className='single-cart-item-image-container'>
                <img className='single-cart-item-image' src={item?.image} alt='Wishlist Item Preview' />
              </div>
              <div className='single-cart-item-info wishlist-item-info'>
                <span className='order-product-info'>
                  <span className='item-title' >{item?.title}</span> <span className='item-title'>{item?.platform}</span>
                </span>
                <span className='order-product-price'>
                  ${item?.price}
                </span>
              </div>
            </NavLink>
            <div className='wishlist-item-options-container'>
              {userCartArr?.findIndex(i => i?.itemId === item?.id) === -1 ?
                (< button
                  type='button'
                  className='single-item-add-to-cart-button'
                  onClick={(e) => addToCart(e, item)}
                >
                  Add to Cart
                </button>) : (
                  <NavLink className='wishlist-cart-link' to={`/cart`}>Already in Your Cart!</NavLink>
                )}
              <div
                type='button'
                className='
                 wishlist-remove'
                onClick={(e) => removeFromList(e, item)}
              >
                Not interested anymore? Remove from your list
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default UserWishlist
