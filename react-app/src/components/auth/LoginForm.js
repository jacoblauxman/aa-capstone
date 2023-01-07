import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import { fetchCart } from '../../store/cart';
import { login } from '../../store/session';


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
    <div className='login-form-page-container'>
      <form onSubmit={onLogin}>
        <div className='errors-container'>
          {errors.map((error, ind) => (
            <div className='error-message' key={ind}>{error}</div>
          ))}
        </div>
        <div>
          <label htmlFor='email'>Email</label>
          <input
            name='email'
            type='text'
            placeholder='Email'
            value={email}
            onChange={updateEmail}
          />
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input
            name='password'
            type='password'
            placeholder='Password'
            value={password}
            onChange={updatePassword}
          />
          <button type='submit'>Login</button>
        </div>
      </form>
      <div className='login-form-demo-button'>
        <button
          type='button'
          onClick={demoLogin}
        >
          Demo Login
        </button>
      </div>
      <div className='login-form-sign-up-button'>
        <NavLink to='/sign-up'>
          <button type='button'>
            Create an Account
          </button>
        </NavLink>
      </div>
      <div className='login-form-back-button'>
        <NavLink to='/'>
          <button type='button'>
            Go Back
          </button>
        </NavLink>
      </div>
    </div>
  );
};

export default LoginForm;
