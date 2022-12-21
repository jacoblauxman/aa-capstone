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


// --- THUNKS --- //

export const fetchReviews = itemId => async dispatch => {
  const response = await fetch(`/api/items/${itemId}/reviews`)

  if (response.ok) {
    const reviews = await response.json()
    dispatch(loadReviews(reviews, itemId))

    return reviews
  }
}


// --- INITIAL STATE --- //


const initialState = { oneItem: {} }


// --- REDUCER --- //


const reviewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_REVIEWS: {
      const loadState = {...state, oneItem: { ...state.oneItem }}
      action.reviews.itemReviews.forEach(review => {
        loadState.oneItem[review.id] = review;
      })
      return loadState
    }

    default: {
      return state
    }
  }
}

export default reviewsReducer
