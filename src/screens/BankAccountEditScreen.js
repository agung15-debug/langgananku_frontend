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

const BankAccountEditScreen = ({ match, history }) => {
  const bankAccountId = match.params.id

  const [bankName, setBankName] = useState('')
  const [holderName, setHolderName] = useState('')
  const [accountNumber, setAccountNumber] = useState('')
  const [isQris, setIsQris] = useState(false)

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
        setBankName(bankAccount.bankName)
        setHolderName(bankAccount.holderName)
        setAccountNumber(bankAccount.accountNumber)
        setIsQris(bankAccount.isQris)
      }
    }
  }, [dispatch, history, bankAccountId, bankAccount, successUpdate])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      updateBankAccount({
        _id: bankAccountId,
        bankName,
        holderName,
        accountNumber,
        isQris,
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
            
            <Form.Group controlId='bankName'>
              <Form.Label>Bank Name</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter bank Name'
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='holderName'>
              <Form.Label>Holder Name</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter holder name'
                value={holderName}
                onChange={(e) => setHolderName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='accountNumber'>
              <Form.Label>Account Number</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter account number'
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
              ></Form.Control>
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

export default BankAccountEditScreen
