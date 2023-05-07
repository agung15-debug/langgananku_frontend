import React, { useState, useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Alert, Badge, Button, Row, Table, Col, Card } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Meta from '../components/Meta'
import ApexCharts from 'apexcharts'
import { allProducts } from '../actions/productActions'
import { allExpenses } from '../actions/expenseActions'
import { sortListOrders } from '../actions/orderActions'

const SaleDashboard = ({ history }) => {

  const dispatch = useDispatch()

  const productAll = useSelector((state) => state.productAll)
  const { products } = productAll

  const expenseAll = useSelector((state) => state.expenseAll)
  const { expenses } = expenseAll

  const sortOrderList = useSelector((state) => state.sortOrderList)
  const { loading, error, orders } = sortOrderList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const revenue = (orders, month) => {
    return orders?.reduce((acc, order) => {
      if (order.doneAt && order.doneAt.substring(5, 7) === month) {
        return acc + order.totalPrice;
      }
      return acc;
    }, 0);
  }
  
  const expense = (expenses, month) => {
    return expenses?.reduce((acc, expense) => {
      if (expense.createdAt && expense.createdAt.substring(5, 7) === month) {
        return acc + expense.total;
      }
      return acc;
    }, 0);
  }

  const profit = (orders, month) => {
    return orders?.reduce((acc, order) => {
      if (order.doneAt && order.doneAt.substring(5, 7) === month) {
        return acc + order.totalProfit;
      }
      return acc;
    }, 0);
  }

  // Data Collection
  const monthlyRevenue = [
    parseInt(revenue(orders, "01")),
    parseInt(revenue(orders, "02")),
    parseInt(revenue(orders, "03")),
    parseInt(revenue(orders, "04")),
    parseInt(revenue(orders, "05")),
    parseInt(revenue(orders, "06")),
    parseInt(revenue(orders, "07")),
    parseInt(revenue(orders, "08")),
    parseInt(revenue(orders, "09")),
    parseInt(revenue(orders, "10")),
    parseInt(revenue(orders, "11")),
    parseInt(revenue(orders, "12"))
  ]

  const monthlyExpense = [
    parseInt(expense(expenses, "01")),
    parseInt(expense(expenses, "02")),
    parseInt(expense(expenses, "03")),
    parseInt(expense(expenses, "04")),
    parseInt(expense(expenses, "05")),
    parseInt(expense(expenses, "06")),
    parseInt(expense(expenses, "07")),
    parseInt(expense(expenses, "08")),
    parseInt(expense(expenses, "09")),
    parseInt(expense(expenses, "10")),
    parseInt(expense(expenses, "11")),
    parseInt(expense(expenses, "12"))
  ]

  const monthlyProfit = [
    parseInt(profit(orders, "01")),
    parseInt(profit(orders, "02")),
    parseInt(profit(orders, "03")),
    parseInt(profit(orders, "04")),
    parseInt(profit(orders, "05")),
    parseInt(profit(orders, "06")),
    parseInt(profit(orders, "07")),
    parseInt(profit(orders, "08")),
    parseInt(profit(orders, "09")),
    parseInt(profit(orders, "10")),
    parseInt(profit(orders, "11")),
    parseInt(profit(orders, "12"))
  ]
  
  // data for the chart
  const dataChart = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: {
      revenue: monthlyRevenue,
      profit: monthlyProfit,
      expenses: monthlyExpense
    }
  };

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(allProducts())
      dispatch(allExpenses())
      dispatch(sortListOrders())
    } else {
      history.push('/login')
    }
  }, [
    dispatch,
    history,
    userInfo,
  ])

  // render the chart
  useEffect(() => {
    const chartOptions = {
      chart: {
        height: 350,
        type: 'area',
        zoom: {
          enabled: false
        },
        toolbar: {
          show: false
        },
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth'
      },
      series: [
        {
          name: 'Revenue',
          data: dataChart.datasets.revenue,
          color: '#7EB8DA'
        },
        {
          name: 'Profit',
          data: dataChart.datasets.profit,
          color: '#B191C3'
        },
        {
          name: 'Expenses',
          data: dataChart.datasets.expenses,
          color: '#D36E70'
        }
      ],
      markers: {
        size: 0,
        style: 'full',
      },
      xaxis: {
        type: 'category',
        categories: dataChart.labels
      },
      tooltip: {
        x: {
          format: 'MMM'
        }
      }
    };
    const chart = new ApexCharts(document.querySelector('#chart'), chartOptions);
    chart.render();

    // Clean up function
    return () => {
      chart.destroy();
    };
  }, [dataChart]);

  if (orders?.length == 0 ) {
    console.log("ini bisa")
  }
  console.log(orders?.length)

  return (
    <>
      <Row className="my-4">
        <Col md={4}>
          <Card className="shadow-sm border-0">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <Card.Title className="mb-0">Total Sales</Card.Title>
                </div>
                <div className="icon">
                  <i class="	fas fa-dollar-sign"></i>
                </div>
              </div>
              <h1 className="mt-2">{orders?.reduce((acc, order) => order.isDone ? acc + order.totalPrice : acc, 0)} IDR</h1>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="shadow-sm border-0">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <Card.Title className="mb-0">Total Orders</Card.Title>
                </div>
                <div className="icon">
                  <i class='fas fa-clipboard-list'></i>
                </div>
              </div>
              <h1 className="mt-2">{orders?.length}</h1>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="shadow-sm border-0">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <Card.Title className="mb-0">Total Products</Card.Title>
                </div>
                <div className="icon">
                  <i className='fas fa-box'></i>
                </div>
              </div>
              <h1 className="mt-2">{products?.length}</h1>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <br />
      <h2 style={{ textAlign: 'center' }}>
        Monthly Sales Comparison
      </h2>
      <Row>
        <Col>
          <div id="chart"></div>
        </Col>
      </Row>
      <br />
      <br />
      <h2>
        Uncompleted Orders
      </h2>
      {orders?.length == 0 && (
        <Message variant='info'>You're all caught up! No pending orders to worry about.</Message>
      )}
      <br />
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table hover className='table-sm'>
          <tbody>
            {orders.map((order) => (
              order.isDone !== true && (
                <tr key={order._id}>
                  <td>{order.pickupNote.date.substring(0, 10)}</td>
                  <td>{order._id}</td>
                  <td>{order.user && order.user.name}</td>
                  <td><a href={`https://wa.me/${order.user.phone}`}>{order.user && order.user.phone}</a></td>
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
                  <td>{order.totalPrice} IDR</td>
                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <i className='fas fa-ellipsis-h'></i>
                    </LinkContainer>
                  </td>
                </tr>
              )
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}

export default SaleDashboard