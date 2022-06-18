import React from 'react';
import  './footer.css';
import playstore from '../../../images/playstore.png';
import appStore from '../../../images/Appstore.png';

const Footer = () => {
  return (
    <>
    <footer id="footer">
        <div className="leftFooter">
            <h4>Download our app</h4>
            <p>Download App for android and IOS mobile phone</p>
            <img src={playstore} alt="playstore" />
            <img src={appStore} alt="appStore" />
        </div>

        <div className="midFooter">
            <h1>ECOMMERCE</h1>
            <p>High Quality is our first priority</p>
            <p>Copyrights 2021 &copy: btycoon77</p>
        </div>

        <div className="rightFooter">
            <h4>Follow us</h4>
            <a href="#">Instagram</a>
            <a href="#">Youtube</a>
            <a href="#">Facebook</a>

        </div>
    </footer>
    
    
    </>
  )
}

export default Footer