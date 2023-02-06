import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { NavLink, useHistory, useParams } from 'react-router-dom';
import EditCartOrderFormModal from './EditCartOrder';


function UserOrders({ userOrders }) {

  const user = useSelector(state => state.session?.user)

  return (
    <>
      <div className='user-page-user-reviews-container'>
        <div className='user-cart-header'>
          Here is your order history with GameBaux:
        </div>
        {userOrders?.length > 0 && userOrders?.map(order => (
          <div key={order?.id} className='reviews-page-single-review-container'>
            {console.log(order, 'ORDER IN OUR MAP!!')} {order?.id}
            <div className='user-order-address-container'>
              <div className='user-order-address-header'>SHIP TO:</div>
              <div className='order-address-item'>{order?.street}</div>
              <div className='order-address-item'>{order?.city}, {order?.state} {order?.zipcode}</div>
              <EditCartOrderFormModal order={order} />
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default UserOrders
