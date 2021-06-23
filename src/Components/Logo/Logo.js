import React from "react";
import Tilt from 'react-tilt'
import kakashi from "./kakashiofthesharingan.jpg";
import "./Logo.css";
const Logo =() => {
    return (
        <div className="ma4 mt0 ">
          <Tilt className="Tilt br2 shadow-2" options={{ max : 50,speed:3000,scale: 1.2, reverse: false, perspective: 1000, }} style={{ height: 150, width: 200 }} >
          <div className="Tilt-inner"> <img src={kakashi} alt='kakashiofthesharingan' /> </div>
          </Tilt>  
        </div>
    );
}
export default Logo;