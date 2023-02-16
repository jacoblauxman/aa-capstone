import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import User from './components/User';
import { authenticate } from './store/session';
import Reviews from './components/Reviews';
import Main from './components/Main';
import Item from './components/Item';
import CreateReviewModal from './components/CreateReview/CreateReviewForm';
import Cart from './components/Cart';
import { fetchCart } from './store/cart';
import NotFound from './components/404';
import { SearchContext, SearchProvider } from './components/SearchContext';
import Splash from './components/Splash';
import ComingSoon from './components/ComingSoon';
import Footer from './components/Footer';

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

  // -- load user's cart if user exists -- //
  if (user) {
    (async () => {
      await dispatch(fetchCart());
    })()
  }

  return (
    <SearchProvider>

      <BrowserRouter>
        <Switch>
          <Route path='/login' exact={true}>
            {/* <NavBar /> */}
            <LoginForm />
          </Route>
          <Route path='/sign-up' exact={true}>
            {/* <NavBar /> */}
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
          <ProtectedRoute path='/users/:userId/wishlist' exact={true} >
            <NavBar />
            <User wishDirect={true} />
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
          <Route path='/items/results/:search' exact={true} >
            <NavBar />
            <Main />
          </Route>
          <Route path='/items/platform/:platform' exact={true} >
            <NavBar />
            <Main />
          </Route>
          <Route path='/items/category/:category' exact={true} >
            <NavBar />
            <Main />
          </Route>
          <Route path='/' exact={true}>
            <NavBar />
            <Splash />
          </Route>
          <Route path='/comingsoon' exact={true}>
            <NavBar />
            <ComingSoon />
          </Route>
          <Route>
            <NavBar />
            <NotFound />
          </Route>
        </Switch>
        <Footer />
      </BrowserRouter>
    </SearchProvider>
  );
}

export default App;
