import React from 'react';
import notfound from '../../assets/images/404.png';

const NotFound = () => {
    return (
        <div className='flex flex-col justify-center items-center'>
            <img src={notfound} alt="" style={{ maxWidth: '500px' }} />
            <h2 className='text-red-800 font-bold text-xl'>Page you are searching for is not found.</h2>
            <h5 className='text-red-800 font-bold text-xl'>Redirect yourself using the navigation bar.</h5>
        </div>
    );
};

export default NotFound;