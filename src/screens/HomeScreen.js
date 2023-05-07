import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Alert, Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import ProductCarousel from '../components/ProductCarousel'
import Meta from '../components/Meta'
import { listProducts } from '../actions/productActions'
import { listBanners } from '../actions/announceActions'
// import io from 'socket.io-client'

const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword

  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch()

  const [show, setShow] = useState(true);
  const [showText, setShowText] = useState(true);
  // const [connectInterval, setConnectInterval] = useState(null);

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const productList = useSelector((state) => state.productList)
  const { loading, error, products, page, pages } = productList

  const bannerList = useSelector((state) => state.bannerList)
  const { loadingBanner, errorBanner, banners } = bannerList

  useEffect(() => {
    dispatch(listBanners())
  }, [dispatch])

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber))
  }, [dispatch, keyword, pageNumber])

  // const connect = () => {
  //   socket.connect();
  // };

  // const reconnect = () => {
  //   clearInterval(connectInterval);
  //   setConnectInterval(null);
  //   socket.connect();
  // };

  // const socket = io('http://localhost:5000', {
  //   // reconnection: true,
  //   // reconnectionDelay: 1000,
  //   // reconnectionDelayMax: 5000,
  //   // reconnectionAttempts: Infinity,
  // });

  // useEffect(() => {
  //   socket.on('orderCreated', (order) => {
  //     console.log('New order created:', order);
  //   });

    // socket.on('connect', () => {
    //   console.log('Connected to server');
    //   if (connectInterval) {
    //     clearInterval(connectInterval);
    //     setConnectInterval(null);
    //   }
    // });

    // socket.on('connect_error', () => {
    //   console.log('Connection error');
    //   if (!connectInterval) {
    //     setConnectInterval(setInterval(reconnect, 5000));
    //   }
    // });

  //   return () => {
  //     socket.off('orderCreated');
  //     // socket.off('connect');
  //     // socket.off('connect_error');
  //     // clearInterval(connectInterval);
  //   };
  // }, []); // connectInterval, reconnect

  return (
    <>
      {/* // const createdAt = new Date(banner.createdAt).getTime();
          // const now = Date.now();
          // const threeDaysAgo = now - (3 * 24 * 60 * 60 * 1000);

          // if (createdAt < threeDaysAgo) {
          //   is3day = true
          // }else(
          //   is3day = false
          // ) */}
      {!userInfo ? (
        show && (
          <Alert variant="info" onClose={() => setShow(false)} dismissible style={{ margin: '20px' }}>
            <Alert.Heading>Log in Now for Full Access !!</Alert.Heading>
            <hr />
            <p style={{ textAlign: 'justify', textJustify: 'inter-word' }}> {/* Verify your email address to receive the latest updates and promotions. */}
              For full access to our platform's features and information, please{' '}
              <Alert.Link href='/login'>Log In</Alert.Link>
              {' '}to your account. If you don't have an account, click{' '}
              <Alert.Link href='/register'>Sign Up</Alert.Link>
              {' '}and provide accurate information. Once your account is created, log in to browse our content. Send us your feedback by contacting our support team.
            </p>
          </Alert>
        )) : null}
      {banners.map((banner) => (
        banner.isText ? (
          showText && (
            <Alert variant="info" onClose={() => setShowText(false)} dismissible style={{ margin: '20px' }}>
              <Alert.Heading>New Announcement !!</Alert.Heading>
              <hr />
              <p style={{ textAlign: 'justify', textJustify: 'inter-word' }}>
                {banner.description.split('. ').map((sentence, index) => (
                  <span key={index}>
                    {sentence.charAt(0).toUpperCase() + sentence.slice(1).toLowerCase()}.{' '}
                  </span>
                ))}
              </p>
            </Alert>
          )
        ) : null
      ))}
      <Meta />
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to='/' className='btn btn-light'>
          Go Back
        </Link>
      )}
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          {/* <Meta /> */}
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ''}
          />
        </>
      )}
    </>
  )
}

export default HomeScreen
