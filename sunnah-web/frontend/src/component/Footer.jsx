import React from "react";
import '../style/Footer.css'
const Footer = () => {
    return(
        <React.Fragment>
          <footer className="site-footer">
            <div>
              <div className="row">
                <div className="col-sm-12 col-md-5 me-10">
                  <h3>About</h3>
                  <p className="text-justify">Ini adalah website kumpulan hadits <strong>Sahih Bukhari</strong>. Sistem pencarian pada website ini menggunakan algoritma Vector Space Model.</p>
                </div>

                <div className="col-xs-6 col-md-4">
                  <h3>Contact Us</h3>
                  <ul className="footer-links">
                    <li><i className="bi bi-envelope"></i> andi.muharram@student.unismuh.ac.id</li>
                  </ul>
                </div>

              </div>
              <hr />
            </div>
            <div className="container-footer">
              <div className="row">
                <div className="col-md-8 col-sm-6 col-xs-12">
                  <p className="copyright-text">Copyright &copy; 2023 All Rights Reserved by Arrangs
                  </p>
                </div>

                <div className="col-md-4 col-sm-6 col-xs-12">
                  <ul className="social-icons">
                    <li><a className="instagram" href="https://www.instagram.com/andimuharram_3710/"><i className="fa fa-instagram"></i></a></li>
                    <li><a className="github" href="https://github.com/AndiArrang/"><i className="fa fa-github"></i></a></li>
                  </ul>
                </div>
              </div>
            </div>
          </footer>
        </React.Fragment>
    )
}
export default Footer