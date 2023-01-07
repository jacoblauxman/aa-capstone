import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import { fetchCart } from '../../store/cart';
import { login } from '../../store/session';
import '../../css/Auth.css'


const LoginForm = () => {

  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(["Invalid Credentials Provided"]);
    }
    const cart = await dispatch(fetchCart())
  };

  const demoLogin = async (e) => {
    e.preventDefault();
    let email = 'demo@aa.io'
    let password = 'password'
    const data = await dispatch(login(email, password))
    if (data) {
      setErrors(data)
    }
    const cart = await dispatch(fetchCart())
  }

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='auth-form-page-container'>
      <div className='auth-form-header-bar'>
        <NavLink className='auth-form-header-text' to='/'>
          GameBaux
        </NavLink>
      </div>
      <div className='auth-form-auth-container'>
        <div className='auth-form-header'>
          Welcome to GameBaux
        </div>
        <div className='auth-form-subheader'>
          Sign in to your Gamebaux account
        </div>
        <div className='errors-container'>
          {errors.map((error, ind) => (
            <div className='error-message' key={ind}>
              <span className='error-icon'><i class="fa-solid fa-circle-exclamation"></i></span>
              {error}
              </div>
          ))}
        </div>
        <div className='auth-form-form-container'>
          <form onSubmit={onLogin}>
            <div className='auth-input-container'>
              <label className='auth-input-label' htmlFor='email'>Email</label>
              <input
                className='auth-input'
                name='email'
                type='text'
                placeholder='Email'
                value={email}
                onChange={updateEmail}
              />
            </div>
            <div className='auth-input-container'>
              <label className='auth-input-label' htmlFor='password'>Password</label>
              <input
                className='auth-input'
                name='password'
                type='password'
                placeholder='Password'
                value={password}
                onChange={updatePassword}
              />
              <button
                type='submit'
                className='confirm-auth-button'
              >
                SIGN IN
              </button>
            </div>
          </form>
        </div>
        <button
          type='button'
          className='confirm-auth-button'
          onClick={demoLogin}
        >
          DEMO USER
        </button>
        <div className='divider-or'>
          <span className='or'>OR</span>
        </div>
        <NavLink to='/sign-up'>
          <button
            type='button'
            className='login-sign-up-button'
          >
            CREATE ACCOUNT
          </button>
        </NavLink>
      </div>
    </div>
  );
};

export default LoginForm;
