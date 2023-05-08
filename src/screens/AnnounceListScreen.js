import React, { useState, useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Alert, Modal, Table, Button, Image, Row, Col, ButtonGroup, DropdownButton, Dropdown } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import {
  listAnnounces,
  deleteAnnounce,
  createAnnounce,
  createTextAnnounce,
} from '../actions/announceActions'
import { ANNOUNCE_CREATE_RESET, TEXT_ANNOUNCE_CREATE_RESET } from '../constants/announceConstants'
import { listBanners, deleteTextAnnounce } from '../actions/announceActions'

const AnnounceListScreen = ({ history, match }) => {
  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch()

  const base_url = "http://localhost:5000"

  const [show, setShow] = useState(false);

  const announceList = useSelector((state) => state.announceList)
  const { loading, error, announces, page, pages } = announceList

  const bannerList = useSelector((state) => state.bannerList)
  const { loadingBanner, errorBanner, banners } = bannerList

  const announceDelete = useSelector((state) => state.announceDelete)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = announceDelete

  const announceCreate = useSelector((state) => state.announceCreate)
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    announce: createdAnnounce,
  } = announceCreate

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    dispatch({ type: ANNOUNCE_CREATE_RESET })

    if (!userInfo || !userInfo.isAdmin) {
      history.push('/login')
    }

    if (successCreate) {
      history.push(`/admin/announce/${createdAnnounce._id}/edit`)
    } else {
      dispatch(listAnnounces('', pageNumber))
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    createdAnnounce,
    pageNumber,
  ])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteAnnounce(id))
    }
  }

  const createAnnounceHandler = () => {
    dispatch(createAnnounce())
  }

  const createTextAnnounceHandler = () => {
    dispatch(createTextAnnounce())
  }

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const createTextAnnounceClick = () => {
    history.push('/admin/createtextannounce');
  };

  const textAnnounceDelete = useSelector((state) => state.textAnnounceDelete)
  const {
    loading: loadingTextDelete,
    error: errorTextDelete,
    success: successTextDelete,
  } = textAnnounceDelete

  useEffect(() => {
    if (successTextDelete) {
      dispatch({ type: TEXT_ANNOUNCE_CREATE_RESET })
      history.push('/admin/announce')
    }
  }, [dispatch, history, successTextDelete])

  useEffect(() => {
    dispatch(listBanners())
  }, [dispatch])

  const submitHandler = () => {
    dispatch(
      deleteTextAnnounce()
    )
    history.push('/');
  }

  return (
    <>
      <Row className='align-items-center'>
        <Col md={8}>
          <h1 className='mr-1' style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: '0' }}>Announces</h1>
          {banners.map((banner) => (
            banner.isText ? (
              <>
                <Button variant="success" size="sm" onClick={handleShow} style={{ marginLeft: '10px', marginTop: '0', marginBottom: '10px' }}>
                  Text Announcemnet Active
                </Button>
                <Modal show={show} onHide={handleClose} animation={false}>
                  <Modal.Header closeButton>
                    <Modal.Title>Text Announcemnet is Active</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>This will only show when the text announcement is active. If you want to make the text announcement inactive, you can delete the text announcement.</Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      Close
                    </Button>
                    <Button variant="danger" onClick={() => {
                      handleClose();
                      submitHandler();
                    }}>Delete</Button>
                  </Modal.Footer>
                </Modal>
              </>
            ) : null
          ))}
        </Col>
        <Col className='text-right'>
          <DropdownButton as={ButtonGroup} title="Create" id="bg-nested-dropdown">
            <Dropdown.Item eventKey="1" className='my-3' onClick={createAnnounceHandler}><i className='fas fa-plus'></i> New Banner</Dropdown.Item>
            <Dropdown.Item eventKey="2" className='my-3' onClick={createTextAnnounceClick}><i className='fas fa-plus'></i> Text Announce</Dropdown.Item>
          </DropdownButton>
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
        announces.length != 0 ? (
          <>
            <Table striped bordered hover responsive className='table-sm'>
              <thead>
                <tr>
                  <th>NAME</th>
                  <th>IMAGES</th>
                  <th>DESCRIPTION</th>
                  <th>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {announces.map((announce) => (
                  !announce.isText ? (
                    <tr key={announce._id}>
                      <td style={{ verticalAlign: 'middle' }}>{announce.name}</td>
                      <td style={{ verticalAlign: 'middle', textAlign: 'left' }}>
                        <div style={{ position: 'relative', width: '100%', height: '50px', overflow: 'hidden' }}>
                          {announce.image.includes('http') ? (
                            <Image
                              src={announce.image}
                              alt={announce.name}
                              style={{ maxHeight: '100%', maxWidth: '100%', cursor: 'pointer' }}
                            />
                          ) : (
                            <Image
                              src={`${base_url}${announce.image}`}
                              alt={announce.name}
                              style={{ maxHeight: '100%', maxWidth: '100%', cursor: 'pointer' }}
                            />
                          )}
                        </div>
                      </td>
                      <td style={{ verticalAlign: 'middle' }}>{announce.description}</td>
                      <td style={{ verticalAlign: 'middle' }}>
                        <LinkContainer to={`/admin/announce/${announce._id}/edit`}>
                          <Button variant='light' className='btn-sm'>
                            <i className='fas fa-edit'></i>
                          </Button>
                        </LinkContainer>
                        <Button
                          variant='danger'
                          className='btn-sm'
                          onClick={() => deleteHandler(announce._id)}
                        >
                          <i className='fas fa-trash'></i>
                        </Button>
                      </td>
                    </tr>
                  ) : null
                ))}
              </tbody>
            </Table>
            <Paginate pages={pages} page={page} name={"announce"} isAdmin={true} />
          </>
        ) : (
          <Message variant='info'>Currently, there is no Announce data available. You can add Announce data to see it appear here.</Message>
        )
      )}
    </>
  )
}

export default AnnounceListScreen
