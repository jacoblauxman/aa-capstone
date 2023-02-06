//  --- ACTIONS --- //
const LOAD_ORDERS = 'orders/LOAD_ORDERS'
const UPDATE_ORDER = 'orders/UPDATE_ORDER'


// --- CREATORS --- //
const loadOrders = (orders) => ({
  type: LOAD_ORDERS,
  orders
})

const updateOrders = (updatedOrder) => ({
  type: UPDATE_ORDER,
  updatedOrder
})


// --- THUNKS --- //
export const fetchOrders = () => async dispatch => {
  const response = await fetch(`/api/orders/user`)

  if (response.ok) {
    const orders = await response.json()
    dispatch(loadOrders(orders))

    return orders
  }
}


export const fetchUpdateOrders = (order) => async dispatch => {
  const response = await fetch(`/api/orders/user/${order.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(order)
  })
  // .catch(err => {
  //   return {
  //     "errors": "VALIDATION: Shipping Address must be a valid shipping address"
  //   }
  // })

  if (response.ok) {
    const updatedOrder = await response.json()
    dispatch(updateOrders(updatedOrder))

    return updatedOrder
  }
}


// --- INITIAL STATE --- //
const initialState = { allOrders: {} }


// --- REDUCER --- //
const orderReducer = (state = initialState, action) => {
  switch (action.type) {

    case LOAD_ORDERS: {
      const loadState = { ...state, allOrders: { ...state.allOrders } }
      action.orders.orders.forEach(order => {
        loadState.allOrders[order.id] = order;
      })

      return loadState
    }

    case UPDATE_ORDER: {
      const updateState = { ...state, allOrders: { ...state.allOrders } }
      action.updatedOrder.orders.forEach(order => {
        updateState.allOrders[order.id] = order;
      })

      return updateState
    }

    default: {
      return state
    }
  }
}

export default orderReducer
