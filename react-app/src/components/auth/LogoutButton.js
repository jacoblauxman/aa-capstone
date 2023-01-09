import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import { clearCartItems } from '../../store/cart';


const LogoutButton = () => {

  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(logout()).then(() => {
      dispatch(clearCartItems())
    })
  };

  return <button className='navbar-logout-button' onClick={onLogout}>Logout</button>;
};

export default LogoutButton;
