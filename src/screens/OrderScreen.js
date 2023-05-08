import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { PayPalButton } from 'react-paypal-button-v2'
import { Link } from 'react-router-dom'
import { Alert, Modal, Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {
  getOrderDetails,
  payOrder,
  confirmPayOrder,
  doneOrder,
} from '../actions/orderActions'
import {
  ORDER_PAY_RESET,
  ORDER_DONE_RESET,
  CONFIRM_ORDER_PAY_RESET,
} from '../constants/orderConstants'

const OrderScreen = ({ match, history }) => {
  const orderId = match.params.id

  const dispatch = useDispatch()

  const base_url = "http://localhost:5000"

  const orderDetails = useSelector((state) => state.orderDetails)
  const { order, loading, error } = orderDetails

  const orderPay = useSelector((state) => state.orderPay)
  const { loading: loadingPay, success: successPay } = orderPay

  const confirmOrderPay = useSelector((state) => state.confirmOrderPay)
  const { loading: loadingConfirmPay, success: successConfirmPay } = confirmOrderPay

  const orderDone = useSelector((state) => state.orderDone)
  const { loading: loadingDone, success: successDone } = orderDone

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  if (!loading) {

    order.itemsPrice = Math.floor(
      order.orderItems.reduce(
        (acc, item) =>
          acc + (item.qty > item.discountThreshold ? item.qty * item.groceryPrice : item.qty * item.sellingPrice),
        0
      )
    )

    // this use var, should change immediately
    var totalBeforeDiscount = Math.floor(
      order.orderItems.reduce(
        (acc, item) =>
          acc + (item.qty * item.sellingPrice),
        0
      )
    )

    // this use var, should change immediately
    var totalDiscount = Math.floor(
      totalBeforeDiscount - order.itemsPrice
    )

  }

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    }

    if (!order || successPay || successConfirmPay || successDone || order._id !== orderId) {
      dispatch({ type: ORDER_PAY_RESET })
      dispatch({ type: CONFIRM_ORDER_PAY_RESET })
      dispatch({ type: ORDER_DONE_RESET })
      dispatch(getOrderDetails(orderId))
    }
  }, [dispatch, orderId, successPay, successConfirmPay, successDone, order])

  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult)
    dispatch(payOrder(orderId, paymentResult))
  }

  const payClick = () => {
    history.push(`/payorder/${order._id}`)
  }

  const confirmPayHandler = () => {
    dispatch(confirmPayOrder(order))
  }

  const doneHandler = () => {
    dispatch(doneOrder(order))
  }

  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <>
      {loadingPay && <Loader />}
      {loadingConfirmPay && <Loader />}
      <h1>Order {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Detail</h2>
              <p>
                <strong>Name: </strong> {order.user.name}
              </p>
              <p>
                <strong>Email: </strong>{' '}
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
              <p>
                <strong>Phone: </strong>{' '}
                <a href={`https://wa.me/${order.user.phone}`}>{order.user.phone}</a>
              </p>
              <p>
                <strong>Pickup Date :</strong>
                {' '}{new Date(order.pickupNote.date).toISOString().slice(0, 10)}
              </p>
              <p>
                <strong>Note :</strong>
                {' '}{order.pickupNote.note}
              </p>
              {order.isDone ? (
                <Message variant='success'>
                  Done on {order.doneAt}
                </Message>
              ) : (
                <Message variant='danger'>Not Done</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant='success'>Paid on {order.paidAt}</Message>
              ) : order.paymentResult === undefined ? (
                <Message variant='danger'>Not Paid</Message>
              ) : userInfo.isAdmin && order.paymentResult.status === 'pending' ? (
                <Message variant='info'>Payment verification is required</Message>
              ) : userInfo.isAdmin && order.paymentResult.status === 'processing' ? (
                <button type='button' className='btn btn-primary' onClick={confirmPayHandler}>Payment is processing</button>
              ) : order.paymentResult.status === 'pending' ? (
                <Message variant='info'>We are currently verifying your payment</Message>
              ) : (
                <Message variant='danger'>Not Paid</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <Message>Order is empty</Message>
              ) : (
                <ListGroup variant='flush'>
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row className="d-flex align-items-center justify-content-center">
                        <Col md={1}>
                          {item.image.includes('http') ? (
                            <Image
                              src={item.image}
                              alt={item.name}
                              fluid
                              rounded
                            />
                          ) : (
                            <Image
                              src={`${base_url}${item.image}`}
                              alt={item.name}
                              fluid
                              rounded
                            />
                          )}
                        </Col>
                        <Col md={4}>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={2} style={{ textAlign: 'right' }}>
                          {item.qty} x
                        </Col>
                        <Col md={2} style={{ textAlign: 'right' }}>
                          <div style={{ display: 'flex', flexDirection: 'column' }}>
                            {item.qty > item.discountThreshold ? (
                              <>
                                <div className='cart-price-strikethrough'>{item.sellingPrice} IDR</div>
                                <div>{item.groceryPrice} IDR</div>
                              </>
                            ) : (
                              <div>{item.sellingPrice} IDR</div>
                            )}
                          </div>
                        </Col>
                        <Col>
                          {item.qty > item.discountThreshold ? (
                            <>
                              = {Math.floor(item.qty * (item.groceryPrice))} IDR
                            </>
                          ) : (
                            <>
                              = {Math.floor(item.qty * item.sellingPrice)} IDR
                            </>
                          )}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>{totalBeforeDiscount} IDR</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Discount</Col>
                  {totalDiscount != 0 ? (
                    <Col style={{ color: 'red' }}>-{totalDiscount} IDR</Col>
                  ) : (
                    <Col>0 IDR</Col>
                  )}
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>{order.totalPrice} IDR</Col>
                </Row>
              </ListGroup.Item>
              {!order.isPaid && (
                <ListGroup.Item style={{ textAlign: 'center' }}>
                  {userInfo.isAdmin && order.paymentResult && order.paymentResult.status === 'pending' ? (
                    <>
                      <Card.Link onClick={handleShowModal}>
                        {order.paymentResult.proof.includes('http') ? (
                          <Card.Img src={order.paymentResult.proof} variant='top' style={{ objectFit: 'contain', width: '100%', height: '300px' }} />
                        ) : (
                          <Card.Img src={`${base_url}${order.paymentResult.proof}`} variant='top' style={{ objectFit: 'contain', width: '100%', height: '300px' }} />
                        )}
                      </Card.Link>
                      <Modal show={showModal} onHide={handleCloseModal} size="xl">
                        <Modal.Body style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                          {order.paymentResult.proof.includes('http') ? (
                            <img
                              src={order.paymentResult.proof}
                              alt='Full Image'
                              style={{
                                maxWidth: '100%',
                                maxHeight: '100%'
                              }}
                            />
                          ) : (
                            <img
                              src={`${base_url}${order.paymentResult.proof}`}
                              alt='Full Image'
                              style={{
                                maxWidth: '100%',
                                maxHeight: '100%'
                              }}
                            />
                          )}
                        </Modal.Body>
                      </Modal>
                      <button type='button' className='btn btn-primary' onClick={confirmPayHandler}>Confirm Payment</button>
                    </>
                  ) : userInfo.isAdmin && !order.paymentResult ? (
                    <Message variant='danger'>No activity has been recorded on this order. As an admin, you can pay for this order by clicking{' '}
                      <Alert.Link onClick={payClick}>here</Alert.Link>
                      .
                    </Message>
                  ) : (
                    userInfo && order.paymentResult && order.paymentResult.status === 'pending' && (
                      <Message variant='info'>Pending</Message>
                    )
                  )}
                  {!userInfo.isAdmin && !order.paymentResult && (
                    <Button
                      variant="primary"
                      onClick={payClick}
                      style={{ marginLeft: 'auto', marginRight: 'auto', display: 'block', width: '100%' }}
                    >
                      Pay Now
                    </Button>
                  )}
                </ListGroup.Item>
              )}
              {!userInfo.isAdmin && order.isPaid && !order.isDone && (
                <ListGroup.Item style={{ textAlign: 'center' }}>
                  <Message variant='info'>Order in Processing</Message>
                </ListGroup.Item>
              )}
              {loadingDone && <Loader />}
              {userInfo &&
                userInfo.isAdmin &&
                order.isPaid &&
                !order.isDone && (
                  <ListGroup.Item>
                    <Button
                      type='button'
                      className='btn btn-block'
                      onClick={doneHandler}
                    >
                      Mark As Done
                    </Button>
                  </ListGroup.Item>
                )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default OrderScreen
