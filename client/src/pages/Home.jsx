import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { FormGroup, Input, Button } from 'reactstrap'
import {Power1, Power3, Linear, gsap } from 'gsap'

import capImage from '../assets/cap.png'
import nike from '../assets/nike.svg'
import adidas from '../assets/adidas.svg'
import jordan from '../assets/jordan.svg'
import vans from '../assets/vans.svg'

export default function Home() {
  let left = useRef(null)
  let right = useRef(null)
  let svg = useRef(null)
  let img = useRef(null)
  const colors = ['#00afff', '#3668ed', '#f2262d', '#F96D23']
  const brands = [
    {
      name: 'Adidas',
      logo: adidas,
    },
    {
      name: 'Jordan',
      logo: jordan,
    },
    {
      name: 'Nike',
      logo: nike,
    },
    {
      name: 'Vans',
      logo: vans,
    },
  ]
  useEffect(() => {
    gsap.to(left,  {
      duration: 1,
      width: '50%',
      ease: Power1.easeInOut,
    })
    gsap.to(right,  {
      duration: 1,
      width: '50%',
      ease: Power1.easeInOut,
    })
    gsap.delayedCall(1, () => {
      gsap.to(svg, {
        duration: 0.5,
        strokeDashoffset: '0',
        ease: Linear.easeNone,
      })
    })
    gsap.delayedCall(1.5, () => {
      gsap.to(img, {
        duration: 1,
        opacity: 1,
        ease: Power1.easeIn,
      })
      gsap.to(img, {
        duration: 1,
        transform: 'rotate(0deg)',
        ease: Power3.easeInOut,
      })
    })
  }, [])
  return (
    <div id='home'>
      <div>
        <div className='hero container-fluid'>
          <div ref={(el) => (left = el)} className='hero-left'/>
          <Link to='/store' className='hero-middle'>
            <svg viewBox='0 0 110 110'>
              <circle cx='50%' cy='50%' r='50' className='fill'/>
              <circle cx='50%' cy='50%' r='50' className='progress' ref={(el) => (svg = el)}/>
            </svg>
            <img ref={(el) => (img = el)} src={capImage} alt='Welcome to Cap Store' />
          </Link>
          <div ref={(el) => (right = el)} className='hero-right'/>
        </div>

        <section className='about container-fluid'>
          <div className='about-row color'>
            <div className='left'>
              <h1>
                Choose Your <br /> Style
              </h1>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
                sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
                est laborum. Scripta periculis ei eam, te pro movet reformidans.
              </p>
              <Button color='primary'>More About Colors</Button>
            </div>
            <div className='right grid'>
              {colors.map((c, i) => {
                return <div key={i} className='c' style={{ background: c }}/>
              })}
            </div>
          </div>

          <div className='about-row brand'>
            <div className='right'>
              <h1>
                Choose Your <br /> Brand
              </h1>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
                sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
                est laborum. Scripta periculis ei eam, te pro movet reformidans.
              </p>
              <Button color='primary'>More About Brands</Button>
            </div>
            <div className='left grid'>
              {brands.map((b, i) => {
                return <div key={i} className='b' style={{ backgroundImage: `url('${b.logo}')` }}/>
              })}
            </div>
          </div>
        </section>

        <section className='socials container-fluid'>
          <h1>Follow Us</h1>
          <div className='social-boxes'>
            <div className='box'>
              <div className='box-inner'>
                <h2>Facebook</h2>
                <a href='/'>
                  Follow<i className='fas fa-circle'/>
                  <i className='fab fa-facebook-f'/>
                </a>
              </div>
            </div>
            <div className='box'>
              <div className='box-inner'>
                <h2>Youtube</h2>
                <a href='/'>
                  Follow<i className='fas fa-circle'/>
                  <i className='fab fa-youtube'/>
                </a>
              </div>
            </div>
            <div className='box'>
              <div className='box-inner'>
                <h2>Twitter</h2>
                <a href='/'>
                  Follow<i className='fas fa-circle'/>
                  <i className='fab fa-twitter'/>
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className='newsletter container-fluid'>
          <form>
            <h1>Subscribe To Our Newsletter</h1>
            <FormGroup>
              <Input type='text' placeholder='E-mail Address...' />
              <Button color='primary'>Subscribe</Button>
            </FormGroup>
          </form>
        </section>
      </div>
    </div>
  )
}
