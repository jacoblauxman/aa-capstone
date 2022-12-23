
import React, { useState, useEffect } from 'react';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import LogoutButton from './auth/LogoutButton';
import User from './User'
import '../css/NavBar.css'

const NavBar = () => {

  const dispatch = useDispatch()
  const history = useHistory()

  const [searchInput, setSearchInput] = useState('')

  const user = useSelector(state => state?.session?.user)


  return (
    <div className='navbar-nav-container'>
      <nav className='navbar-nav'>
        <div className='navbar-menu-button-container'>
          <div className='navbar-menu-hamburger-icon-container'>
            <img className='navbar-menu-hamburger-icon' src='https://res.cloudinary.com/dixbzsdnm/image/upload/v1671653252/aa-capstone-gamebaux/svgs/menu-icon_e4nbox.svg' alt='Menu Icon' />
          </div>
          <div className='navbar-menu-menu-text'>
            Menu
          </div>
        </div>
        <div className='navbar-site-title-container'>
          <NavLink to='/' exact={true} activeClassName='active' className='navbar-navlink-title-text'>
            GameBaux
          </NavLink>
        </div>
        <div className='navbar-search-bar-container'>
          <form className='navbar-search-bar-form-container'>

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
            />
            <button type='button' className='navbar-search-bar-search-cancel-container'>
              <img className='navbar-search-bar-cancel-x' src='https://res.cloudinary.com/dixbzsdnm/image/upload/v1671653253/aa-capstone-gamebaux/svgs/cancel-icon_xw1xvb.svg' alt='Search Cancel' />
            </button>
          </form>
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
                  Sign In
                </NavLink>
              </div>
              {/* <div>
                <NavLink to='/sign-up' exact={true} activeClassName='active'>
                  Sign Up
                </NavLink>
              </div> */}
            </>
          )}
        </div>
        {/* <div>
          <NavLink to='/users' exact={true} activeClassName='active'>
            Users
          </NavLink>
        </div> */}
        <div>
          {/* TO DO -- move logout to user profile page */}
          <LogoutButton />
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
