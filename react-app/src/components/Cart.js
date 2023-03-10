import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { fetchCart, purchaseCartItems } from '../store/cart';
import CartItem from './CartItem';
import { cartTotal } from '../utils';
import "../css/Cart.css"
import CreateCartOrderFormModal from './CreateCartOrder';


export default function Cart() {
  const dispatch = useDispatch()
  const history = useHistory()

  const [errors, setErrors] = useState([])
  const user = useSelector(state => state.session?.user)

  const cartItems = useSelector(state => state.cart?.allItems)
  const cartItemsArr = Object?.values(cartItems)
  const myfriendjson = JSON?.stringify(cartItemsArr)
  let currentTotal = cartTotal(cartItemsArr)

  useEffect(() => {
    dispatch(fetchCart())

  }, [dispatch, myfriendjson])

  if (!user) {
    history.push(`/login`)
  }

  return (
    <div className='user-cart-page-container'>
      <div className='user-cart-header'>
        Hey there {user?.username}, here's your cart!
      </div>
      {errors && errors.length > 0 && errors.map((error, i) => (
        <div key={i} className='error-message'>
          {error}
        </div>
      ))}
      <div className='user-cart-page-items-container'>
        {cartItemsArr && cartItemsArr.length > 0 ?
          cartItemsArr.map(cartItem => (
            <div className='user-cart-item-container' key={cartItem?.id}>
              <CartItem key={cartItem?.id} cartItem={cartItem} />
            </div>
          )) :
          <div className='nothing-here-cart'>
            <NavLink className='user-cart-no-items-link' to='/'>
              Nothing here yet? Why not <span className='browse-back'>browse</span> around!
            </NavLink>
          </div>
        }
      </div>
      {cartItemsArr.length > 0 && (
        <div className='user-cart-page-purchase-container'>
          <div className='user-cart-page-total-container'>
            <div className='user-cart-page-total'>
              <span className='user-cart-total-estimate'>Estimated Total</span>
              <span className='user-cart-total-value'>${cartTotal(cartItemsArr)}</span>
            </div>
          </div>
          <div className='user-cart-purchase-header'>
            Would you like to complete your purchase?
          </div>
          <CreateCartOrderFormModal currTotal={currentTotal} />
        </div>
      )}
    </div>
  )
}
