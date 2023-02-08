// --- ACTIONS --- //
const LOAD_ITEMS = 'items/LOAD_ITEMS'
const LOAD_ITEM = 'items/LOAD_ITEM'
const LOAD_SEARCH_ITEMS = 'items/LOAD_SEARCH_ITEMS'


// --- CREATORS --- //
const loadItems = (items) => ({
  type: LOAD_ITEMS,
  items
})

const loadItem = (item) => ({
  type: LOAD_ITEM,
  item
})

const loadSearchItems = (items) => ({
  type: LOAD_SEARCH_ITEMS,
  items
})

// --- THUNKS --- //
export const fetchItems = () => async dispatch => {
  const response = await fetch(`/api/items/`)

  if (response.ok) {
    const items = await response.json()
    dispatch(loadItems(items))

    return items
  }
}


export const fetchOneItem = (itemId) => async dispatch => {
  const response = await fetch(`/api/items/${itemId}`)

  if (response.ok) {
    const item = await response.json()
    dispatch(loadItem(item))

    return item
  }
}


export const fetchPlatItems = (platform) => async dispatch => {
  const response = await fetch(`/api/items/platform/${platform}`)

  if (response.ok) {
    const items = await response.json()
    dispatch(loadSearchItems(items))

    return items
  }
}


export const fetchCatItems = (category) => async dispatch => {
  const response = await fetch(`/api/items/category/${category}`)

  if (response.ok) {
    const items = await response.json()
    dispatch(loadSearchItems(items))

    return items
  }
}


export const fetchSearchItems = (search) => async dispatch => {
  const response = await fetch(`/api/items/search`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(search)
  })

  if (response.ok) {
    const items = await response.json()
    dispatch(loadSearchItems(items))

    return items
  }
}


// --- INITIAL STATE --- //
const initialState = { items: {}, oneItem: {} }


// --- REDUCER --- //
const itemsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_ITEMS: {
      const loadState = { ...state, items: { ...state.items }, oneItem: { ...state.oneItem } }
      action.items?.items?.forEach(item => {
        loadState.items[item.id] = item;
      })

      return loadState
    }

    case LOAD_ITEM: {
      const loadOneState = { ...state, items: { ...state.items }, oneItem: { ...state.oneItem } }
      loadOneState.oneItem = action.item.item

      return loadOneState
    }

    case LOAD_SEARCH_ITEMS: {
      const loadSearchState = { items: {}, oneItem: { ...state.oneItem } }
      action.items?.items?.forEach(item => {
        loadSearchState.items[item.id] = item;
      })

      return loadSearchState
    }

    default: {
      return state
    }
  }
}

export default itemsReducer
