import React, { useEffect, useState, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { NavLink, useHistory } from 'react-router-dom'
import { fetchItems, fetchSearchItems } from '../store/item';
import '../css/Splash.css'
import { SearchContext } from './SearchContext';

import { leadBannerImgs, bottomBannerImgs } from '../utils';
import BannerCarousel from './BannerCarousel';

export default function Splash() {
  const history = useHistory()
  const dispatch = useDispatch()
  const [isLoaded, setIsLoaded] = useState(false)
  const { searchString, setSearchString } = useContext(SearchContext)


  useEffect(() => {
    dispatch(fetchItems())
      .then(() => setIsLoaded(true))

    return () => setIsLoaded(false)
  }, [])

  const sendSoon = (e) => {
    e.preventDefault()
    history.push('/comingsoon')
  }

  const sendSearch = (e) => {
    e.preventDefault()
    const search = { 'search': e.target.alt }
    setSearchString(search.search)
    dispatch(fetchSearchItems(search))
      .then(() => history.push(`/items/results/${e.target.alt}`))
  }

  return (
    <div className='splash-container'>
      <BannerCarousel bannerURLs={leadBannerImgs} lead={true} />
      <section className='splash-game-section'>
        <NavLink to='/items/21' style={{ color: 'black' }}>
          <div className='splash-game-container'>
            <div className='splash-game-header'>
              <p className='splash-game-available'>AVAILABLE NOW | MUST PLAY</p>
              <h3 className='splash-game-title'>Legend of Zelda: Breath of the Wild</h3>
            </div>
            <img className='splash-game-image' src='https://res.cloudinary.com/dixbzsdnm/image/upload/v1686611030/BOTW-Share_icon_n5ukqt.jpg' />
          </div>
        </NavLink>
        <div className='splash-game-container'
          id='Elden' onClick={sendSearch}>
          <div className='splash-game-header'>
            <p className='splash-game-available'>AVAILABLE NOW | MUST PLAY</p>
            <h3 className='splash-game-title'>Elden Ring</h3>
          </div>
          <img className='splash-game-image' src='https://res.cloudinary.com/dixbzsdnm/image/upload/v1686610935/aa-capstone-gamebaux/elden-ring-900x506_ay2r3o.jpg' alt='Elden Ring' />
        </div>
      </section>
      <section className='splash-brands-section'>
        <div className='splash-header'>Top Brands. <span className='splash-header-gray'>Take Your Pick.</span></div>
        <div className='splash-platforms-grid'>

          <div className='splash-platforms-container'>
            <div className='splash-link-container'>
              <NavLink to={`/items/platform/Nintendo`}>
                <img className='splash-platform-img' src={`https://res.cloudinary.com/dixbzsdnm/image/upload/v1674667721/aa-capstone-gamebaux/Homepage_5_Column_BrandLogo_Nintendo_264x150_D_gzx9rf.webp`} alt='Nintendo' />
              </NavLink>
            </div>
            <div className='splash-link-container'>
              <NavLink to={`/items/platform/Playstation`}>
                <img className='splash-platform-img' src={`https://res.cloudinary.com/dixbzsdnm/image/upload/v1674667741/aa-capstone-gamebaux/Homepage_5_Column_BrandLogo_PlayStation_264x150_D_vjktan.webp`} alt='Playstation' />
              </NavLink>
            </div>
            <div className='splash-link-container'>
              <NavLink to={`/items/platform/Xbox`}>
                <img className='splash-platform-img' src={`https://res.cloudinary.com/dixbzsdnm/image/upload/v1674667707/aa-capstone-gamebaux/Homepage_5_Column_BrandLogo_Xbox_264x150_D_w5imzj.webp`} alt='Xbox' />
              </NavLink>
            </div>
            <div className='splash-link-container'
              onClick={sendSearch}>
              <img className='splash-platform-img' src={`https://res.cloudinary.com/dixbzsdnm/image/upload/v1686600818/aa-capstone-gamebaux/448x252_Funko_Logo_vkqyfr.jpg`} alt='Funko' />
            </div>
            <div className='splash-link-container'
              onClick={sendSearch}>
              <img className='splash-platform-img' src={`https://res.cloudinary.com/dixbzsdnm/image/upload/v1686600794/aa-capstone-gamebaux/448x252_Turtle_Beach_Logo_fpu7ht.jpg`} alt='Turtle Beach' />
            </div>
            <div className='splash-link-container'
              onClick={sendSearch}>
              <img className='splash-platform-img' src={`https://res.cloudinary.com/dixbzsdnm/image/upload/v1686600799/aa-capstone-gamebaux/448x252_Razer_Logo_bsrtlh.jpg`} alt='Razer' />
            </div>
            <div className='splash-link-container'
              onClick={sendSearch}>
              <img className='splash-platform-img' src={`https://res.cloudinary.com/dixbzsdnm/image/upload/v1686600803/aa-capstone-gamebaux/448x252_Pokemon_Logo_k3macx.jpg`} alt='Pokemon' />
            </div>
            <div className='splash-link-container'
              onClick={sendSearch}>
              <img className='splash-platform-img' src={`https://res.cloudinary.com/dixbzsdnm/image/upload/v1686600808/aa-capstone-gamebaux/448x252_Hasbro_Logo_ibj0so.jpg`} alt='Hasbro' />
            </div>
            <div className='splash-link-container'
              onClick={sendSearch}>
              <img className='splash-platform-img' src={`https://res.cloudinary.com/dixbzsdnm/image/upload/v1686600787/aa-capstone-gamebaux/448x252_AMD_Logo_y4iifq.jpg`} alt='AMD' />
            </div>
            <div className='splash-link-container'
              onClick={sendSearch}>
              <img className='splash-platform-img' src={`https://res.cloudinary.com/dixbzsdnm/image/upload/v1686600812/aa-capstone-gamebaux/448x252_Meta_Logo_ttcxsy.jpg`} alt='Meta' />
            </div>
          </div>
        </div>
      </section>

      <section className='splash-bottom-banner-section'>
        <BannerCarousel bannerURLs={bottomBannerImgs} lead={false} />
      </section>

      <section className='splash-categories-section'>
        <div className='splash-header'>Featured Categories.<span className='splash-header-gray'>Find Your Thing.</span></div>
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

        <section
          className='splash-new-releases-container'
          onClick={sendSoon}>
          < img className='splash-new-release-img' alt='New Releases' src='https://res.cloudinary.com/dixbzsdnm/image/upload/v1686603390/aa-capstone-gamebaux/HP_NewReleasesEvergreen_1736x224_FullBlade_D_hsf0gt.webp' />
        </section>

        <div className='splash-banners-container'>
          <div className='splash-banner'>
            <img className='banner' src={`https://res.cloudinary.com/dixbzsdnm/image/upload/v1676323570/aa-capstone-gamebaux/Buy-Online-Pickup-Banner.webp`} alt='Buy Online Pickup' onClick={sendSoon} />
          </div>
          <div className='splash-banner'>
            <img className='banner' src={`https://res.cloudinary.com/dixbzsdnm/image/upload/v1676323595/aa-capstone-gamebaux/Same-Day-Delivery-Banner.webp`} alt='Same Day Delivery' onClick={sendSoon} />
          </div>
        </div>
      </section>


    </div >
  )
}
