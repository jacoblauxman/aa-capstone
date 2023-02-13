import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { NavLink, useHistory } from 'react-router-dom'
import { fetchItems } from '../store/item';
import '../css/Splash.css'

export default function Splash() {
  const history = useHistory()
  const dispatch = useDispatch()
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    dispatch(fetchItems())
      .then(() => setIsLoaded(true))

    return () => setIsLoaded(false)
  }, [])

  const sendSoon = (e) => {
    e.preventDefault()
    history.push('/comingsoon')
  }

  return (
    <div className='splash-container'>
      <div className='splash-header'>Top Brands</div>
      <div className='splash-platforms-container'>
        <div className='splash-link-container'>
          <NavLink to={`/items/platform/Nintendo`}>
            <img className='splash-platform-img' src={`https://res.cloudinary.com/dixbzsdnm/image/upload/v1674667721/aa-capstone-gamebaux/Homepage_5_Column_BrandLogo_Nintendo_264x150_D_gzx9rf.webp`} alt='Nintendo Logo' />
          </NavLink>
        </div>
        <div className='splash-link-container'>
          <NavLink to={`/items/platform/Playstation`}>
            <img className='splash-platform-img' src={`https://res.cloudinary.com/dixbzsdnm/image/upload/v1674667741/aa-capstone-gamebaux/Homepage_5_Column_BrandLogo_PlayStation_264x150_D_vjktan.webp`} alt='Playstation Logo' />
          </NavLink>
        </div>
        <div className='splash-link-container'>
          <NavLink to={`/items/platform/Xbox`}>
            <img className='splash-platform-img' src={`https://res.cloudinary.com/dixbzsdnm/image/upload/v1674667707/aa-capstone-gamebaux/Homepage_5_Column_BrandLogo_Xbox_264x150_D_w5imzj.webp`} alt='Xbox Logo' />
          </NavLink>
        </div>
      </div>
      <div className='splash-header'>Featured Categories</div>
      <div className='splash-categories-container'>

        <div className='splash-link-container'>
          <NavLink className='splash-nav' to={`/items/category/Console`}>
            <img className='splash-cat-img' src={`https://res.cloudinary.com/dixbzsdnm/image/upload/v1676323371/aa-capstone-gamebaux/Consoles-Category.webp`} alt='Consoles Category' />
            <div className='splash-cat-text'>Consoles</div>
          </NavLink>
        </div>
        <div className='splash-link-container'>
          <NavLink className='splash-nav' to={`/items/category/Game`}>
            <img className='splash-cat-img' src={`https://res.cloudinary.com/dixbzsdnm/image/upload/v1676323389/aa-capstone-gamebaux/Games-Category.webp`} alt='Games Category' />
            <div className='splash-cat-text'>Games</div>
          </NavLink>
        </div>
        <div className='splash-link-container'>
          <NavLink className='splash-nav' to={`/items/category/Accessory`}>
            <img className='splash-cat-img' src={`https://res.cloudinary.com/dixbzsdnm/image/upload/v1676323441/aa-capstone-gamebaux/Controllers-Accessories-Category.webp`} alt='Accessories Category' />
            <div className='splash-cat-text'>Controllers & Accessories</div>
          </NavLink>
        </div>
      </div>
      <div className='splash-banners-container'>
        <div className='splash-banner'>
          <img className='banner' src={`https://res.cloudinary.com/dixbzsdnm/image/upload/v1676323570/aa-capstone-gamebaux/Buy-Online-Pickup-Banner.webp`} alt='Buy Online Pickup' onClick={sendSoon} />
        </div>
        <div className='splash-banner'>
          <img className='banner' src={`https://res.cloudinary.com/dixbzsdnm/image/upload/v1676323595/aa-capstone-gamebaux/Same-Day-Delivery-Banner.webp`} alt='Same Day Delivery' onClick={sendSoon} />
        </div>
      </div>
    </div>
  )
}
