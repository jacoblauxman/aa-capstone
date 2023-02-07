// --- ACTIONS --- //
const LOAD_WISHLIST = "wishlist/LOAD_WISHLIST"
const UPDATE_WISHLIST = 'wishlist/UPDATE_WISHLIST'
const DELETE_WISHLIST = 'wishlist/DELETE_WISHLIST'


// --- CREATORS --- //
const loadWishlist = wishlist => ({
  type: LOAD_WISHLIST,
  wishlist
})

const updateWishlist = updatedWishlist => ({
  type: UPDATE_WISHLIST,
  updatedWishlist
})

const deleteWishlistItem = itemId => ({
  type: DELETE_WISHLIST,
  itemId
})

// --- THUNKS --- //
export const fetchWishlist = () => async dispatch => {
  const response = await fetch(`/api/wishlist/`)

  if (response.ok) {
    const wishlist = await response.json()
    dispatch(loadWishlist(wishlist))

    return wishlist
  }
}


export const fetchUpdatedWishlist = (itemId) => async dispatch => {
  const response = await fetch(`/api/items/${itemId}/wishlist`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(itemId)
  })

  if (response.ok) {
    const updatedWishlist = await response.json()
    console.log(updatedWishlist, 'IN THUNK!!')
    dispatch(updateWishlist(updatedWishlist))

    return updatedWishlist
  }
}


export const fetchDeleteWishlist = itemId => async dispatch => {
  const response = await fetch(`/api/wishlist/${itemId}`, {
    method: "DELETE",
  })

  if (response.ok) {
    const res = await response.json()
    dispatch(deleteWishlistItem(itemId))

    return res
  }
}

// --- INITIAL STATE --- //
const initialState = { wishlist: {} }


// --- REDUCER --- //
const wishlistReducer = (state = initialState, action) => {
  switch (action.type) {

    case LOAD_WISHLIST: {
      const loadState = { ...state, wishlist: { ...state.wishlist } }
      action.wishlist.wishlist.forEach(item => {
        loadState.wishlist[item.id] = item;
      })

      return loadState
    }

    case UPDATE_WISHLIST: {
      const updateState = {
        ...state,
        wishlist: { ...state.wishlist }
      }
      action.updatedWishlist.wishlist?.forEach(item => {
        updateState.wishlist[item.id] = item;
      })

      return updateState
    }

    case DELETE_WISHLIST: {
      const deleteState = { ...state, wishlist: { ...state.wishlist } }
      delete deleteState.wishlist[action.itemId]

      return deleteState
    }

    default: {

      return state
    }
  }
}

export default wishlistReducer
