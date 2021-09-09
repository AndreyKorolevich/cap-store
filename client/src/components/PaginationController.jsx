import React from 'react'
import { Pagination, PaginationItem, PaginationLink, Input } from 'reactstrap'
import { useSelector } from 'react-redux'
import { getItemsCount } from '../features/storeManager'
import { pageOptions } from '../constant/constants'

const PaginationController = ({
  currentPage,
  capsPerPage,
  setCurrentPage,
  scrollToResults,
  setCapsPerPage,
}) => {
  const itemsCount = useSelector(getItemsCount)
  let visiblePages = []

  const availablePages = Math.ceil(itemsCount / capsPerPage)
  const nextPage = currentPage + 1 <= availablePages ? currentPage + 1 : 1
  const previousPage = currentPage - 1 >= 1 ? currentPage - 1 : availablePages

  for (let i = 1; i <= availablePages; i++) {
    visiblePages.push(i)
  }

  if (availablePages > 5) {
    const maxVisiblePages = 5
    const currentPageIndex = currentPage - 1
    const startPageIndex = Math.max(0, currentPageIndex - Math.floor(maxVisiblePages / 2))
    const endPageIndex = Math.min(startPageIndex + maxVisiblePages - 1, availablePages - 1)

    visiblePages = visiblePages.slice(startPageIndex, endPageIndex + 1)
  }

  const goToPrevious = () => {
    scrollToResults()
    setCurrentPage(previousPage)
  }

  const goToFirst = () => {
    scrollToResults()
    setCurrentPage(1)
  }

  const goToCertain = (page, isDisabled) => () => {
    scrollToResults()
    if (!isDisabled) {
      setCurrentPage(page)
    }
  }

  const goToLast = () => {
    scrollToResults()
    setCurrentPage(availablePages)
  }

  const goToNext = () => {
    scrollToResults()
    setCurrentPage(nextPage)
  }

  const selectCapsOnPage = (e) => {
    const input = e.target.value
    setCurrentPage(1)
    setCapsPerPage(Number(input))
  }

  return (
    <div className='pagination-container container d-flex align-items-center justify-content-between flex-wrap'>
      <Pagination id='pagination-controller' aria-label='pagination'>
        <PaginationItem onClick={goToFirst}>
          <PaginationLink first />
        </PaginationItem>
        <PaginationItem onClick={goToPrevious}>
          <PaginationLink previous />
        </PaginationItem>

        {visiblePages.map((page) => {
          const isCurrentPage = currentPage === page
          const isDisabled = availablePages < page

          return (
            <PaginationItem
              onClick={goToCertain(page, isDisabled)}
              active={isCurrentPage}
              key={page}
              disabled={isDisabled}
            >
              <PaginationLink>{page}</PaginationLink>
            </PaginationItem>
          )
        })}

        <PaginationItem onClick={goToNext}>
          <PaginationLink next />
        </PaginationItem>
        <PaginationItem onClick={goToLast}>
          <PaginationLink last />
        </PaginationItem>
      </Pagination>

      <div className='results-controller d-flex align-items-center justify-content-center'>
        <p>Caps Per Page:</p>
        <Input
          type='select'
          defaultValue={capsPerPage}
          onChange={selectCapsOnPage}
          name='results-per-page'
        >
          {pageOptions.map((pageCount) => (
            <option key={pageCount}>{pageCount}</option>
          ))}
        </Input>
      </div>
    </div>
  )
}

export default PaginationController
