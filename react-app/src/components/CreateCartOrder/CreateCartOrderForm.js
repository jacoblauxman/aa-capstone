import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom';
import { purchaseCartItems } from '../../store/cart';
import { inputHandler, cartTotal } from '../../utils';

export default function CreateCartOrderForm({ setShowModal, currTotal }) {

  const dispatch = useDispatch()
  const history = useHistory()

  const user = useSelector(state => state.session?.user)

  const [street, setStreet] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [zip, setZip] = useState('')
  const [errors, setErrors] = useState([])


  let errorCheck = []

  const handleSubmit = async (e) => {
    e.preventDefault()

    setErrors([])
    errorCheck = []

    if (Array.isArray(inputHandler(street, 5))) {
      errorCheck.push(`Street address ${inputHandler(city, 5)}`)
    }
    if (Array.isArray(inputHandler(city, 3))) {
      errorCheck.push(`City ${inputHandler(state, 3)}`)
    }
    if (Array.isArray(inputHandler(state, 2))) {
      errorCheck.push(`State abbreviation must be exactly 2 characters`)
    }
    if (Array.isArray(inputHandler(zip, 5)) || isNaN(zip)) {
      errorCheck.push(`ZIP Code provided must be 5 numerical characters`)
    }

    if (errorCheck.length > 0) {
      setErrors(errorCheck)
      return
    } else {
      setErrors([])
    }

    let order = { 'street': street, 'city': city, 'state': state, 'zipcode': zip }

    const res = await dispatch(purchaseCartItems(order))
      .then(() => {
        setShowModal(false)
        setErrors([])
      })
      .catch(async res => {
        let data = await res.json()
        if (data.errors?.length > 0) {
          setErrors(data.errors)
        }
      })
      history.push(`/users/${user?.id}`)
  }

  const handleCancel = async (e) => {
    e.preventDefault()
    setStreet('')
    setCity('')
    setState('')
    setZip('')
    setErrors([])
    setShowModal(false)
  }


  if (!user) history.push('/login')

  return (
    <div className='auth-form-auth-container'>
      <div className='auth-form-header-bar'>
        PURCHASE TOTAL - ${currTotal}
      </div>
      <form onSubmit={handleSubmit}>
        {errors.map((error, ind) => (
          <div className='error-message' key={ind}>
            <span className='error-icon'><i class="fa-solid fa-circle-exclamation"></i></span>
            {error}
          </div>
        ))}
        <div className='order-input-container'>
          <label className='order-input-label'>Street</label>
          <input
            className='order-input'
            type='text'
            name='street'
            onChange={e => setStreet(e.target.value)}
            value={street}
            placeholder='Street'
            minLength={5}
            maxLength={50}
            required={true}
          />
        </div>
        <div className='order-input-container'>
          <label className='order-input-label'>City</label>
          <input
            className='order-input'
            type='text'
            name='city'
            onChange={e => setCity(e.target.value)}
            value={city}
            placeholder='City'
            minLength={3}
            maxLength={50}
            required={true}
          />
        </div>
        <div className='order-input-container'>
          <label className='order-input-label'>State</label>
          <input
            className='order-input'
            type='text'
            name='state'
            onChange={e => setState(e.target.value)}
            value={state}
            placeholder='Street'
            minLength={2}
            maxLength={2}
            required={true}
          />
        </div>
        <div className='order-input-container'>
          <label className='order-input-label'>ZIP Code</label>
          <input
            className='order-input'
            type='text'
            name='ZIP'
            onChange={e => setZip(e.target.value)}
            value={zip}
            placeholder='ZIP Code'
            minLength={5}
            maxLength={5}
            required={true}
          />
        </div>
        <button
          type='submit'
          className='confirm-order-button'
        >PLACE ORDER
        </button>
        <button
          type='button'
          className='confirm-order-button'
          onClick={handleCancel}>
          GO BACK
        </button>
      </form>
    </div>
  )
}
