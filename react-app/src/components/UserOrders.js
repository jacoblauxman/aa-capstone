import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import EditCartOrderFormModal from './EditCartOrder';
import { cartTotal } from '../utils';


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
            <div className='user-order-address-container'>
              <div className='user-order-address-header'>SHIP TO:</div>
              <div className='order-address-item'>{order?.street}</div>
              <div className='order-address-item'>{order?.city}, {order?.state} {order?.zipcode}</div>
              <EditCartOrderFormModal order={order} />
            </div>
            <div className='user-order-items-container'>
              {Object.values(order?.items?.map(item => (
                <div className='user-order-single-item' key={item.id}>
                  <div className='single-cart-item-image-container'>
                    <img className='single-cart-item-image' src={item?.item?.image} alt='Cart Item Preview' />
                  </div>
                  <div className='single-cart-item-info'>
                    <span className='order-product-info'>
                      {item?.item?.title} - {item?.item?.platform}
                    </span>
                    <span className='order-product-price'>
                      ${item?.item?.price} x Qty {item?.quantity}
                    </span>
                  </div>
                </div>
              )))}
            </div>
            <div className='order-total'>
              <span class>Order Total</span><span>{cartTotal(order?.items)}</span>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default UserOrders
