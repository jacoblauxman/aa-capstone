import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { NavLink, useHistory } from 'react-router-dom'
import { fetchItems } from '../store/item';

export default function Splash() {
  const history = useHistory()
  const dispatch = useDispatch()
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    dispatch(fetchItems())
      .then(() => setIsLoaded(true))

    return () => setIsLoaded(false)
  }, [
    // dispatch, itemsArr.length, searchString
  ])

  return (
    <div className='splash-container'>
      <div className='splash-link-container'>
        <NavLink to={`/items/platform/Nintendo`}>
          Nintendo
        </NavLink>
      </div>
      <div className='splash-link-container'>
        <NavLink to={`/items/platform/Playstation`}>
          Playstation
        </NavLink>
      </div>
      <div className='splash-link-container'>
        <NavLink to={`/items/platform/Xbox`}>
          Xbox
        </NavLink>
      </div>
      <div className='splash-link-container'>
        <NavLink to={`/items/category/Console`}>
          Consoles
        </NavLink>
      </div>
      <div className='splash-link-container'>
        <NavLink to={`/items/category/Game`}>
          Games
        </NavLink>
      </div>
      <div className='splash-link-container'>
        <NavLink to={`/items/category/Accessory`}>
          Accessories
        </NavLink>
      </div>
    </div>
  )
}
