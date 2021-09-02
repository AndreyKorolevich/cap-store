import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../features/cartManager'
import { TweenMax, TweenLite, Power2 } from 'gsap'
import { Button, Input } from 'reactstrap'
import { sizes } from '../constant/constants'
import { getBrands } from '../features/storeManager'

export default function CapCard({ cap, inCart }) {
  let card = useRef(null)
  const brands = useSelector(getBrands)
  const [chosenSize, selectSize] = useState('L')
  const dispatch = useDispatch()

  const { name, price, brand, img_url, size: availableSizes } = cap

  const handleSelect = (e) => {
    selectSize(e.target.value)
  }

  useEffect(() => {
    TweenLite.delayedCall(0.5, () => {
      TweenMax.to(card, 1, {
        duration: 1,
        opacity: 1,
        ease: Power2.easeInOut,
      })
    })
  }, [])
  return (
    <div className='cap-card' ref={(el) => (card = el)}>
      <div className='inner'>
        <div className='info'>
          <h6>
            {brands.find((item) => item.value === brand).name} - ${price}
          </h6>
          <h1>{name}</h1>
        </div>
        <div className='cap-image' style={{ backgroundImage: `url('${img_url}')` }} />
        <Input type='select' onChange={handleSelect} disabled={inCart} name='size_select'>
          {sizes.map((size) => (
            <option key={size} disabled={!availableSizes.includes(size)}>{size}</option>
          ))}
        </Input>
        {inCart ? (
          <Button className='add-to-cart in-cart toggle add'>
            <svg xmlns='https://www.w3.org/2000/svg' viewBox='0 0 64 64'>
              <path
                data-name='layer1'
                fill='none'
                stroke='#fff'
                strokeMiterlimit='10'
                strokeWidth='6'
                d='M16 33l11 11 21-22'
              ></path>
            </svg>
          </Button>
        ) : (
          <Button
            onClick={() => {
              const addCap = { ...cap, size: chosenSize }
              dispatch(addToCart(addCap))
            }}
            className='add-to-cart'
          >
            <svg xmlns='https://www.w3.org/2000/svg' viewBox='0 0 64 64'>
              <path
                data-name='layer1'
                fill='none'
                stroke='#fff'
                strokeMiterlimit='10'
                strokeWidth='6'
                d='M32 16v32m16-16H16'
              ></path>
            </svg>
          </Button>
        )}
      </div>
    </div>
  )
}
