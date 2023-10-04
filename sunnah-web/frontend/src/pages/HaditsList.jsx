import axios from "axios"
import React, { useState , useEffect, Fragment}  from "react"
import HaditsComp from "../component/HaditsComp"
import LoadingSpinner from "../component/LoadingSpinner"
import '../style/HaditsComp.css'
const HaditsList = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [data,setData] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [totalData, setTotalData] = useState(0);
    const pageSize = 10;

    const kitab = window.location.href.split('/')[4]

    const totalPages = Math.ceil(totalData / pageSize);

    const goToPage = (page) => {
    setCurrentPage(page);
    };

    const goToPreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
    };

    const goToNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
    };

    const renderPaginationButtons = () => {
      const buttons = [];
    
      buttons.push(
        <li className="page-item" key="previous">
          <button className="page-link green" onClick={goToPreviousPage} disabled={currentPage === 1}>
            Previous
          </button>
        </li>
      );
    
      const maxDisplayedPages = 5; // Jumlah maksimal halaman yang ditampilkan
      const pageOffset = Math.floor((maxDisplayedPages - 1) / 2); // Pergeseran halaman aktif
      const startPage = Math.max(currentPage - pageOffset, 1); // Halaman awal yang ditampilkan
      const endPage = Math.min(startPage + maxDisplayedPages - 1, totalPages); // Halaman akhir yang ditampilkan
    
      if (startPage > 1) {
        buttons.push(
          <li className="page-item" key="ellipsis-start">
            <button className="page-link" disabled>...</button>
          </li>
        );
      }
    
      for (let i = startPage; i <= endPage; i++) {
        buttons.push(
          <li className={`page-item ${i === currentPage ? 'active' : ''}`} key={i}>
            <button className="page-link green" onClick={() => goToPage(i)} disabled={i === currentPage}>
              {i}
            </button>
          </li>
        );
      }
    
      if (endPage < totalPages) {
        buttons.push(
          <li className="page-item" key="ellipsis-end">
            <button className="page-link" disabled>...</button>
          </li>
        );
      }
    
      buttons.push(
        <li className="page-item" key="next">
          <button className="page-link green" onClick={goToNextPage} disabled={currentPage === totalPages}>
            Next
          </button>
        </li>
      );
    
      return (
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            {buttons}
          </ul>
        </nav>
      );
    };
    
      const startIndex = (currentPage - 1) * pageSize;
      const endIndex = startIndex + pageSize;
    
      // Get the data to be displayed on the current page
      const paginatedData = data.slice(startIndex, endIndex);
  
    useEffect(() => {
      const username = 'webhadits';
      const password = 'arrangs3710';
  
      const basicAuth = 'Basic ' + btoa(`${username}:${password}`).toString('base64');
      const getApi = () => {
        setIsLoading(true)
        axios.get(`http://localhost:3001/kitab/${kitab}`,{
          headers: {
            Authorization: basicAuth
          }
        })
        .then((response) => {
            // handle success 
            // console.log(response.data.data)
            setData(response.data.data) 
            setTotalData(response.data.data.length)
            setIsLoading(false)    
        })
    }
    getApi()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return(
        <Fragment>

    <React.Fragment>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <React.Fragment>
            <h3 className="kitab-name">Kitab <strong>{kitab.split('%20').join(' ')}</strong></h3>

            { paginatedData.length < 1 ? <h1>Tidak Ada hasil ditemukan</h1> :
                paginatedData.map((item, i) => (
                  <HaditsComp key={i} data={item} />
                ))
            }

            {renderPaginationButtons()}
          </React.Fragment>
        )}
      </React.Fragment>
          
        </Fragment>
    )
}

export default HaditsList;