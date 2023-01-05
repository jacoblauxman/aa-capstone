import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import DeleteReviewFormModal from './DeleteReview';
import { fetchUserReviews } from '../store/review';
import EditReviewFormModal from './EditReview';

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

  // -- Format Review dates -- //
  const timeFormatter = (date) => {
    let now = new Date()
    let then = new Date(date)
    let timeElapsed = now - then
    let oneDay = (1000 * 3600 * 24)
    let daysSince = (timeElapsed / oneDay)
    daysSince = Math.round(daysSince)
    if (daysSince < 1) {
      return `less than 1 day ago...`
    } else if (daysSince === 1) {
      return `Just 1 day ago...`
    } else if (daysSince > 14) {
      return `more than 2 week ago...`
    } else if (daysSince > 31) {
      return `over a month ago...`
    } else if (daysSince > 365) {
      return `over a year ago...`
    } else {
      return `About ${daysSince} days ago...`
    }
  }

  // --- check for user / page returns --- //
  if (!user) {
    return null
  }

  return (
    <>
      <div className='user-page-user-info-container'>
        <div>
          <strong>Username</strong> {user.username}
        </div>
        <div>
          <strong>Email</strong> {user.email}
        </div>
      </div>

      <div className='user-page-user-reviews-container'>
        <div>
          Your Reviews
        </div>
        {userReviews.length > 0 && userReviews?.map(review => (
          <div key={review?.id} className='reviews-page-single-review-container'>
            <div className='reviews-page-single-review-delete-container'>
              <DeleteReviewFormModal review={review} />
            </div>
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
            <div className='reviews-page-single-review-edit-container'>
              <EditReviewFormModal reviewEdit={review}
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
export default User;
