import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Card } from 'react-bootstrap'
import Rating from './Rating'
import { useSelector } from 'react-redux'

const Product = ({ product }) => {

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  return (
    <Card className='my-3 p-3 rounded'>
      <Link to={`/product/${product._id}`}>
        <div style={{ position: 'relative' }}>
          <Card.Img src={product.image} variant='top' />
          {userInfo?.isAdmin && (
            <Link to={`/admin/product/${product._id}/edit`}>
              <button
                className='btn btn-edit'
                style={{ position: 'absolute', top: 0, right: 0, margin: 0, padding: 0 }}
              >
                <i className="fas fa-edit"></i>
              </button>
            </Link>
          )}
        </div>
      </Link>

      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as='div'>
            <strong>{product.name.length > 19 ? product.name.substring(0, 19) + " ..." : product.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as='div'>
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </Card.Text>
        <br />
        <Card.Text as='div'>
          <div className="product-product-price">
            {product.discountPercentage === 0 ? (
              <br />
            ) : (
              <>
                <span className="product-original-price" style={{ marginRight: "8px" }}>{product.sellingPrice} IDR</span>
                <span className="product-discount-percent">-{product.discountPercentage}%</span>
              </>
            )}
          </div>
          <div className="product-discounted-price">{product.groceryPrice} IDR</div>
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Product
