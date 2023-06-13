
import React, { useState, useEffect, useContext } from 'react';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import LogoutButton from './auth/LogoutButton';
import User from './User'
import '../css/NavBar.css'
import { SearchContext } from './SearchContext';
import { inputHandler } from '../utils';
import { fetchSearchItems } from '../store/item';

const NavBar = () => {

  const dispatch = useDispatch()
  const history = useHistory()

  const [searchInput, setSearchInput] = useState('')
  const { setSearchString } = useContext(SearchContext)
  const user = useSelector(state => state?.session?.user)

  // -- Reset Search on homepage click -- //
  const resetSearch = (e) => {
    e.preventDefault()
    setSearchInput('')
    history.push('/')
  }
  // -- Temp search display for future -- //
  const onFocusSearch = (e) => {
    e.preventDefault()
    // let value = 'Search Feature Coming Soon!'
    // return e.target.value = value
    return
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    let sent = inputHandler(searchInput, 1)
    if (Array.isArray(sent)) {
      setSearchInput('')
      return
    } else {
      setSearchString(sent)
      const search = { 'search': sent }
      dispatch(fetchSearchItems(search))
        .then(() => history.push(`/items/results/${sent}`))
    }
  }

  const handleCancel = (e) => {
    e.preventDefault()
    setSearchInput('')
  }

  return (
    <div className='navbar-nav-container'>
      <nav className='navbar-nav'>
        {/* <div className='navbar-menu-button-container'>
          <div className='navbar-menu-hamburger-icon-container'>
            <img className='navbar-menu-hamburger-icon' src='https://res.cloudinary.com/dixbzsdnm/image/upload/v1671653252/aa-capstone-gamebaux/svgs/menu-icon_e4nbox.svg' alt='Menu Icon' />
          </div>
          <div className='navbar-menu-menu-text'>
            Menu
          </div>
        </div> */}
        <div className='navbar-site-title-container'>
          <NavLink to='/' exact={true} activeClassName='active' className='navbar-navlink-title-text' onClick={resetSearch}>
            GameBaux
          </NavLink>
        </div>
        <div className='navbar-search-bar-container'>
          <form className='navbar-search-bar-form-container' onSubmit={handleSubmit}>

            <button type='submit' className='navbar-search-bar-search-button-container'>
              <div className='navbar-search-bar-magnifying-glass-container'>
                <img className='navbar-search-bar-magnifying-glass' src="https://res.cloudinary.com/dixbzsdnm/image/upload/v1671653254/aa-capstone-gamebaux/svgs/search-icon_okqpr5.svg" alt='Send Search' />
              </div>
            </button>
            <input
              className='navbar-search-bar-input-field'
              value={searchInput}
              onChange={e => setSearchInput(e.target.value)}
              placeholder='Search games, consoles & more'
              onFocus={onFocusSearch}
            // onBlur={searchMouseOut}
            />
            <button type='button' className='navbar-search-bar-search-cancel-container' onClick={handleCancel}>
              <img className='navbar-search-bar-cancel-x' src='https://res.cloudinary.com/dixbzsdnm/image/upload/v1671653253/aa-capstone-gamebaux/svgs/cancel-icon_xw1xvb.svg' alt='Search Cancel' />
            </button>
          </form>
        </div>
        {/* TESTING */}
        <div className='navbar-shopping-cart-container'>
          <NavLink to='/comingsoon' exact={true} className='navbar-shopping-cart-link'>
            <div className='shopping-cart-img'>
              <img className='pro-rewards-icon' src={`https://res.cloudinary.com/dixbzsdnm/image/upload/v1671746904/aa-capstone-gamebaux/svgs/trade-in-icon_b9spmg.svg`} alt='Trade-In Icon' />
            </div>
            <div className='shopping-cart-label'>
              Trade-In
            </div>
          </NavLink>
        </div>
        <div className='navbar-shopping-cart-container'>
          <NavLink to='/comingsoon' exact={true} className='navbar-shopping-cart-link'>
            <div className='shopping-cart-img'>
              <img className='pro-rewards-icon' src={`https://res.cloudinary.com/dixbzsdnm/image/upload/v1686601395/aa-capstone-gamebaux/svgs/rewards-icon_1_pj4cnw.svg`} alt='Rewards Icon' />
            </div>
            <div className='shopping-cart-label'>
              Pro Rewards
            </div>
          </NavLink>
        </div>
        <div className='navbar-user-info-login-info'>
          {user && user?.id && (
            <NavLink to={`/users/${user.id}`} exact={true} activeClassName='active' className='navbar-user-info-profile-navlink'>
              <div className='navbar-user-info-short-username'>
                {user?.username[0]}
              </div>
              <div className='navbar-user-info-account'>
                Account
              </div>
            </NavLink>
          )}
          {!user && (
            <>
              <div className='navbar-login-container'>
                <NavLink to='/login' exact={true} activeClassName='active' className='navbar-login-link'>
                  <div className='navbar-login-icon-container'>
                    <img className='navbar-login-icon' alt='Login Icon' src='https://res.cloudinary.com/dixbzsdnm/image/upload/v1671736422/aa-capstone-gamebaux/svgs/icons8-user-48_vbhniw.png' />
                  </div>
                  <div className='navbar-login-text'>
                    Sign In
                  </div>
                </NavLink>
              </div>
            </>
          )}
        </div>
        {user && (
          <div className='navbar-logout-container'>
            <LogoutButton />
          </div>
        )}
        <div className='navbar-shopping-cart-container'>
          <NavLink to='/cart' exact={true} className='navbar-shopping-cart-link'>
            <div className='shopping-cart-img'>
              <img className='navbar-cart-icon' src={`https://res.cloudinary.com/dixbzsdnm/image/upload/v1671653253/aa-capstone-gamebaux/svgs/cart-icon_jjashy.svg`} alt='Shopping Cart Icon' />
            </div>
            <div className='shopping-cart-label'>
              Cart
            </div>
          </NavLink>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
