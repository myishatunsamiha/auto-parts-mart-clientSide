import React from 'react';
import banner from '../../assets/images/banner.png';
import './Banner.css';

const Banner = () => {
    return (
        <div className="hero min-h-screen bg-fixed bgImg md:p-10">
            <div className="hero-content flex-col lg:flex-row">
                <img src={banner} className="md:max-w-md rounded-lg shadow-2xl" alt='...' />
                <div className='p-10'>
                    <div>
                        <h1 className="text-6xl font-bold pt-5 text-gray-800">Get Your Ride Right</h1>
                        <p className="py-8 text-2xl text-gray-500">One stop place to get all the car parts you need for you car to keep it fit. We serve globally.</p>
                    </div>
                </div>
            </div>
        </div >

    );
};

export default Banner;