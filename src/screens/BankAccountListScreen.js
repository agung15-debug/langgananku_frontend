import React, { useEffect, useState } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import {
  listBankAccounts,
  deleteBankAccount,
  createBankAccount,
} from '../actions/bankAccountActions'
import { BANK_ACCOUNT_CREATE_RESET } from '../constants/bankAccountConstants'

const BankAccountListScreen = ({ history, match }) => {
  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch()

  const base_url = "http://localhost:5000"

  const [qris, setQris] = useState(false)
  const [cekQris, setCekQris] = useState(false)

  const bankAccountList = useSelector((state) => state.bankAccountList)
  const { loading, error, bankAccounts, page, pages } = bankAccountList

  const bankAccountDelete = useSelector((state) => state.bankAccountDelete)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = bankAccountDelete

  const bankAccountCreate = useSelector((state) => state.bankAccountCreate)
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    bankAccount: createdBankAccount,
  } = bankAccountCreate

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    dispatch({ type: BANK_ACCOUNT_CREATE_RESET })

    if (!userInfo || !userInfo.isAdmin) {
      history.push('/login')
    }

    if (successCreate) {
      if (qris) {
        history.push(`/admin/bankAccount/${createdBankAccount._id}/editQris`)
      } else {
        history.push(`/admin/bankAccount/${createdBankAccount._id}/edit`)
      }
    } else {
      dispatch(listBankAccounts('', pageNumber))
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    createdBankAccount,
    pageNumber,
  ])

  let countIsQris = 0;
  bankAccounts.map((bankAccount) => {
    if (bankAccount.isQris) {
      countIsQris++;
    } else {
      return false;
    }
  });

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteBankAccount(id))
    }
  }

  const createBankAccountHandler = () => {
    dispatch(createBankAccount())
  }

  const createBankAccountQrisHandler = () => {
    setQris(true)
    dispatch(createBankAccount())
  }

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Bank Accounts</h1>
        </Col>
        <Col className='text-right'>
          <Button className='my-3' onClick={createBankAccountHandler}>
            <i className='fas fa-plus'></i> Add Bank Account
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
        <>
          {bankAccounts.length != 0 ? (
            <Table striped bordered hover responsive className='table-sm'>
              <thead>
                <tr>
                  <th>BANK NAME</th>
                  <th>HOLDER NAME</th>
                  <th>ACCOUNT NUMBER</th>
                  <th>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {bankAccounts.map((bankAccount) => (
                  !bankAccount.isQris && (
                    <tr key={bankAccount._id}>
                      <td>{bankAccount.bankName}</td>
                      <td>{bankAccount.holderName}</td>
                      <td>{bankAccount.accountNumber}</td>
                      <td>
                        <LinkContainer to={`/admin/bankAccount/${bankAccount._id}/edit`}>
                          <Button variant='light' className='btn-sm'>
                            <i className='fas fa-edit'></i>
                          </Button>
                        </LinkContainer>
                        <Button
                          variant='danger'
                          className='btn-sm'
                          onClick={() => deleteHandler(bankAccount._id)}
                        >
                          <i className='fas fa-trash'></i>
                        </Button>
                      </td>
                    </tr>
                  )
                ))}
              </tbody>
            </Table>
          ) : (
            <Message variant='info'>Currently, there is no Bank Account data available. You can add Bank Account data to see it appear here.</Message>
          )}
          <br />
          <hr />
          <Row className='align-items-center'>
            <Col>
              <h1>QRIS Payment</h1>
            </Col>
            {countIsQris === 0 && (
              <Button className='my-3' onClick={createBankAccountQrisHandler}>
                <i className='fas fa-plus'></i> Add QRIS
              </Button>
            )}
          </Row>
          {/* QRIS just only one */}
          {countIsQris > 0 && (
            <>
              <Message variant='info'>You should delete the recent QRIS if you want to add a new QRIS, or you can edit the form's button action</Message>
              <Table striped bordered hover responsive className='table-sm'>
                <thead>
                  <tr>
                    <th>QRIS IMAGE</th>
                    <th>ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  {bankAccounts.map((bankAccount) => (
                    bankAccount.isQris && (
                      <tr key={bankAccount._id}>
                        <td style={{ verticalAlign: 'middle', textAlign: 'left' }}>
                          <div style={{ position: 'relative', width: '400px', height: '100%', overflow: 'hidden' }}>
                            {bankAccount.image.includes('http') ? (
                              <Image
                                src={bankAccount.image}
                                style={{ maxHeight: '100%', maxWidth: '100%', cursor: 'pointer' }}
                              />
                            ) : (
                              <Image
                                src={`${base_url}${bankAccount.image}`}
                                style={{ maxHeight: '100%', maxWidth: '100%', cursor: 'pointer' }}
                              />
                            )}
                          </div>
                        </td>
                        <td>
                          <LinkContainer to={`/admin/bankAccount/${bankAccount._id}/editQris`}>
                            <Button variant='light' className='btn-sm'>
                              <i className='fas fa-edit'></i>
                            </Button>
                          </LinkContainer>
                          <Button
                            variant='danger'
                            className='btn-sm'
                            onClick={() => deleteHandler(bankAccount._id)}
                          >
                            <i className='fas fa-trash'></i>
                          </Button>
                        </td>
                      </tr>
                    )
                  ))}
                </tbody>
              </Table>
            </>
          )}
          {countIsQris === 0 && (
            <Message variant='info'>QRIS not yet uploaded, please upload QRIS on the Add button.</Message>
          )}
          {/* {qris ? <Message variant='success'>QRIS not yet uploaded, please upload QRIS on the Add button.</Message> : (
            <Message variant='danger'>QRIS not yet uploaded, please upload QRIS on the Add button.</Message>
          )} */}
          <Paginate pages={pages} page={page} name={"bankAccounts"} isAdmin={true} />
        </>
      )}
    </>
  )
}

export default BankAccountListScreen
