import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import {
  listSuppliers,
  deleteSupplier,
  createSupplier,
} from '../actions/supplierActions'
import { SUPPLIER_CREATE_RESET } from '../constants/supplierConstants'

const SupplierListScreen = ({ history, match }) => {
  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch()

  const supplierList = useSelector((state) => state.supplierList)
  const { loading, error, suppliers, page, pages } = supplierList

  const supplierDelete = useSelector((state) => state.supplierDelete)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = supplierDelete

  const supplierCreate = useSelector((state) => state.supplierCreate)
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    supplier: createdSupplier,
  } = supplierCreate

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    dispatch({ type: SUPPLIER_CREATE_RESET })

    if (!userInfo || !userInfo.isAdmin) {
      history.push('/login')
    }

    if (successCreate) {
      history.push(`/admin/supplier/${createdSupplier._id}/edit`)
    } else {
      dispatch(listSuppliers('', pageNumber))
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    createdSupplier,
    pageNumber,
  ])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteSupplier(id))
    }
  }

  const createSupplierHandler = () => {
    dispatch(createSupplier())
  }

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Suppliers</h1>
        </Col>
        <Col className='text-right'>
          <Button className='my-3' onClick={createSupplierHandler}>
            <i className='fas fa-plus'></i> Add Supplier
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        suppliers.length != 0 ? (
          <>
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>NAME</th>
                <th>ADDRESS</th>
                <th>CITY</th>
                <th>PHONE</th>
                <th>EMAIL</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {suppliers.map((supplier) => (
                <tr key={supplier._id}>
                  <td>{supplier.name}</td>
                  <td>{supplier.address}</td>
                  <td>{supplier.city}</td>
                  <td>
                    <a href={`https://wa.me/${supplier.phone}`}>{supplier.phone}</a>
                  </td>
                  <td>
                    <a href={`mailto:${supplier.email}`}>{supplier.email}</a>
                  </td>
                  <td>
                    <LinkContainer to={`/admin/supplier/${supplier._id}/edit`}>
                      <Button variant='light' className='btn-sm'>
                        <i className='fas fa-edit'></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => deleteHandler(supplier._id)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate pages={pages} page={page} name={"supplierlist"} isAdmin={true} />
        </>
        ) : (
          <Message variant='info'>Currently, there is no Supplier data available. You can add Supplier data to see it appear here.</Message>
        )
      )}
    </>
  )
}

export default SupplierListScreen
