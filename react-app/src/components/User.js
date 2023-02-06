import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import DeleteReviewFormModal from './DeleteReview';
import { fetchUserReviews } from '../store/review';
import EditReviewFormModal from './EditReview';
import { timeFormatter } from '../utils';
import { fetchOrders } from '../store/order';
import { logout } from '../store/session';
import UserReviews from './UserReviews';
import UserOrders from './UserOrders';
// import UserReviews from './UserReviews';

function User() {

  const [user, setUser] = useState({});
  const { userId } = useParams();

  const dispatch = useDispatch()
  const history = useHistory()

  const [userReviews, setUserReviews] = useState([])
  const [userOrders, setUserOrders] = useState([])
  const [showReviews, setShowReviews] = useState(false)
  const [showOrders, setShowOrders] = useState(false)

  const reviews = useSelector(state => state.reviews?.user)
  const reviewsArr = Object?.values(reviews)
  const myfriendjson = JSON.stringify(reviewsArr)
  const orders = useSelector(state => state.orders?.allOrders)
  const ordersArr = Object?.values(orders)
  const myfriendjson2 = JSON.stringify(ordersArr)

  useEffect(() => {
    if (!user) history.push('/')
    dispatch(fetchUserReviews())
      .then((res) => {
        setUserReviews(res.userReviews)
      })
    dispatch(fetchOrders())
      .then((res) => {
        setUserOrders(res?.orders)
      })
  }, [dispatch, userId, myfriendjson, myfriendjson2])

  useEffect(() => {
    if (!userId) {
      return;
    }
    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      setUser(user);
    })()
  }, [userId, dispatch]);


  const onLogout = async (e) => {
    await dispatch(logout());
  };

  const showUserReviews = (e) => {
    e.preventDefault()
    setShowReviews(true)
    setShowOrders(false)
  }

  const showUserOrders = (e) => {
    e.preventDefault()
    setShowOrders(true)
    setShowReviews(false)
  }


  // --- check for user / page returns --- //
  if (!user) {
    return null
  }

  return (
    <>
      <div className='user-page-user-reviews-container'>
        <div className='user-cart-header'>
          <div className='user-info-name'>
            Hi {user?.username}
          </div>
          <div className='user-info-logout'>
            <button
              type='button'
              className='user-info-logout-text'
              onClick={onLogout}
            >
              Logout
            </button>
          </div>
        </div>
        <div className='user-page-sidebar-container'>
          <button className='user-page-sidebar-link'
            onClick={showUserReviews}>
            My Reviews
          </button>
          <button className='user-page-sidebar-link'
            onClick={showUserOrders}>
            My Orders
          </button>
        </div>
        <div className='user-page-display-choice'>
          {showReviews && (
            <UserReviews userReviews={userReviews} />
          )}
          {showOrders && (
            <UserOrders userOrders={userOrders} />
          )}
        </div>
      </div>
    </>
  );
}
export default User;
