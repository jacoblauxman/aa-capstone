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


// --- THUNKS --- //


export const fetchReviews = itemId => async dispatch => {
  const response = await fetch(`/api/items/${itemId}/reviews`)

  if (response.ok) {
    const reviews = await response.json()
    // console.log(reviews, '!!!! REVIEWS in FETCH !!!!')
    dispatch(loadReviews(reviews, itemId))

    return reviews
  }
}


export const createReview = (itemId, review) => async dispatch => {
  const response = await fetch(`/api/items/${itemId}/reviews`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(review)
  })

  if (response.ok) {
    const newReview = await response.json()
    dispatch(addReview(newReview))

    return newReview
  }
}

// --- INITIAL STATE --- //


const initialState = { oneItem: {} }


// --- REDUCER --- //


const reviewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_REVIEWS: {
      // console.log('LOAD_REVIEWS ACTION!!!', action)
      const loadState = { ...state, oneItem: { ...state.oneItem } }
      action.reviews?.itemReviews.forEach(review => {
        loadState.oneItem[review.id] = review;
      })

      return loadState
    }

    case ADD_REVIEW: {
      // console.log("ADD_REVIEW ACTION!!", action)
      const addState = { ...state, oneItem: { ...state.oneItem } }
      addState.oneItem[action.review.id] = action.review

      return addState
    }

    default: {

      return state
    }
  }
}

export default reviewsReducer
