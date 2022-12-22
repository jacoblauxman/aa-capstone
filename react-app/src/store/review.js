// --- ACTIONS --- //
const LOAD_REVIEWS = 'reviews/LOAD_REVIEWS'
const ADD_REVIEW = 'reviews/ADD_REVIEW'
const UPDATE_REVIEW = 'reviews/UPDATE_REVIEW'
const DELETE_REVIEW = 'reviews/DELETE_REVIEW'

// --- CREATORS --- //

const loadReviews = (reviews, itemId) => ({
  type: LOAD_REVIEWS,
  reviews,
  itemId
})

const addReview = review => ({
  type: ADD_REVIEW,
  review
})

const updateReview = review => ({
  type: UPDATE_REVIEW,
  review
})

const deleteReview = reviewId => ({
  type: DELETE_REVIEW,
  reviewId
})

// --- THUNKS --- //


export const fetchReviews = itemId => async dispatch => {
  const response = await fetch(`/api/items/${itemId}/reviews`)

  if (response.ok) {
    const reviews = await response.json()
    dispatch(loadReviews(reviews, itemId))

    return reviews
  }
}


export const createReview = (itemId, review) => async dispatch => {
  const response = await fetch(`/api/items/${itemId}/reviews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(review)
  })

  if (response.ok) {
    const newReview = await response.json()
    dispatch(addReview(newReview))

    return newReview
  }
}


export const fetchUpdateReview = review => async dispatch => {
  const response = await fetch(`/api/reviews/${review.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(review)
  })

  if (response.ok) {
    const updateReview = await response.json()
    dispatch(updateReview(updatedReview))

    return updatedReview
  }
}


export const removeReview = reviewId => async dispatch => {
  const response = await fetch(`/api/review/${reviewId}`, {
    method: "DELETE"
  })

  if (response.ok) {
    dispatch(deleteReview(reviewId))

    return response
  }
}

// --- INITIAL STATE --- //


const initialState = { oneItem: {} }


// --- REDUCER --- //


const reviewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_REVIEWS: {
      const loadState = { ...state, oneItem: { ...state.oneItem } }
      action.reviews?.itemReviews.forEach(review => {
        loadState.oneItem[review.id] = review;
      })

      return loadState
    }

    case ADD_REVIEW: {
      const addState = { ...state, oneItem: { ...state.oneItem } }
      addState.oneItem[action.review.id] = action.review

      return addState
    }

    case UPDATE_REVIEW: {
      console.log(action, 'UPDATE REVIEW ACTION IN REDUCER!')
      const updateState = { ...state, oneItem: { ...state.oneItem, ...action.review } }

      return updateState
    }

    case DELETE_REVIEW: {
      console.log(action, 'DELETE REVIEW ACTION IN REDUCER!')
      const deleteState = { ...state, oneItem: { ...state.oneItem } }
      delete deleteState.oneItem[action.reviewId]

      return deleteState
    }

    default: {

      return state
    }
  }
}

export default reviewsReducer
