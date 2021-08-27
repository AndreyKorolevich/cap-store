import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectCart } from '../features/cartManager'
import { TweenMax, Power1 } from 'gsap'

// Image
import close from '../assets/close.svg'
import cartIcon from '../assets/cart.svg'
import logo from '../assets/logo.webp'

export default function Navigation() {
  const [isOpen, toggle] = useState(false)
  const cart = useSelector(selectCart).cart
  const [cartNumber, setNumber] = useState(cart.length)

  let menu = useRef(null)
  let line = useRef(null)
  const links = useRef([])
  const socials = useRef([])

  useEffect(() => {
    setNumber(cart.length)
  }, [cart])
  useEffect(() => {
    function scroll(e) {
      e.preventDefault()
      if (isOpen) {
        toggle(false)
      }
    }
    if (isOpen) {
      // opening menu
      TweenMax.to(menu, 0.5, {
        duration: 0.5,
        left: 0,
        ease: Power1.easeInOut,
      })
      // links when opening menu
      TweenMax.staggerTo(
        links.current,
        0.5,
        {
          duration: 0.5,
          opacity: 1,
          left: 0,
          ease: Power1.easeInOut,
        },
        0.1
      )
      // line when opening menu
      TweenMax.to(line, 0.5, {
        duration: 0.5,
        opacity: 1,
        height: '70px',
        ease: Power1.easeInOut,
      })
      // icons when opening menu
      TweenMax.staggerTo(
        socials.current,
        0.25,
        {
          duration: 0.5,
          opacity: 1,
          ease: Power1.easeInOut,
          top: 0,
        },
        0.1
      )
      // if menu is open, close on scroll
      window.addEventListener('scroll', scroll)
    } else {
      // closing menu
      TweenMax.to(menu, 0.5, {
        left: -300,
        ease: Power1.easeInOut,
      })
      // links when closing menu
      TweenMax.staggerTo(
        links.current,
        0.5,
        {
          opacity: 0,
          left: -25,
          ease: Power1.easeInOut,
        },
        0.2
      )
      // line when closing menu
      TweenMax.to(line, 0.5, {
        height: '1px',
        opacity: 0,
        ease: Power1.easeInOut,
      })
      // icons when closing menu
      TweenMax.staggerTo(socials.current, 0.5, {
        opacity: 0,
        top: 15,
        ease: Power1.easeInOut,
      })
    }
    return () => {
      window.removeEventListener('scroll', scroll)
    }
  }, [isOpen])
  return (
    <nav>
      {/* Top Nav */}
      <div className='container-fluid'>
        <div className='toggler' onClick={() => toggle(!isOpen)}>
          <div className='bar top-bar'></div>
          <div className='bar middle-bar'></div>
          <div className='bar bottom-bar'></div>
        </div>
        <Link to='/' className='logo'>
          <img src={logo} alt='Cap Store' />
        </Link>
        <Link to='/cart' className='cart'>
          <img src={cartIcon} alt='Cart' />
          <span>{cartNumber}</span>
        </Link>
      </div>
      {/* Menu */}
      <div ref={(el) => (menu = el)} id='menu'>
        <div className='close-menu' onClick={() => toggle(!isOpen)}>
          <img src={close} alt='Close Menu' />
        </div>
        <div className='links'>
          <Link
            ref={(el) => (links.current[0] = el)}
            onClick={() => toggle(false)}
            className={`${window.location.pathname === '/' ? 'active' : ''}`}
            to='/'
          >
            Home
          </Link>
          <Link
            ref={(el) => (links.current[1] = el)}
            onClick={() => toggle(false)}
            className={`${window.location.pathname === '/store' ? 'active' : ''}`}
            to='/store'
          >
            Store
          </Link>
          <Link
            ref={(el) => (links.current[2] = el)}
            onClick={() => toggle(false)}
            className={`${window.location.pathname === '/cart' ? 'active' : ''}`}
            to='/cart'
          >
            Cart ({cartNumber})
          </Link>
        </div>
        <div className='socials'>
          <div className='icons'>
            <a href='/' ref={(el) => (socials.current[3] = el)}>
              <i className='social fab fa-facebook-f'></i>
            </a>
            <a href='/' ref={(el) => (socials.current[2] = el)}>
              <i className='social fab fa-twitter'></i>
            </a>
            <a href='/' ref={(el) => (socials.current[1] = el)}>
              <i className='social fab fa-snapchat-ghost'></i>
            </a>
            <a href='/' ref={(el) => (socials.current[0] = el)}>
              <i className='social fab fa-instagram'></i>
            </a>
          </div>
          <div className='line' ref={(el) => (line = el)}></div>
        </div>
      </div>
    </nav>
  )
}
