import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { listBankAccountDetails, updateBankAccount } from '../actions/bankAccountActions'
import { BANK_ACCOUNT_UPDATE_RESET } from '../constants/bankAccountConstants'

const BankAccountQrisEditScreen = ({ match, history }) => {
  const bankAccountId = match.params.id

  const [isQris, setIsQris] = useState(false)
  const [image, setImage] = useState('')
  const [uploading, setUploading] = useState(false)

  const dispatch = useDispatch()

  const bankAccountDetails = useSelector((state) => state.bankAccountDetails)
  const { loading, error, bankAccount } = bankAccountDetails

  const bankAccountUpdate = useSelector((state) => state.bankAccountUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = bankAccountUpdate

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: BANK_ACCOUNT_UPDATE_RESET })
      history.push('/admin/bankAccounts')
    } else {
      if (bankAccount._id !== bankAccountId) {
        dispatch(listBankAccountDetails(bankAccountId))
      } else {
        setIsQris(bankAccount.isQris)
        setImage(bankAccount.image)
      }
    }
  }, [dispatch, history, bankAccountId, bankAccount, successUpdate])

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setIsQris(true)
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
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      updateBankAccount({
        _id: bankAccountId,
        isQris,
        image,
      })
    )
  }

  return (
    <>
      <Link to='/admin/bankAccounts' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Bank Account</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>

            <Form.Group controlId='image'>
              <Form.Label>QRIS Image</Form.Label>
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
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default BankAccountQrisEditScreen
