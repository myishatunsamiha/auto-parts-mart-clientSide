import React from 'react';



const HightLights = () => {
    const year = new Date().getFullYear();

    return (
        <div className='bg-gray-400 p-10 my-5'>
            <p className='text-4xl font-bold text-gray-700 text-center p-4'>HightLights</p>

            <div className='grid lg:grid-cols-2 gap-5 pt-4'>

                <div className="card bg-yellow-300 shadow-xl cardHover">
                    <div className="card-body flex flex-row items-center justify-around">
                        <div>
                            <p className='font-bold'>BIG SALE COUNTDOWN</p>
                            <p className='text-5xl font-bold mt-2 mb-4'>HURRY UP!</p>
                            <p className='font-bold'>Do your best picks</p>
                        </div>

                        <div>
                            <div className='flex flex-row items-center'>
                                <p className='text-8xl font-bold text-red-900'>80</p>
                                <div className='pt-4'>
                                    <p className='text-5xl font-bold'>%</p>
                                    <p className='text-xl font-bold'>OFF</p>
                                </div>
                            </div>
                            <button className='btn btn-block btn-dark mt-2'>Check Details</button>
                        </div>
                    </div>
                </div>


                <div className="card bg-gray-700 shadow-xl cardHover">
                    <div className="card-body m-10 border-4 border-yellow-300 rounded-lg text-center">
                        <p className='font-bold text-white '>ORIGINAL CAR PARTS <span className='text-yellow-500'>{year}</span></p>
                        <p className='font-bold text-white text-2xl'>DISCOVER NEW ARRIVALS</p>
                        <p className='font-bold text-yellow-500'>1000+ spare car parts!</p>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default HightLights;