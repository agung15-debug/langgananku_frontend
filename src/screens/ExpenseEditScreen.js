import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { listExpenseDetails, updateExpense } from '../actions/expenseActions'
import { EXPENSE_UPDATE_RESET } from '../constants/expenseConstants'

const ExpenseEditScreen = ({ match, history }) => {
  const expenseId = match.params.id

  const [needDescription, setNeedDescription] = useState('')
  const [total, setTotal] = useState(0)
  const [image, setImage] = useState('')
  const [uploading, setUploading] = useState(false)

  const dispatch = useDispatch()

  const expenseDetails = useSelector((state) => state.expenseDetails)
  const { loading, error, expense } = expenseDetails

  const expenseUpdate = useSelector((state) => state.expenseUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = expenseUpdate

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: EXPENSE_UPDATE_RESET })
      history.push('/admin/expenses')
    } else {
      if (expense._id !== expenseId) {
        dispatch(listExpenseDetails(expenseId))
      } else {
        setNeedDescription(expense.needDescription)
        setTotal(expense.total)
        setImage(expense.image)
      }
    }
  }, [dispatch, history, expenseId, expense, successUpdate])

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
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      updateExpense({
        _id: expenseId,
        needDescription,
        total,
        image,
      })
    )
  }

  return (
    <>
      <Link to='/admin/expenselist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Expense</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            
            <Form.Group controlId='total'>
              <Form.Label>Total Expenses</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter total'
                value={total}
                onChange={(e) => setTotal(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='needDescription'>
              <Form.Label>Need Description</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter need description'
                value={needDescription}
                onChange={(e) => setNeedDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='image'>
              <Form.Label>Image</Form.Label>
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

export default ExpenseEditScreen
