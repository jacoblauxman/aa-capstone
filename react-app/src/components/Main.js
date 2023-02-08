import React, { useContext, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useHistory, useParams } from 'react-router-dom'
import { fetchItems, fetchSearchItems } from "../store/item";
import "../css/Main.css"
import { briefDescription } from "../utils";
import { SearchContext } from "./SearchContext";

export default function Main() {
  const { searchString } = useContext(SearchContext)
  const dispatch = useDispatch()
  const history = useHistory()

  const [isLoaded, setIsLoaded] = useState(false)
  // const []
  const user = useSelector(state => state.session?.user)
  const allItems = useSelector(state => state.items?.items)
  const itemsArr = Object?.values(allItems)

  useEffect(() => {
    dispatch(fetchItems())
      .then(() => setIsLoaded(true))

    return () => setIsLoaded(false)
  }, [
    // dispatch, itemsArr.length, searchString
  ])

  useEffect(() => {
    setIsLoaded(false)
    dispatch(fetchSearchItems({ 'search': searchString }))
      .then(() => setIsLoaded(true))
  }, [dispatch, itemsArr.length, searchString])

  return (
    <div className='main-container'>
      <div className='main-container-title'>
        All {itemsArr?.length} Results for <span className='results-category-title'>"Current Stock" {searchString}</span>
      </div>
      <div className='results-items-grid-container'>
        {itemsArr?.length > 0 && itemsArr.map(item => (
          <div className='results-single-item-container' key={item.id}>
            <NavLink className='results-item-link' to={`/items/${item?.id}`}>
              <div className='results-item-preview-container'>
                <img className='results-item-img' src={item?.image} alt='Results Item Preview' />
              </div>
              <div className='results-item-info'>
                {item?.title} - {item?.platform}
              </div>
              <div className='results-item-brief-descript'>
                "{briefDescription(item?.description)}..."
              </div>
            </NavLink>
            <div className='results-item-price'>
              ${item?.price}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
