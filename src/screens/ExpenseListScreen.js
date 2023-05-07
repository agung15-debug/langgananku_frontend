import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import {
  listExpenses,
  deleteExpense,
  createExpense,
} from '../actions/expenseActions'
import { EXPENSE_CREATE_RESET } from '../constants/expenseConstants'

const ExpenseListScreen = ({ history, match }) => {
  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch()

  const expenseList = useSelector((state) => state.expenseList)
  const { loading, error, expenses, page, pages } = expenseList

  const expenseDelete = useSelector((state) => state.expenseDelete)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = expenseDelete

  const expenseCreate = useSelector((state) => state.expenseCreate)
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    expense: createdExpense,
  } = expenseCreate

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    dispatch({ type: EXPENSE_CREATE_RESET })

    if (!userInfo || !userInfo.isAdmin) {
      history.push('/login')
    }

    if (successCreate) {
      history.push(`/admin/expense/${createdExpense._id}/edit`)
    } else {
      dispatch(listExpenses('', pageNumber))
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    createdExpense,
    pageNumber,
  ])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteExpense(id))
    }
  }

  const createExpenseHandler = () => {
    dispatch(createExpense())
  }

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Expenses</h1>
        </Col>
        <Col className='text-right'>
          <Button className='my-3' onClick={createExpenseHandler}>
            <i className='fas fa-plus'></i> Add Expense
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
        expenses.length != 0 ? (
          <>
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>DATE</th>
                <th>ID</th>
                <th>DESCRIPTION</th>
                <th>TOTAL</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((expense) => (
                <tr key={expense._id}>
                  <td>{expense.createdAt.substring(0, 10)}</td>
                  <td>{expense._id}</td>
                  <td>{expense.needDescription}</td>
                  <td>{expense.total}</td>
                  <td>
                    <LinkContainer to={`/admin/expense/${expense._id}/edit`}>
                      <Button variant='light' className='btn-sm'>
                        <i className='fas fa-edit'></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => deleteHandler(expense._id)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate pages={pages} page={page} name={"expenses"} isAdmin={true} />
        </>
        ) : (
          <Message variant='info'>Currently, there is no Expense data available. You can add Expense data to see it appear here.</Message>
        )
      )}
    </>
  )
}

export default ExpenseListScreen
