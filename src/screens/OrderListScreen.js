import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Badge, Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listOrders } from '../actions/orderActions'

const OrderListScreen = ({ history }) => {
  const dispatch = useDispatch()

  const orderList = useSelector((state) => state.orderList)
  const { loading, error, orders } = orderList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders())
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
        orders.length != 0 ? (
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>USER</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>STATUS</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.user && order.user.name}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>{order.totalPrice} IDR</td>
                  {order.paymentResult === undefined ? (
                    <td>
                      <div className="d-flex align-items-center">
                        <Badge pill className="bg-danger" style={{ opacity: 0.9 }}>
                          <span className="text-white" style={{ fontSize: "9px" }}>UNPAID</span>
                        </Badge>
                      </div>
                    </td>
                  ) : order.paymentResult.status === 'pending' ? (
                    <td>
                      <div className="d-flex align-items-center">
                        <Badge pill className="bg-warning" style={{ opacity: 0.9 }}>
                          <span className="text-white" style={{ fontSize: "9px" }}>PENDING</span>
                        </Badge>
                      </div>
                    </td>
                  ) : order.paymentResult.status === 'processing' ? (
                    <td>
                      <div className="d-flex align-items-center">
                        <Badge pill className="bg-success  " style={{ opacity: 0.9 }}>
                          <span className="text-white" style={{ fontSize: "9px" }}>PAID</span>
                        </Badge>
                      </div>
                    </td>
                  ) : order.isDone ? (
                    <td>
                      <div className="d-flex align-items-center">
                        <Badge pill className="bg-info " style={{ opacity: 0.9 }}>
                          <span className="text-white" style={{ fontSize: "9px" }}>COMPLETED</span>
                        </Badge>
                      </div>
                    </td>
                  ) : (
                    <td>
                      <div className="d-flex align-items-center">
                        <Badge pill className="bg-dark" style={{ opacity: 0.9 }}>
                          <span className="text-white" style={{ fontSize: "9px" }}>CANCELLED</span>
                        </Badge>
                      </div>
                    </td>
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
        ) : (
          <Message variant='info'>No Orders available now. They will appear here if any.</Message>
        )
      )}
    </>
  )
}

export default OrderListScreen
