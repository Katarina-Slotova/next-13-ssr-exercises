'use client'
import React from 'react'

import DATA from './data'
import reducer from './reducer'
import StoreItem from './StoreItem'
import CheckoutFlow from './CheckoutFlow'
import './styles.css'

function CheckoutExercise() {
  const [items, dispatch] = React.useReducer(reducer, null)

  // this effect runs only once, after hydration (page reload), that's why empty array in dependencies
  // set the items to an empty array by updating the state through reducer OR to array of items, if there are any items in the cart upon reload
  React.useEffect(() => {
    const cartItems = window.localStorage.getItem('cart-items')
    dispatch({
      type: 'initialize',
      items: cartItems === null ? [] : JSON.parse(cartItems),
    })
  }, [])

  React.useEffect(() => {
    if (items !== null)
      window.localStorage.setItem('cart-items', JSON.stringify(items))
  }, [items])

  return (
    <>
      <h1>Neighborhood Shop</h1>

      <main>
        <div className='items'>
          {DATA.map((item) => (
            <StoreItem
              key={item.id}
              item={item}
              handleAddToCart={(item) => {
                dispatch({
                  type: 'add-item',
                  item,
                })
              }}
            />
          ))}
        </div>

        <CheckoutFlow
          items={items}
          taxRate={0.15}
          handleDeleteItem={(item) =>
            dispatch({
              type: 'delete-item',
              item,
            })
          }
        />
      </main>
    </>
  )
}

export default CheckoutExercise
