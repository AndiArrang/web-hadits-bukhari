import React, {Component,Fragment}from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,

  } from 'react-router-dom';
import Menu from "../component/Navbar";
import Footer from "../component/Footer";
import KitabList from "../pages/KitabList";
import HaditsList from "../pages/HaditsList";
import SearchResult from "../pages/SearchResult";
import Page404 from "../pages/404page";
import Home from "../pages/Home";
class RoutesPages extends Component {
    render() {
        return(
            <Router>
                <Fragment>    
                    <Routes>
                    <Route 
                        path="/" 
                        element={ 
                            <Fragment>
                                <Menu />
                                <div className="container">
                                <Home />
                                </div>
                                <Footer />
                            </Fragment>                       
                        } 
                    /> 
                    <Route 
                        path="/search" 
                        element={ 
                            <Fragment>
                                <Menu />
                                <div className="container">
                                <SearchResult />
                                </div>
                                <Footer />
                            </Fragment>                       
                        } 
                    /> 
                    <Route 
                        path="/kitab" 
                        element={ 
                            <Fragment>
                                <Menu />
                                <div className="container">
                                <KitabList />
                                </div>
                                <Footer />
                            </Fragment>                       
                        } 
                    /> 
                    <Route 
                        path="/kitab/:kitab" 
                        element={ 
                            <Fragment>
                                <Menu />
                                <div className="container">
                                <HaditsList />
                                </div>
                                <Footer />
                            </Fragment>                       
                        } 
                    /> 
                    <Route path="*" element={<Page404 />} />
                    </Routes>
                </Fragment>
            </Router>
        )
    }
}
export default RoutesPages;