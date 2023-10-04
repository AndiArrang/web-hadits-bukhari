import React, { useState , Fragment}  from "react"
import { useNavigate } from 'react-router';
import '../style/navbar.css'



function Menu() {
  
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setSearchTerm(e.target.value)
    console.log(searchTerm)
  }

// fungsi pencarian
    const handleSubmit = (event) => {
        event.preventDefault();
        navigate('/search',{state: searchTerm})
    };
  return (
    <Fragment>
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="/"><div className="logo-web"></div></a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="navbar-list">
                <a className="nav-link" href="/">Home</a>
              </li>
              <li className="navbar-list">
                <a className="nav-link" href="/kitab">Kitab</a>
              </li>
            </ul>
            <form className="d-flex search"  onSubmit={handleSubmit}>
                <input onChange={handleChange} className="form-control me-2" type="search" placeholder="Cari Hadits" aria-label="Search" required/>
                <button className="btn btn-h-primary me-1" type="submit">Search</button>
            </form>
          </div>
        </div>  
      </nav>
    </Fragment>
  );
}

export default Menu;