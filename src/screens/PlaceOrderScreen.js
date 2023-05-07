import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import CheckoutSteps from '../components/CheckoutSteps'
import { createOrder } from '../actions/orderActions'
import { ORDER_CREATE_RESET } from '../constants/orderConstants'
import { USER_DETAILS_RESET } from '../constants/userConstants'

const PlaceOrderScreen = ({ history }) => {
  const dispatch = useDispatch()

  const cart = useSelector((state) => state.cart)

  if (!cart.pickupNote.date) {
    history.push('/shipping')
  } else if (!cart.paymentMethod) {
    history.push('/payment')
  }
  //   Calculate prices
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2)
  }

  cart.itemsPrice = Math.floor(
    cart.cartItems.reduce(
      (acc, item) =>
        acc + (item.qty > item.discountThreshold ? item.qty * item.groceryPrice : item.qty * item.sellingPrice),
      0
    )
  )

  const totalBeforeDiscount = Math.floor(
    cart.cartItems.reduce(
      (acc, item) =>
        acc + (item.qty * item.sellingPrice),
      0
    )
  )

  const totalProfit = Math.floor(
    cart.cartItems.reduce(
      (acc, item) =>
        acc + (item.qty > item.discountThreshold ? item.qty * ( item.groceryPrice - item.basePrice ) : item.qty * ( item.sellingPrice - item.basePrice )),
      0
    )
  )

  const totalDiscount = Math.floor(
    totalBeforeDiscount - cart.itemsPrice
  )

  cart.totalPrice = Math.floor(
    Number(cart.itemsPrice)
  )

  const orderCreate = useSelector((state) => state.orderCreate)
  const { order, success, error } = orderCreate

  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`)
      dispatch({ type: USER_DETAILS_RESET })
      dispatch({ type: ORDER_CREATE_RESET })
    }
    // eslint-disable-next-line
  }, [history, success])

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        pickupNote: cart.pickupNote,
        paymentMethod: cart.paymentMethod,
        discountPrice: totalDiscount,
        totalPrice: cart.totalPrice,
        totalProfit: totalProfit,
      })
    )
  }

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Pickup</h2>
              <p>
                <strong>Pickup Date :</strong>
                {' '}{cart.pickupNote.date}
              </p>
              <p>
                <strong>Note :</strong>
                {' '}{cart.pickupNote.note}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <strong>Method: </strong>
              {cart.paymentMethod}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {cart.cartItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <ListGroup variant='flush'>
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row className="d-flex align-items-center justify-content-center">
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
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
                  <Col>{cart.totalPrice} IDR</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                {error && <Message variant='danger'>{error}</Message>}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type='button'
                  className='btn-block'
                  disabled={cart.cartItems === 0}
                  onClick={placeOrderHandler}
                >
                  Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default PlaceOrderScreen
