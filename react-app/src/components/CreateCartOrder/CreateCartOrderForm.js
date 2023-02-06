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
    } else if (Array.isArray(inputHandler(city, 3))) {
      errorCheck.push(`City ${inputHandler(state, 3)}`)
    } else if (Array.isArray(inputHandler(state, 2))) {
      errorCheck.push(`State abbreviation must be exactly 2 characters`)
    } else if (Array.isArray(inputHandler(city, 5))) {
      errorCheck.push(`ZIP Code provided must be 5 numerical characters`)
    }

    if (errorCheck.length > 0) {
      setErrors(errorCheck)
      return
    } else {
      setErrors([])
    }

    const res = await dispatch(purchaseCartItems())
      .catch(async res => {
        const data = await res.json()
        if (data && data.errors.length > 0) setErrors(data.errors)
      })
      .then(() => history.push('/'))
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
    <div className='create-review-container'>
      <div className='create-review-form-header'>
        PURCHASE TOTAL - ${currTotal}
      </div>
      <form onSubmit={handleSubmit}>
        <div className='errors-container'>
          {errors?.length > 0 && errors.map((err, i) => (
            <div className='error-message' key={i}>
              {err}
            </div>
          ))}
        </div>
        <div className='auth-input-container'>
          <label className='auth-input-label'>Street</label>
          <input
            className='auth-input'
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
        <div className='auth-input-container'>
          <label className='auth-input-label'>City</label>
          <input
            className='auth-input'
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
        <div className='auth-input-container'>
          <label className='auth-input-label'>State</label>
          <input
            className='auth-input'
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
        <div className='auth-input-container'>
          <label className='auth-input-label'>ZIP Code</label>
          <input
            className='auth-input'
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
          className='confirm-auth-button'
        >PLACE ORDER
        </button>
        <button
          type='button'
          className='confirm-auth-button'
          onClick={handleCancel}>
          GO BACK
        </button>
      </form>
    </div>
  )
}
