import React from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap'

export default function Footer() {
  return (
    <footer>
      <Row>
        <Col xs={12} sm={6} md={3}>
          <ul className='footer-company'>
            <h6>Company</h6>
            <li>Cap Store</li>
            <li>2332 Green Ave</li>
            <li>12333 New York, NY</li>
            <li>Phone: +1 234 432 2344</li>
            <li>
              <i className='fa fa-envelope' aria-hidden='true'></i>
              <a href='/'>info@capstore.com</a>
            </li>
          </ul>
        </Col>
        <Col xs={12} sm={6} md={3}>
          <ul className='footer-sitemap'>
            <h6>Sitemap</h6>
            <li>
              <Link className='text-primary' to='/'>
                Home
              </Link>
            </li>
            <li>
              <Link className='text-primary' to='/store'>
                Store
              </Link>
            </li>
            <li>
              <Link className='text-primary' to='/cart'>
                Cart
              </Link>
            </li>
          </ul>
        </Col>
        <Col xs={12} sm={6} md={3}>
          <ul className='footer-social'>
            <h6>Social</h6>
            <a href='/'>
              <i className='social fab fa-facebook-f'></i>
            </a>
            <a href='/'>
              <i className='social fab fa-twitter'></i>
            </a>
            <a href='/'>
              <i className='social fab fa-snapchat-ghost'></i>
            </a>
            <a href='/'>
              <i className='social fab fa-instagram'></i>
            </a>
          </ul>
        </Col>
        <Col xs={12} sm={6} md={3}>
          <h6>Search</h6>
          <InputGroup>
            <Input />
            <InputGroupAddon addonType='append'>
              <InputGroupText>
                <i className='fas fa-search' />
              </InputGroupText>
            </InputGroupAddon>
          </InputGroup>
        </Col>
      </Row>
      <Row className='copyright'>
        <Col className='text-center bottom'>© 2021 Cap Store All Rights Reserved</Col>
      </Row>
    </footer>
  )
}
