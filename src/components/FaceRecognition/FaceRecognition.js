import React from 'react';
import Box from './Box';
import './Box.css'

const FaceRecognition = ({imageURL, boxes}) => {
    return (
        <div className='center'>
            <div className='absolute'>
                <img id='inputimage' alt='' src={imageURL} width='800px'/>
                {
                    boxes.map((box_coord, i) => {
                        return <Box key={i} coord={box_coord} />
                    })
                }
            </div>
        </div>
        
    );
}

export default FaceRecognition;