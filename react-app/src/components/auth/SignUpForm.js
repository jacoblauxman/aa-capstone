import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { NavLink, Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import { inputHandler, emailChecker } from '../../utils';


const SignUpForm = () => {

  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  let errorCheck = []

  const onSignUp = async (e) => {
    e.preventDefault();

    setErrors([])
    errorCheck = []

    if (Array.isArray(inputHandler(username, 4))) {
      errorCheck.push(`Username ${inputHandler(username, 4)}`)
    }
    if (Array.isArray(inputHandler(password, 6))) {
      errorCheck.push(`Password ${inputHandler(password, 4)}`)
    }
    if (Array.isArray(inputHandler(repeatPassword, 6))) {
      errorCheck.push(`Repeat password ${inputHandler(repeatPassword, 4)}`)
    }
    if (Array.isArray(inputHandler(email, 7))) {
      errorCheck.push(`Email ${inputHandler(repeatPassword, 7)}`)
    }
    if (password !== repeatPassword) {
      errorCheck.push("Password and Repeat Password Must Match!")
    }
    if (!emailChecker(email)) {
      errorCheck.push(`Email must include common domain extension ('.com', '.org', etc.)`)
    }

    if (errorCheck.length > 0) {
      setErrors(errorCheck)
      return
    } else {
      setErrors([])
    }

    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        const error = data[0]
        setErrors([error.split(": ")[1]])
      }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='signup-form-page-container'>

      <form onSubmit={onSignUp}>
        <div className='errors-container'>
          {errors.map((error, ind) => (
            <div className='error-message' key={ind}>{error}</div>
          ))}
        </div>
        <div>
          <label>User Name</label>
          <input
            type='text'
            name='username'
            onChange={updateUsername}
            value={username}
            minLength={4}
            maxLength={16}
            required={true}
          ></input>
        </div>
        <div>
          <label>Email</label>
          <input
            type='email'
            name='email'
            onChange={updateEmail}
            value={email}
            required={true}
            minLength={7}
            maxLength={25}
          ></input>
        </div>
        <div>
          <label>Password</label>
          <input
            type='password'
            name='password'
            onChange={updatePassword}
            value={password}
            minLength={6}
            maxLength={16}
            required={true}
          ></input>
        </div>
        <div>
          <label>Repeat Password</label>
          <input
            type='password'
            name='repeat_password'
            onChange={updateRepeatPassword}
            value={repeatPassword}
            required={true}
            minLength={6}
            maxLength={16}
          ></input>
        </div>
        <button type='submit'>Sign Up</button>
      </form>
      <div className='signup-page-container-back-button'>
        <NavLink to='/'>
          <button type="button">
            Go Back Home
          </button>
        </NavLink>
      </div>
    </div>
  );
};

export default SignUpForm;
