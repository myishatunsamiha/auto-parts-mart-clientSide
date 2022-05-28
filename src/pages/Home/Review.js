import React from 'react';
import { useQuery } from 'react-query';


const Review = () => {
    const { data: reviews, isLoading } = useQuery('allReviews', () => fetch('http://localhost:5000/review').then(res => res.json()));

    return (
        <div className='my-5 p-10'>
            <p className='text-4xl font-bold text-gray-700 text-center p-4'>Our Clients Reviews</p>

            <div className='w-4/5 lg:w-full mx-auto grid lg:grid-cols-2 gap-5'>
                {
                    reviews?.map(review =>
                        <div class="card w-full bg-base-100 shadow-xl bg-yellow-100">
                            <div class="card-body">
                                <p>Posted By: <span className='font-bold'>{review?.userName}</span></p>
                                <p>Email: <span className='font-bold'>{review?.userEmail}</span></p>
                                <p>Review: <span className='font-bold'>{review?.review}</span></p>
                                <p>Rating: <span className='font-bold'>{review?.rating}</span></p>
                            </div>
                        </div>
                    )

                }


            </div>

        </div>
    );
};

export default Review;