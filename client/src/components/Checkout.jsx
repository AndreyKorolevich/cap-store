import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { emptyCart } from '../features/cartManager'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'

const cardOptions = {
  style: {
    base: {
      color: 'black',
      fontWeight: 400,
      fontFamily: 'Helvetica Neue',
      fontSize: '16px',
      textTransform: 'capitalize',
      ':-webkit-autofill': {
        color: '#fce883',
      },
      '::placeholder': {
        color: 'grey',
      },
    },
    invalid: {
      iconColor: '#ff4019',
      color: '#ff4019',
    },
  },
}
const CardField = ({ onChange }) => (
  <div className='FormRow'>
    <CardElement options={cardOptions} onChange={onChange} />
  </div>
)
const Field = ({ label, id, type, placeholder, required, autoComplete, value, onChange }) => (
  <div className='FormRow'>
    <label htmlFor={id} className='FormRowLabel'>
      {label}
    </label>
    <input
      className='FormRowInput'
      id={id}
      type={type}
      placeholder={placeholder}
      required={required}
      autoComplete={autoComplete}
      value={value}
      onChange={onChange}
    />
  </div>
)
const SubmitButton = ({ processing, error, children, disabled }) => (
  <button
    className={`SubmitButton ${error ? 'SubmitButton--error' : ''}`}
    type='submit'
    disabled={processing || disabled}
  >
    {processing ? 'Processing...' : children}
  </button>
)
const ErrorMessage = ({ children }) => (
  <div className='ErrorMessage' role='alert'>
    <svg width='16' height='16' viewBox='0 0 17 17'>
      <path
        fill='#FFF'
        d='M8.5,17 C3.80557963,17 0,13.1944204 0,8.5 C0,3.80557963 3.80557963,0 8.5,0 C13.1944204,0 17,3.80557963 17,8.5 C17,13.1944204 13.1944204,17 8.5,17 Z'
      />
      <path
        fill='#ff4019'
        d='M8.5,7.29791847 L6.12604076,4.92395924 C5.79409512,4.59201359 5.25590488,4.59201359 4.92395924,4.92395924 C4.59201359,5.25590488 4.59201359,5.79409512 4.92395924,6.12604076 L7.29791847,8.5 L4.92395924,10.8739592 C4.59201359,11.2059049 4.59201359,11.7440951 4.92395924,12.0760408 C5.25590488,12.4079864 5.79409512,12.4079864 6.12604076,12.0760408 L8.5,9.70208153 L10.8739592,12.0760408 C11.2059049,12.4079864 11.7440951,12.4079864 12.0760408,12.0760408 C12.4079864,11.7440951 12.4079864,11.2059049 12.0760408,10.8739592 L9.70208153,8.5 L12.0760408,6.12604076 C12.4079864,5.79409512 12.4079864,5.25590488 12.0760408,4.92395924 C11.7440951,4.59201359 11.2059049,4.59201359 10.8739592,4.92395924 L8.5,7.29791847 L8.5,7.29791847 Z'
      />
    </svg>
    {children}
  </div>
)

export default function CheckoutForm({ subtotal }) {
  const stripe = useStripe()
  const elements = useElements()
  const dispatch = useDispatch()
  const [error, setError] = useState(null)
  const [cardComplete, setCardComplete] = useState(false)
  const [processing, setProcessing] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState(null)
  const [billingDetails, setBillingDetails] = useState({
    email: '',
    phone: '',
    name: '',
  })

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (error) {
      elements.getElement('card').focus()
      return
    }
    if (cardComplete) {
      setProcessing(true)
    }
    const payload = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
      billing_details: billingDetails,
    })
    setProcessing(false)
    if (payload.error) {
      setError(payload.error)
    } else {
      setPaymentMethod(payload.paymentMethod)
      dispatch(emptyCart())
    }
  }
  return paymentMethod ? (
    <div className='Result'>
      <div className='ResultTitle' role='alert'>
        Payment Successful
      </div>
      <div className='ResultMessage'>
        Thanks for using Cap Store, no money was actually charged :) <br />
        {/* {paymentMethod.id} */}
      </div>
    </div>
  ) : (
    <div className='checkout'>
      <h1>Checkout</h1>
      <form onSubmit={handleSubmit}>
        <fieldset className='FormGroup'>
          <Field
            label='Name'
            id='name'
            type='text'
            placeholder='John Doe'
            required
            autoComplete='name'
            value={billingDetails.name}
            onChange={(e) => setBillingDetails({ ...billingDetails, name: e.target.value })}
          />
          <Field
            label='Email'
            id='email'
            type='email'
            placeholder='johndoe@email.com'
            required
            autoComplete='email'
            value={billingDetails.email}
            onChange={(e) => setBillingDetails({ ...billingDetails, email: e.target.value })}
          />
          <Field
            label='Phone'
            id='phone'
            type='tel'
            placeholder='(123) 456-7890'
            required
            autoComplete='tel'
            value={billingDetails.phone}
            onChange={(e) => setBillingDetails({ ...billingDetails, phone: e.target.value })}
          />
        </fieldset>
        <fieldset className='FormGroup'>
          <CardField
            onChange={(e) => {
              setError(e.error)
              setCardComplete(e.complete)
            }}
          />
        </fieldset>
        {error && <ErrorMessage>{error.message}</ErrorMessage>}
        <SubmitButton processing={processing} error={error} disabled={subtotal <= 0}>
          Pay ${subtotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
        </SubmitButton>
      </form>
    </div>
  )
}
