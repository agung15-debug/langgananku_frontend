import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Alert, Modal, Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { listBanners, listTextAnnounce, createTextAnnounce } from '../actions/announceActions'
import { TEXT_ANNOUNCE_CREATE_RESET } from '../constants/announceConstants'

const TextAnnounceScreen = ({ match, history }) => {

  const [description, setDescription] = useState('')

  const dispatch = useDispatch()

  const [show, setShow] = useState(false);
  const [showText, setShowText] = useState(true);

  const textAnnounceList = useSelector((state) => state.textAnnounceList)
  const { loading, error, textAnnounce } = textAnnounceList

  const bannerList = useSelector((state) => state.bannerList)
  const { loadingBanner, errorBanner, banners } = bannerList

  const textAnnounceCreate = useSelector((state) => state.textAnnounceCreate)
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
  } = textAnnounceCreate

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (successCreate) {
      dispatch({ type: TEXT_ANNOUNCE_CREATE_RESET })
      history.push('/admin/announce')
    }
  }, [dispatch, history, successCreate])

  useEffect(() => {
    dispatch(listBanners())
  }, [dispatch])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      createTextAnnounce({
        description,
      })
    )
  }

  return (
    <>
      {banners.map((banner) => (
        banner.isText ? (
          showText && (
            <Alert variant="danger" onClose={() => setShowText(false)} dismissible style={{ margin: '20px' }}>
              <Alert.Heading>Text Announcement is Currently Active !!</Alert.Heading>
              <hr />
              <p style={{ textAlign: 'justify', textJustify: 'inter-word' }}>
                With this feature, you can create an announcement text that will appear on the homepage for 3 days starting from the input date. If the announcement text is marked as active, it indicates that it contains valuable content. If you create a new announcement while the current one is still active, it will replace the previous one.
              </p>
              <p style={{ textAlign: 'justify', textJustify: 'inter-word' }}>
              To delete an existing announcement text, you can go back to the announcement menu by{' '}
              <Alert.Link href='/admin/announce'>clicking here</Alert.Link>
              , and then access the button that indicates the text announcement is active.
              </p>
            </Alert>
          )
        ) : null
      ))}
      <Link to='/admin/announce' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Create Text Announce</h1>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <br />
            <Form.Group controlId='description'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <br />
            <Button type='submit' variant='primary'>
              Create
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default TextAnnounceScreen
