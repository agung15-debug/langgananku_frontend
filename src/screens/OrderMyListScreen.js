import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listMyOrders } from '../actions/orderActions'

const OrderMyListScreen = ({ history }) => {
  const dispatch = useDispatch()

  const orderListMy = useSelector((state) => state.orderListMy)
  const { loading, error, orders } = orderListMy

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (userInfo) {
      dispatch(listMyOrders())
    } else {
      history.push('/login')
    }
  }, [dispatch, history, userInfo])

  return (
    <>
      <h1>Orders</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped brequested hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DONE</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>{order.totalPrice} IDR</td>
                {order.isPaid &&
                  order.isDone && (
                    <td colSpan="2">
                      done at {order.doneAt.substring(0, 10)}
                    </td>
                  )}
                {order.isPaid &&
                  !order.isDone && (
                    <>
                      <td>
                        <i className='fas fa-check' style={{ color: 'green' }}></i>
                      </td>
                      <td>
                        <i className='fas fa-times' style={{ color: 'red' }}></i>
                      </td>
                    </>
                  )}
                {!order.isPaid &&
                  !order.isDone && (
                    <>
                      <td>
                        <i className='fas fa-times' style={{ color: 'red' }}></i>
                      </td>
                      <td>
                        <i className='fas fa-times' style={{ color: 'red' }}></i>
                      </td>
                    </>
                  )}
                <td>
                  <LinkContainer to={`/order/${order._id}`}>
                    <Button variant='light' className='btn-sm'>
                      Details
                    </Button>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}

export default OrderMyListScreen
