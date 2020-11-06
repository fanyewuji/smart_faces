import React from 'react';

const Navigation = ({onRouterChange, isSignedIn}) => {
    if (isSignedIn) {
        return (
            <nav style={{display:'flex', justifyContent: 'flex-end'}}>
                <p className='f4 dim link black underline pa3 pointer' 
                onClick={() => onRouterChange('signin')}>Sign Out</p>
            </nav>
        );
    } else {
        return (
                <nav style={{display:'flex', justifyContent: 'flex-end'}}>
                    <p className='f4 dim link black underline pa3 pointer' 
                    onClick={() => onRouterChange('register')}>Register</p>
                    <p className='f4 dim link black underline pa3 pointer' 
                    onClick={() => onRouterChange('signin')}>SignIn</p>
                </nav>
        );
    }
}

export default Navigation;