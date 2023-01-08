import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import DeleteReviewFormModal from './DeleteReview';
import { fetchUserReviews } from '../store/review';
import EditReviewFormModal from './EditReview';
import { timeFormatter } from '../utils';
import '../css/User.css'

function User() {

  const [user, setUser] = useState({});
  const { userId } = useParams();

  const dispatch = useDispatch()
  const history = useHistory()

  const [userReviews, setUserReviews] = useState([])
  const reviews = useSelector(state => state.reviews?.user)
  const reviewsArr = Object?.values(reviews)
  const myfriendjson = JSON.stringify(reviewsArr)

  useEffect(() => {
    if (!user) history.push('/')
    dispatch(fetchUserReviews())
      .then((res) => {
        setUserReviews(res.userReviews)
      })
  }, [dispatch, userId, myfriendjson])

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

  // --- check for user / page returns --- //
  if (!user) {
    return null
  }

  return (
    <div className='user-page-container'>
      <div className='user-page-user-reviews-container'>
        <div className='user-cart-header'>
          Hi {user?.username}, here are your purchase reviews:
        </div>
        {userReviews.length > 0 && userReviews?.map(review => (
          <div key={review?.id} className='reviews-page-single-review-container'>

            <div className='reviews-page-single-review-ago-container'>
              {timeFormatter(review?.createdAt)}
            </div>
            <div className='reviews-page-item-title'>
              {review?.item?.title}
            </div>
            <div className='reviews-page-single-review-title'>
              {review?.title}
            </div>
            <div className='reviews-page-single-review-star-display'>
              {review?.rating && [...Array(review.rating)].map((star, i) => (
                <img key={i} src='https://res.cloudinary.com/dixbzsdnm/image/upload/v1671671732/aa-capstone-gamebaux/svgs/solid-star_zc14zs.svg' alt='Reviews Stars' className='reviews-review-single-stars' />
              ))}
            </div>
            <div className='reviews-page-single-review-review'>
              {review?.review}
            </div>
            <div className='reviews-page-single-review-edit-delete-container'>
              <div className='reviews-page-single-review-edit-container'>
                <EditReviewFormModal reviewEdit={review}
                />
              </div>
              <div className='reviews-page-single-review-delete-container'>
                <DeleteReviewFormModal review={review} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default User;
