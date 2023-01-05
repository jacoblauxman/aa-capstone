import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import Reviews from './components/Reviews';
import Main from './components/Main';
import Item from './components/Item';
import CreateReviewModal from './components/CreateReview/CreateReviewForm';
import Cart from './components/Cart';
import { fetchCart } from './store/cart';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  const user = useSelector(state => state.session?.user)

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  if (user) {
    (async () => {
      await dispatch(fetchCart());
    })()
  }

  return (
    <BrowserRouter>
      {/* <NavBar /> */}
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/cart' exact={true} >
          <NavBar />
          <Cart />
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <NavBar />
          <User />
        </ProtectedRoute>
        <Route path='/items/:itemId' exact={true}>
          <NavBar />
          <Item />
        </Route>
        <Route path='/items/:itemId/reviews' exact={true}>
          <NavBar />
          <Reviews />
        </Route>
        <ProtectedRoute path='/create-review'>
          <CreateReviewModal />
        </ProtectedRoute>
        <Route path='/' exact={true} >
          <NavBar />
          <Main />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
