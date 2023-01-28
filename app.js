import React, { useState, useEffect } from 'react';

const MyComponent = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [data, setData] = useState([]);
  const [pageButtons, setPageButtons] = useState([]);

  useEffect(() => {
    fetch(`https://my-api.com/items?page=${currentPage}`)
      .then(res => res.json())
      .then(res => {
        setData(res.data);
        setTotalPages(res.totalPages);
        setPageButtons(generatePageButtons(currentPage, totalPages));
      });
  }, [currentPage]);

  const handlePageChange = page => {
    setCurrentPage(page);
  };

  const handlePrevClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const generatePageButtons = (currentPage, totalPages) => {
    let startPage, endPage;
    if (totalPages <= 5) {
      startPage = 1;
      endPage = totalPages;
    } else {
      if (currentPage <= 3) {
        startPage = 1;
        endPage = 5;
      } else if (currentPage + 2 >= totalPages) {
        startPage = totalPages - 4;
        endPage = totalPages;
      } else {
        startPage = currentPage - 2;
        endPage = currentPage + 2;
      }
    }
    let pageButtons = [];
    for (let page = startPage; page <= endPage; page++) {
      pageButtons.push(page);
    }
    return pageButtons;
  };

  return (
    <div>
      <div>
        {data.map(item => (
          <div key={item.id}>{item.name}</div>
        ))}
      </div>
      <div>
        <button disabled={currentPage === 1} onClick={handlePrevClick}>
          Prev
        </button>
        {pageButtons.map(page => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            disabled={page === currentPage}
          >
            {page}
          </button>
        ))}
        <button disabled={currentPage === totalPages} onClick={handleNextClick}>
          Next
        </button>
      </div>
    </div>
  );
};

export default MyComponent;
