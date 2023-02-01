// --- ACTIONS --- //
const LOAD_CART = 'cart/LOAD_CART'
const UPDATE_CART = 'cart/UPDATE_CART'
const DELETE_CART_ITEM = 'cart/DELETE_CART_ITEM'
const PURCHASE_CART = 'cart/PURCHASE_CART'


// --- CREATORS --- //
const loadCart = (cartItems) => ({
  type: LOAD_CART,
  cartItems
})

const updateCart = (newCartItem) => ({
  type: UPDATE_CART,
  newCartItem
})

const deleteFromCart = (cartItemId) => ({
  type: DELETE_CART_ITEM,
  cartItemId
})

const purchaseCart = () => ({
  type: PURCHASE_CART,
})


// --- THUNKS --- //
export const fetchCart = () => async dispatch => {
  const response = await fetch(`/api/cart/user`)

  if (response.ok) {
    const cartItems = await response.json()
    dispatch(loadCart(cartItems))

    return cartItems

  } else {

    return { "errors": "AUTHORIZATION: UNAUTHORIZED REQUEST" }
  }
}


export const createCartItem = (itemId) => async dispatch => {
  const response = await fetch(`/api/items/${itemId}/cart`).catch(err => {
    return {
      "errors": "VALIDATION: Item Quantity in cart must not exceed 10"
    }
  })

  if (response.ok) {
    const newCartItem = await response.json()
    dispatch(updateCart(newCartItem))
  }

    return {
      "errors": "VALIDATION: Item Quantity in cart must not exceed 10"
    }
}


export const updateCartItem = (cartItem) => async dispatch => {
  const response = await fetch(`/api/cart/user/${cartItem.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(cartItem)
  }).catch(err => {

    return {
      "errors": "VALIDATION: Item Quantity in cart must not exceed 10"
    }
  })

  if (response.ok) {
    const updatedCart = await response.json()
    dispatch(updateCart(updatedCart))

    return updatedCart
  }
}


export const deleteCartItem = (cartItemId) => async dispatch => {
  const response = await fetch(`/api/cart/user/${cartItemId}`, {
    method: "DELETE"
  })

  if (response.ok) {
    dispatch(deleteFromCart(cartItemId))

    return { "message": "Successfully removed item from cart" }
  }
}


export const purchaseCartItems = () => async dispatch => {
  const response = await fetch(`/api/cart/user`, {
    method: "DELETE"
  })

  if (response.ok) {
    dispatch(purchaseCart())

    return { "message": "Thank You for Your Purchase!" }
  }
}


// --- INITIAL STATE --- //
const initialState = { allItems: {} }


// --- REDUCER --- //
const cartReducer = (state = initialState, action) => {
  switch (action.type) {

    case LOAD_CART: {
      const loadState = { ...state, allItems: { ...state.allItems } }
      action.cartItems.items.forEach(item => {
        loadState.allItems[item.id] = item;
      })

      return loadState
    }

    case UPDATE_CART: {
      const updateState = { ...state, allItems: { ...state.allItems } }
      action.newCartItem.items.forEach(item => {
        updateState.allItems[item.id] = item;
      })

      return updateState
    }

    case DELETE_CART_ITEM: {
      const deleteState = { ...state, allItems: { ...state.allItems } }
      delete deleteState.allItems[action.cartItemId]

      return deleteState
    }

    case PURCHASE_CART: {
      return initialState
    }

    default: {
      return state
    }
  }
}

export default cartReducer
