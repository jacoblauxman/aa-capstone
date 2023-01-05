import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { fetchCart, updateCartItem, deleteCartItem } from '../store/cart';


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

  const handleChange = async (e) => {
    e.preventDefault()
    setQuantity(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(cartItem, 'HERE IS OUR CART ITEM IN SUBMIT, BEFORE DISPATCH!!')

    const updatedCartItem = {
      id: cartItem.id,
      quantity: quantity
    }

    dispatch(updateCartItem(updatedCartItem))
  }

  const handleDelete = async (e) => {
    e.preventDefault()

    dispatch(deleteCartItem(cartItem.id))
  }

  return (
    <div className='single-cart-item-container'>
      <div className='single-cart-item-name'>
        {cartItem?.item?.title} - {cartItem?.item?.platform}
      </div>
      <div className='single-cart-item-image'>
        <img src={cartItem?.item?.image} alt='Cart Item Preview' />
      </div>
      <div className='single-cart-item-update-form'>

        <form onSubmit={handleSubmit}>
          <div className='update-form-errors-container'>
            {errors?.length > 0 && errors.map((err, i) => (
              <div className='update-form-error' key={i}>
                {err}
              </div>
            ))}
          </div>
          <label className='update-form-select-labe'>Quantity</label>
          <select value={quantity} onChange={handleChange} options={quantityOptions}>
            {quantityOptions.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <button type='submit'>
            Update Cart Quantity
          </button>
        </form>
        <div className='update=form-delete-container'>
          <button
            type='button'
            onClick={handleDelete}
          >
            Remove from Cart
          </button>
        </div>
      </div>
    </div >
  )
}
