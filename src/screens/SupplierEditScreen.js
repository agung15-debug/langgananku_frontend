import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { listSupplierDetails, updateSupplier } from '../actions/supplierActions'
import { SUPPLIER_UPDATE_RESET } from '../constants/supplierConstants'

const SupplierEditScreen = ({ match, history }) => {
  const supplierId = match.params.id

  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')

  const dispatch = useDispatch()

  const supplierDetails = useSelector((state) => state.supplierDetails)
  const { loading, error, supplier } = supplierDetails

  const supplierUpdate = useSelector((state) => state.supplierUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = supplierUpdate

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: SUPPLIER_UPDATE_RESET })
      history.push('/admin/supplierlist')
    } else {
      if (!supplier.name || supplier._id !== supplierId) {
        dispatch(listSupplierDetails(supplierId))
      } else {
        setName(supplier.name)
        setAddress(supplier.address)
        setCity(supplier.city)
        setPhone(supplier.phone)
        setEmail(supplier.email)
      }
    }
  }, [dispatch, history, supplierId, supplier, successUpdate])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      updateSupplier({
        _id: supplierId,
        name,
        address,
        city,
        phone,
        email,
      })
    )
  }

  return (
    <>
      <Link to='/admin/supplierlist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Supplier</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='address'>
              <Form.Label>Address</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter address'
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='city'>
              <Form.Label>City</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter city'
                value={city}
                onChange={(e) => setCity(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='phone'>
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter phone start with code country (ex: 62812345678)'
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='email'>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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

export default SupplierEditScreen
