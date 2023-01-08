import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { fetchCart, updateCartItem, deleteCartItem } from '../store/cart';
import "../css/CartItem.css"


export default function CartItem({ cartItem }) {

  const dispatch = useDispatch()
  const history = useHistory()

  const [errors, setErrors] = useState([])
  const [quantity, setQuantity] = useState(cartItem?.quantity)

  const quantityOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  const user = useSelector(state => state.session?.user)
  const cartItems = useSelector(state => state.cart?.allItems)

  if (!cartItem) return null

  if (!user) history.push("/")

  // -- Update state of quantity of cart item -- //
  const handleChange = async (e) => {
    e.preventDefault()
    setQuantity(e.target.value)
  }

  // -- Submit cart item update -- //
  const handleSubmit = async (e) => {
    e.preventDefault()

    const updatedCartItem = {
      id: cartItem.id,
      quantity: quantity
    }

    dispatch(updateCartItem(updatedCartItem))
  }

  // -- Delete cart item -- //
  const handleDelete = async (e) => {
    e.preventDefault()

    dispatch(deleteCartItem(cartItem.id))
  }

  return (
    <div className='single-cart-item-container'>
      <div className='single-cart-item-info-container'>
        <div className='single-cart-item-image-container'>
          <img className='single-cart-item-image' src={cartItem?.item?.image} alt='Cart Item Preview' />
        </div>
        <div className='single-cart-item-info'>
          <div className='single-cart-item-name'>
            {cartItem?.item?.title} - {cartItem?.item?.platform}
          </div>
          <div className='single-item-condition-container'>
            <span className='single-item-descript-label'>Condition:&nbsp; </span> New
          </div>
          <div className='single-item-edition-container'>
            <span className='single-item-descript-label'>Edition:&nbsp; </span> Standard
          </div>
          <div className='single-item-edition-container'>
            <span className='single-item-descript-label'>Price:&nbsp; </span> ${cartItem?.item?.price}
          </div>
        </div>
      </div>
      <div className='single-cart-item-update-form'>
        <form onSubmit={handleSubmit}>
          <div className='errors-container'>
            {errors?.length > 0 && errors.map((err, i) => (
              <div className='error-message' key={i}>
                {err}
              </div>
            ))}
          </div>
          <label className='update-form-select-label'>Quantity</label>
          <select value={quantity} onChange={handleChange} options={quantityOptions} className='update-form-select-field'>
            {quantityOptions.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <div className='single-cart-update-button-container'>

            <button
              className='single-cart-item-update-button'
              type='submit'
            >
              Update Your Cart
            </button>
          </div>
        </form>
        <button
          type='button'
          className='single-cart-item-delete-button'
          onClick={handleDelete}
        >
          Remove from Cart
        </button>
      </div>
    </div >
  )
}
