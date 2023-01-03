import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useHistory, useParams } from 'react-router-dom'
import { fetchItems } from "../store/item";

// import "../css/Main.css"


export default function Main() {

  const dispatch = useDispatch()
  const history = useHistory()

  const [isLoaded, setIsLoaded] = useState(false)

  const user = useSelector(state => state.session.user)
  const allItems = useSelector(state => state.items.items)
  const itemsArr = Object?.values(allItems)

  useEffect(() => (
    dispatch(fetchItems())
      .then(() => setIsLoaded(true))

  ), [dispatch, itemsArr.length])

  return (
    <div className='main-container'>
      <div className='main-container-title'>
        Welcome to GameBaux
      </div>
      <div>Temp Links</div>
      {itemsArr?.length > 0 && itemsArr.map(item => (
        <li key={item.id}>
          <NavLink to={`/items/${item.id}`}>
            {item?.title}
          </NavLink>
        </li>
      ))}
    </div>
  )
}
