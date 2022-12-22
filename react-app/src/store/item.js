// --- ACTIONS --- //
const LOAD_ITEMS = 'reviews/LOAD_REVIEWS'
const LOAD_ITEM = 'items/LOAD_ITEM'



// --- CREATORS --- //

const loadItems = (items) => ({
  type: LOAD_ITEMS,
  items
})

const loadItem = (item) => ({
  type: LOAD_ITEM,
  item
})



// --- THUNKS --- //

export const fetchItems = () => async dispatch => {
  const response = await fetch(`/api/items/`)

  if (response.ok) {
    const items = await response.json()
    // console.log(items, '!!!!!!!!! ITEMS in FETCH !!!!!!!')
    dispatch(loadItems(items))

    return items
  }
}

export const fetchOneItem = (itemId) => async dispatch => {
  const response = await fetch(`/api/items/${itemId}`)

  if (response.ok) {
    const item = await response.json()
    // console.log(item, '!!!!!!!!!! ITEM in FETCH!!!!!!!!!!')
    dispatch(loadItem(item))

    return item
  }
}



// --- INITIAL STATE --- //

const initialState = { items: {}, oneItem: {} }



// --- REDUCER --- //

const itemsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_ITEMS: {
      // console.log('LOAD_ITEMS ACTION', action)
      const loadState = { ...state, items: { ...state.items }, oneItem: { ...state.oneItem } }
      action.items?.items?.forEach(item => {
        loadState.items[item.id] = item;
      })

      return loadState
    }

    case LOAD_ITEM: {
      // console.log('LOAD_ITEM ACTION', action)
      const loadOneState = { ...state, items: { ...state.items }, oneItem: { ...state.oneItem } }
      loadOneState.oneItem = action.item.item

      return loadOneState
    }

    default: {
      return state
    }
  }
}

export default itemsReducer
