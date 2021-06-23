import React from 'react';
import './Facerecognition.css';
const FaceRecognition = ({ imageURL, box }) => {
  return (
    <div className='center ma'>
        <div className='absolute mt2'>
                
            <img 
            id='URLimage'
            alt='face' 
            src={imageURL} 
            width='500px' height='auto' />
            <div className = 'bounding-box' style={{left: box.leftline, top: box.topline, right: box.rightline, bottom: box.bottomline}}> </div>
        </div>  
    </div>
  );
}

export default FaceRecognition;
