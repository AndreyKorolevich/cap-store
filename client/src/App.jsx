import React, { useEffect, useState } from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { selectCart } from './features/cartManager'
import { selectResults, setBrands, setGenders } from './features/storeManager'
import { useDispatch, useSelector } from 'react-redux'
import './scss/app.scss'
import Navigation from './layout/Navigation'
import Footer from './layout/Footer'
import Home from './pages/Home'
import Store from './pages/Store'
import ShoppingCart from './pages/ShoppingCart'
import axios from 'axios'
import loadingImage from './assets/three-dots.svg'

function App() {
  const cart = useSelector(selectCart).cart
  const results = useSelector(selectResults).results
  const dispatch = useDispatch()
  const [loading, toggleLoading] = useState(true)
  const stripePromise = loadStripe('pk_test_6pRNASCoBOKtIshFeQd4XMUh')
  useEffect(() => {
    async function getBrands() {
      const results = await axios.get(`http://cap-store.herokuapp.com/api/categories`)
      return results
    }

    async function getGenders() {
      const results = await axios.get(`http://cap-store.herokuapp.com/api/gender`)
      return results
    }

    Promise.all(
      [getBrands()
        .then((res) => {
          const { status, data } = res
          if (status === 200) {
            dispatch(setBrands(data.map((brand) => ({ value: brand.id, name: brand.title }))))
          }
        })
        .catch((err) => console.error(err)),
      getGenders()
        .then((res) => {
          const { status, data } = res
          if (status === 200) {
            dispatch(setGenders(data.map((gender) => ({ value: gender.id, name: gender.title }))))
          }
        })
        .catch((err) => console.error(err)),
    ]).finally(() => toggleLoading(false))


  }, [dispatch])
  return (
    <div className='App'>
      <Navigation/>
      {loading ? (
        <div className='full-high loading'>
          <img src={loadingImage} alt='Loading Store'/>
        </div>
      ) : <Switch>
        <Route path={'/'} component={Home} exact/>
        <Route path={'/store'} render={() => <Store cart={cart} results={results}/>} exact/>
        <Route
          path={'/cart'}
          render={() => (
            <Elements stripe={stripePromise}>
              <ShoppingCart cart={cart}/>
            </Elements>
          )}
          exact
        />
        <Redirect from='/*' to='/'/>
      </Switch>}
      <Footer/>
    </div>
  )
}

export default App
