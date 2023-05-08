import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Carousel, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from './Loader'
import Message from './Message'
import { listBanners } from '../actions/announceActions'

const ProductCarousel = () => {
  const dispatch = useDispatch()

  const base_url = "http://localhost:5000"

  const bannerList = useSelector((state) => state.bannerList)
  const { loading, error, banners } = bannerList

  useEffect(() => {
    dispatch(listBanners())
  }, [dispatch])

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <Carousel pause='hover' className={'bg-white-transp-motif'}>
      {banners.map((banner) => (
        <Carousel.Item key={banner._id}>
          {banner.image.includes('http') ? (
            <Image src={banner.image} alt={banner.name} className='full-screen-image' />
          ) : (
            <Image src={`${base_url}${banner.image}`} alt={banner.name} className='full-screen-image' />
          )}
        </Carousel.Item>
      ))}
    </Carousel>
  )
}

export default ProductCarousel
