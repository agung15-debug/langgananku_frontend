import React from 'react'
import { Pagination } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const Paginate = ({ pages, page, name, isAdmin = false, keyword = '' }) => {
  const prevPage = page - 1
  const nextPage = page + 1

  let pageNumbers = []
  for (let i = Math.max(2, page - 1); i <= Math.min(page + 1, pages - 1); i++) {
    pageNumbers.push(i)
  }

  return (
    pages > 1 && (
      <Pagination>
        {prevPage > 1 && (
          <LinkContainer
            to={
              !isAdmin
                ? keyword
                  ? `/search/${keyword}/page/${prevPage}`
                  : `/page/${prevPage}`
                : `/admin/${name}/${prevPage}`
            }
          >
            <Pagination.Item>{'<'}</Pagination.Item>
          </LinkContainer>
        )}

        {pageNumbers[0] !== 2 && (
          <LinkContainer
            to={
              !isAdmin
                ? keyword
                  ? `/search/${keyword}/page/1`
                  : `/page/1`
                : `/admin/${name}/1`
            }
          >
            <Pagination.Item>{'1'}</Pagination.Item>
          </LinkContainer>
        )}

        {pageNumbers[0] > 2 && <Pagination.Ellipsis disabled />}

        {pageNumbers.map((pageNumber) => (
          <LinkContainer
            key={pageNumber}
            to={
              !isAdmin
                ? keyword
                  ? `/search/${keyword}/page/${pageNumber}`
                  : `/page/${pageNumber}`
                : `/admin/${name}/${pageNumber}`
            }
          >
            <Pagination.Item active={pageNumber === page}>{pageNumber}</Pagination.Item>
          </LinkContainer>
        ))}

        {pageNumbers[pageNumbers.length - 1] < pages - 1 && <Pagination.Ellipsis disabled />}

        {pageNumbers[pageNumbers.length - 1] !== pages - 1 && (
          <LinkContainer
            to={
              !isAdmin
                ? keyword
                  ? `/search/${keyword}/page/${pages}`
                  : `/page/${pages}`
                : `/admin/${name}/${pages}`
            }
          >
            <Pagination.Item>{pages}</Pagination.Item>
          </LinkContainer>
        )}

        {nextPage < pages && (
          <LinkContainer
            to={
              !isAdmin
                ? keyword
                  ? `/search/${keyword}/page/${nextPage}`
                  : `/page/${nextPage}`
                : `/admin/${name}/${nextPage}`
            }
          >
            <Pagination.Item>{'>'}</Pagination.Item>
          </LinkContainer>
        )}
      </Pagination>
    )
  )
}

export default Paginate