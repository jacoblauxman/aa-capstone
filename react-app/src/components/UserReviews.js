import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import DeleteReviewFormModal from './DeleteReview';
import { fetchUserReviews } from '../store/review';
import EditReviewFormModal from './EditReview';
import { timeFormatter } from '../utils';


function UserReviews({ userReviews }) {

  const user = useSelector(state => state.session?.user)
  const history = useHistory()

  if (!user) history.push('/')

  return (
    <>
      <div className='user-page-user-reviews-container'>
        <div className='user-cart-header'>
          Here are your reviews:
        </div>
        {userReviews?.length > 0 && userReviews?.map(review => (
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
    </>
  );

}

export default UserReviews
