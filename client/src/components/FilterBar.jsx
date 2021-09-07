import React from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap'
import { useSelector } from 'react-redux'
import { getBrands, getGenders } from '../features/storeManager'

export default function FilterBar({
  submitSearch,
  chosenBrand,
  chosenGender,
  chosenPrice,
  handlePrice,
  handleGender,
  handleBrand,
}) {
  const brands = useSelector(getBrands)
  const genders = useSelector(getGenders)

  const handleSubmit = (e) => {
    e.preventDefault()
    submitSearch()
  }

  return (
    <div id='filter-bar'>
      <Form onSubmit={handleSubmit} className='container'>
        <div className='price filter'>
          <FormGroup>
            <Label htmlFor='priceSelect'>Price</Label>
            <input
              id='priceSelect'
              onChange={handlePrice}
              name='chosen_price'
              type='range'
              min='50'
              max='500'
              value={chosenPrice}
            />
            <p>
              $
              {chosenPrice >= 500
                ? chosenPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                : chosenPrice}
            </p>
          </FormGroup>
        </div>
        <div className='brand filter'>
          <FormGroup>
            <Label htmlFor='brandSelect'>Brand</Label>
            <Input onChange={handleBrand} value={chosenBrand.value} type='select' id='brandSelect'>
              {brands.map((brand) => (
                <option key={brand.name} value={brand.value} name={brand.name}>
                  {brand.name}
                </option>
              ))}
            </Input>
          </FormGroup>
        </div>
        <div className='gender filter'>
          <FormGroup>
            <Label htmlFor='genderSelect'>Gender</Label>
            <Input onChange={handleGender} value={chosenGender.value} type='select' id='genderSelect'>
              {genders.map((gender) => (
                <option key={gender.name} value={gender.value} name={gender.name}>
                  {gender.name}
                </option>
              ))}
            </Input>
          </FormGroup>
        </div>
        <div className='submit filter'>
          <FormGroup>
            <Button>Search</Button>
          </FormGroup>
        </div>
      </Form>
    </div>
  )
}
