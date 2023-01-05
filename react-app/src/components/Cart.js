import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { fetchCart, purchaseCartItems } from '../store/cart';
import CartItem from './CartItem';


export default function Cart() {
  const dispatch = useDispatch()
  const history = useHistory()

  const [errors, setErrors] = useState([])
  const user = useSelector(state => state.session?.user)

  const cartItems = useSelector(state => state.cart?.allItems)
  const cartItemsArr = Object?.values(cartItems)
  const myfriendjson = JSON?.stringify(cartItemsArr)

  useEffect(() => {
    dispatch(fetchCart())
  }, [dispatch, myfriendjson])

  if (!user) {
    history.push(`/login`)
  }

  // -- Cart Purchase -- //
  const handleSubmit = async (e) => {
    e.preventDefault()

    const res = await dispatch(purchaseCartItems())
      .catch(async res => {
        const data = await res.json()
        if (data && data.errors.length > 0) setErrors(data.errors)
      })
      .then(() => history.push('/'))
  }

  // -- Cart Total -- //
  const cartTotal = (cartItems) => {
    const prices = cartItems.map(item => [item.item.price, item.quantity])
    console.log(prices)
    const total = prices.reduce((a, c) => a += (c[0] *= c[1]), 0)

    return total.toFixed(2)
  }

  return (
    <div className='user-cart-page-container'>
      <div className='user-cart-header'>
        Hey there {user?.username}, here's your cart!
      </div>
      {errors && errors.length > 0 && errors.map((error, i) => (
        <div key={i} className='user-cart-page-error-container'>
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
          <NavLink to='/'>
            "Nothing here yet? Why not browse around!"
          </NavLink>
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
          <button type='button'
            onClick={handleSubmit}>
            Complete My Order
          </button>
        </div>
      )}
    </div>
  )
}
