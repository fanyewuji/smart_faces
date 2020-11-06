import React from 'react';

const Rank = ({username, userentries}) => {
    return (
        <div>
            <div className='f2 white pa3'>
                {`${username}, your current entry count is...`}
            </div>
            <div className='f1 white b'>
                {`#${userentries}`}
            </div>
        </div>
        
    );
}

export default Rank;