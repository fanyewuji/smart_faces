import React from 'react';
import Tilt from 'react-tilt';
import facerecognition from './face-recognition.png';

const Logo = () => {
    return (
        <div className='ma4 mt0'>
            <Tilt className="Tilt" options={{ max : 25, speed:200}} style={{ height: 150, width: 150 }} >
                <div className="Tilt-inner pa3"> 
                    <img alt='logo' src={facerecognition}/>
                </div>
            </Tilt>
        </div>
    );
}

export default Logo;