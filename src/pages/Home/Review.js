import React from 'react';


const Review = () => {
    return (
        <div className='my-5 p-10'>
            <p className='text-4xl font-bold text-gray-700 text-center p-4'>Our Clients Reviews</p>

            <div className='w-4/5 lg:w-full mx-auto grid lg:grid-cols-2 gap-5'>
                <div class="card w-full bg-base-100 shadow-xl">
                    <div class="card-body">
                        <h2 class="card-title">Card title!</h2>
                        <p>If a dog chews shoes whose shoes does he choose?</p>
                        <div class="card-actions justify-end">
                            <button class="btn btn-primary">Buy Now</button>
                        </div>
                    </div>
                </div>

                <div class="card w-full bg-base-100 shadow-xl">
                    <div class="card-body">
                        <h2 class="card-title">Card title!</h2>
                        <p>If a dog chews shoes whose shoes does he choose?</p>
                        <div class="card-actions justify-end">
                            <button class="btn btn-primary">Buy Now</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Review;