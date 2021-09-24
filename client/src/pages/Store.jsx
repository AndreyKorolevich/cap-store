import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getBrands, getGenders, setItemsCount, setStoreResults } from '../features/storeManager'
import axios from 'axios'
import loadingImage from '../assets/three-dots.svg'
import FilterBar from '../components/FilterBar'
import PaginationController from '../components/PaginationController'
import CapCard from '../components/CapCard'
import { pageOptions } from '../constant/constants'

export default function Store(props) {
  const topResults = useRef(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, toggleLoading] = useState(false)
  const [capsPerPage, setCapsPerPage] = useState(pageOptions[0])
  const dispatch = useDispatch()
  const brands = useSelector(getBrands)
  const genders = useSelector(getGenders)
  const [chosenPrice, setChosenPrice] = useState(0)
  const [chosenBrand, setChosenBrand] = useState(brands[0])
  const [chosenGender, setChosenGender] = useState(genders[0])

  const query = () => {
    const brand = chosenBrand.name !== 'All' ? `brand=${chosenBrand.value}&` : ''
    const gender = chosenGender.name !== 'All' ? `gender=${chosenGender.value}&` : ''
    const price = chosenPrice !== 0 ? `price=${chosenPrice}&` : ''
    const page = currentPage > 1 ? `page=${currentPage - 1}&` : ''
    const countOnPage = `countOnPage=${capsPerPage}`

    return brand + gender + price + page+ countOnPage
  }

  const { cart, results } = props

  const handlePrice = (e) => {
    setChosenPrice(e.target.value)
  }

  const handleBrand = (e) => {
    setChosenBrand({ name: e.target.name, value: e.target.value })
  }

  const handleGender = (e) => {
    setChosenGender({ name: e.target.name, value: e.target.value })
  }

  useEffect(() => {
    async function getData() {
      const results = await axios.get(
        `https://cap-store.herokuapp.com/api/items?${query()}`,
      )
      return results
    }

    toggleLoading(true)
    getData()
      .then((res) => {
        const { status, data } = res
        if (status === 200) {
          dispatch(setStoreResults(data.paginated))
          dispatch(setItemsCount(data.itemsCount))
        }
      })
      .then(() => setTimeout(() => toggleLoading(false), 1500))
      .catch((err) => console.error(err))
  }, [currentPage, capsPerPage, dispatch, currentPage, capsPerPage])

  useEffect(() => {
    async function getMaxPrice() {
      const results = await axios.get(`https://cap-store.herokuapp.com/api/maxprice`)
      return results
    }

    getMaxPrice()
      .then((res) => {
        const { status, data } = res
        if (status === 200) {
          setChosenPrice(data.maxPrice)
        }
      })
      .catch((err) => console.error(err))
  }, [])

  const scrollToResults = () => {
    document.getElementById('results').scrollIntoView({ behavior: 'smooth' })
  }

  const searchStore = async () => {
    const results = await axios.get(`https://cap-store.herokuapp.com/api/items?${query()}`)
    return results
  }

  const submitSearch = () => {
    toggleLoading(true)

    searchStore()
      .then((res) => {
        const { status, data } = res
        if (status === 200) {
          setCurrentPage(1)
          dispatch(setStoreResults(data.paginated))
          dispatch(setItemsCount(data.itemsCount))
        }
      })
      .then(() => setTimeout(toggleLoading(false), 1500))
      .catch((err) => console.error(err))
  }

  return (
    <div id='store'>
      <FilterBar
        submitSearch={submitSearch}
        chosenPrice={chosenPrice}
        chosenBrand={chosenBrand}
        chosenGender={chosenGender}
        handlePrice={handlePrice}
        handleBrand={handleBrand}
        handleGender={handleGender}
      />
      <div id='results' className='items d-flex flex-row justify-content-center'>
        {loading ? (
          <div className='loading'>
            <img src={loadingImage} alt='Loading Store'/>
          </div>
        ) : (
          results.map((cap) => {
            const itemInCart = cart.filter((c) => c.id === cap.id)[0]
            const isInCart = itemInCart !== undefined
            return <CapCard inCart={isInCart} key={cap.id} cap={cap}/>
          })
        )}
      </div>
      <PaginationController
        scrollToResults={scrollToResults}
        topResults={topResults}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        capsPerPage={capsPerPage}
        setCapsPerPage={setCapsPerPage}
      />
    </div>
  )
}
