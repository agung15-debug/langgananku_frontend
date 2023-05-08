import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Alert, Form, Button, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { payOrder } from '../actions/orderActions'
import FormContainer from '../components/FormContainer'
import { ORDER_PAY_RESET } from '../constants/orderConstants'
import { listBankAccounts } from '../actions/bankAccountActions'
import { BANK_ACCOUNT_CREATE_RESET } from '../constants/bankAccountConstants'


const PayScreen = ({ match, history }) => {
  const orderId = match.params.id

  const dispatch = useDispatch()

  const base_url = "http://localhost:5000"

  const [image, setImage] = useState('')
  const [status, setStatus] = useState('unpaid')
  const [uploading, setUploading] = useState(false)
  const [show, setShow] = useState(true);

  const orderDetails = useSelector((state) => state.orderDetails)
  const { order, loading, error } = orderDetails

  const bankAccountList = useSelector((state) => state.bankAccountList)
  const { loadingAccount, errorAccount, bankAccounts, page, pages } = bankAccountList

  let count = 0

  const orderPay = useSelector((state) => state.orderPay)
  const {
    loading: loadingPay,
    error: errorPay,
    success: successPay,
  } = orderPay

  useEffect(() => {
    dispatch({ type: BANK_ACCOUNT_CREATE_RESET })

    if (successPay) {
      dispatch({ type: ORDER_PAY_RESET })
      history.push('/')
    } else {
      dispatch(listBankAccounts('', 1))
    }
  }, [dispatch, history, successPay])

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }

      const { data } = await axios.post('/api/upload', formData, config)

      setImage(data)
      setUploading(false)
      setStatus('pending')
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      payOrder(orderId, {
        status: status,
        email_address: order.user.email,
        phone: order.user.phone,
        proof: image,
      })
    )
  }

  return (
    <>
      <Link to={`/order/${order._id}`} className='btn btn-light my-3'>
        Go Back
      </Link>
      {loadingPay && <Loader />}
      {errorPay && <Message variant='danger'>{errorPay}</Message>}
      <FormContainer>
        <h1>Upload proof of payment</h1>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Alert variant="info" onClose={() => setShow(false)} dismissible style={{ margin: '20px' }}>
              <Alert.Heading>{order.paymentMethod}</Alert.Heading>
              <hr />
              {order.paymentMethod === 'QRIS' ? (
                <>
                  <p style={{ textAlign: 'justify', textJustify: 'inter-word' }}>
                    You have chosen to pay via QRIS. Please scan the following barcode using your payment application and enter the amount of {order.totalPrice} IDR.
                  </p>
                  {bankAccounts.map((bankAccount) => {
                    if (bankAccount.isQris) {
                      return (
                        <div style={{ position: 'relative', width: '400px', height: '100%', overflow: 'hidden' }}>
                          {bankAccount.image.includes('http') ? (
                            <Image
                              src={bankAccount.image}
                              style={{ maxHeight: '100%', maxWidth: '100%', cursor: 'pointer' }}
                            />
                          ) : (
                            <Image
                              src={`${base_url}${bankAccount.image}`}
                              style={{ maxHeight: '100%', maxWidth: '100%', cursor: 'pointer' }}
                            />
                          )}
                        </div>
                      );
                    }
                    return null;
                  })}
                </>
              ) : (
                <p style={{ textAlign: 'justify', textJustify: 'inter-word' }}>
                  Thank you for choosing the bank transfer method for your payment. To proceed, please transfer the amount of {order.totalPrice} IDR to one of the following account options:
                  <br />
                  {bankAccounts.map((bankAccount) => {
                    if (!bankAccount.isQris) {
                      count++
                      return (
                        <React.Fragment key={bankAccount._id}>
                          <br />
                          {count}. Bank {bankAccount.bankName}, {bankAccount.accountNumber} name of {bankAccount.holderName}.
                        </React.Fragment>
                      );
                    }
                    return null;
                  })}
                </p>
              )}
            </Alert>
            <Form.Group controlId='proof'>
              <Form.Label>Proof</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter image url'
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
              <Form.File
                id='image-file'
                label='Choose File'
                custom
                onChange={uploadFileHandler}
              ></Form.File>
              {uploading && <Loader />}
            </Form.Group>

            <Button type='submit' variant='primary'>
              Submit
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default PayScreen
