import React from 'react';

const ImageLinkForm = ({onInputChange, onButtonSubmit}) => {
    return (
        <div>
            <p className='f3'>{'This magic will detect faces in your pictures. Give it a try'}</p>
            <div className='center form pa4 br3 shadow-5'>
                <input className='f4 pa2 center w-70' type='tex' 
                placeholder='Image URL' onChange={onInputChange}/>
                <button className='w-30 f4 grow dib ph3 pv2 link bg-light-orange' 
                onClick={onButtonSubmit}>Detect</button>
            </div>
        </div>
    );
}

export default ImageLinkForm;