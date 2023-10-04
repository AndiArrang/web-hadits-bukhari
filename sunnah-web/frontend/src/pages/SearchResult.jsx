import React ,{useEffect,useState} from 'react';
import { useLocation } from 'react-router';
import HomeComp from '../component/HomeComp';
import axios from "axios";
import LoadingSpinner from '../component/LoadingSpinner';

const SearchResult = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalData, setTotalData] = useState(0);
  const pageSize = 10;
 
  const location = useLocation();
  const numOrString = isNaN(location.state) 

  const username = 'webhadits';
  const password = 'arrangs3710';

  const basicAuth = 'Basic ' + btoa(`${username}:${password}`).toString('base64');
  
  const getResult = () => {
    setIsLoading(true)

    if (numOrString === true) {
      axios({
          headers: {
            Authorization: basicAuth
          },
          method: 'post',
          url: `http://localhost:3001/search`,
          data: {
            query: location.state
          }
        }).then((response) => {
          // handle success
          console.log(response.data.data)
         setData(response.data.data)
         setTotalData(response.data.data.length)
          setIsLoading(false)
      })
    } else {
      axios.get(`http://localhost:3001/hadits/${location.state}`,{
        headers: {
            'Authorization': basicAuth
        }
      })
      .then((response) => {
          // handle success
          console.log(response.data.data)
          setData(response.data.data)
          setTotalData(response.data.data.length)
          setIsLoading(false)
      })
      }  
  }

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
          Prev
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
      <nav aria-label="Page navigation example pagination">
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
      getResult()
      // eslint-disable-next-line react-hooks/exhaustive-deps
  },[location])

      return (
        <React.Fragment>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <React.Fragment>
           
            <div className="alert">
              <h5>Hasil pencarian : <strong style={{color: "goldenrod"}}>"{location.state.toUpperCase()}"</strong> {totalData} hadits ditemukan</h5>
            </div>

            {paginatedData.length < 1 ? (
              <h1>Tidak Ada hasil ditemukan</h1>
            ) : (
              <>
                {paginatedData.map((item, i) => (
                  <HomeComp key={i} data={item} />
                ))}
                {renderPaginationButtons()}
              </>
            )}


          </React.Fragment>
        )}
      </React.Fragment>
      
      );
  } 


export default SearchResult;
