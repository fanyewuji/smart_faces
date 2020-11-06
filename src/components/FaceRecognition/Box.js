import React from 'react';

const Box = ({coord}) => {
    return (<div className='black br2 boundingbox' 
    style={{left: coord.left, right: coord.right, top:coord.top, bottom:coord.bottom}}></div>);
}

export default Box;