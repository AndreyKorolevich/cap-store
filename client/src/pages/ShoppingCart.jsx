import React, { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { removeFromCart } from '../features/cartManager'
import { useDispatch } from 'react-redux'
import { TweenMax, Power1 } from 'gsap'
import { Row, Col, Button } from 'reactstrap'
import Checkout from '../components/Checkout'
import emptyCart from '../assets/add-to-cart.svg'

export default function ShoppingCart(props) {
  const { cart } = props
  const dispatch = useDispatch()
  const [subtotal, setSubtotal] = useState(0)
  let right = useRef(null)
  let left = useRef(null)
  useEffect(() => {
    function getSum(total, num) {
      return total + num
    }

    if (cart.length > 0) {
      const numbers = []
      cart.forEach((item) => numbers.push(item.price))
      setSubtotal(numbers.reduce(getSum))
    } else {
      setSubtotal(0)
    }
  }, [cart])
  useEffect(() => {
    TweenMax.to(left, 1, {
      top: 0,
      duration: 2,
      opacity: 1,
      ease: Power1.easeInOut,
    })
    TweenMax.to(right, 1, {
      top: 0,
      duration: 2,
      opacity: 1,
      ease: Power1.easeInOut,
    })
  }, [])
  return (
    <div id='cart'>
      <main className='d-flex flex-wrap justify-content-center'>
        <div ref={(el) => (left = el)} className='left'>
          <Row className='row-top'>
            <Col className='col-center font-weight-bold' xs='6'>
              Name
            </Col>
            <Col className='col-center font-weight-bold' xs='3'>
              Size
            </Col>
            <Col className='col-center font-weight-bold' xs='3'>
              Price
            </Col>
          </Row>
          {cart.length > 0 ? (
            <div className='cart-items'>
              {cart.map((cap, i) => {
                const { id, name, price, size } = cap
                return (
                  <div className='item row d-flex align-items-start' key={id}>
                    <Col xs='6' className='col-center d-flex justify-content-between'>
                      <p>{name}</p>
                      <i
                        onClick={() => {
                          dispatch(removeFromCart(id))
                        }}
                        className='far fa-trash-alt'
                      />
                    </Col>
                    <Col xs='3' className='col-center'>
                      <p>{size}</p>
                    </Col>
                    <Col xs='3' className='col-center'>
                      ${price}.00
                    </Col>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className='cart-empty'>
              <img alt='No Items In Cart' src={emptyCart}/>
            </div>
          )}
          <Row className='row-bottom'>
            <Col className='col-center' xs='6'>
              <Button className='font-weight-bold' color='primary'>
                <Link to='/store'>Continue Shopping</Link>
              </Button>
            </Col>
            <Col className='col-center align-items-center' md='3' sm='3'>
              Items: {cart.length}
            </Col>
            <Col className='col-center d-flex align-items-center' xs='6' sm='3' md='3'>
              Total:{' '}
              <span className='ml-1 font-weight-bold'>
                ${subtotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}.00
              </span>
            </Col>
          </Row>
        </div>
        <div ref={(el) => (right = el)} className='right'>
          <Checkout subtotal={subtotal}/>
        </div>
      </main>
    </div>
  )
}
