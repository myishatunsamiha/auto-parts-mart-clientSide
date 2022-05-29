import React from 'react';
import { useQuery } from 'react-query';
import Rating from 'react-rating';
import { StarIcon } from '@heroicons/react/solid'
import { faStartO } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'


const Review = () => {
    const { data: reviews, isLoading } = useQuery('allReviews', () => fetch('https://peaceful-badlands-33828.herokuapp.com/review').then(res => res.json()));

    return (
        <div className='my-5 p-10'>
            <p className='text-4xl font-bold text-gray-700 text-center p-4'>Our Clients Reviews</p>

            <div className='w-4/5 lg:w-full mx-auto grid lg:grid-cols-2 gap-5'>
                {
                    reviews?.map(review =>
                        <div key={review._id} className="card w-full shadow-xl bg-yellow-100">
                            <div className="card-body">
                                <p className='flex flex-row-reverse justify-between items-start'> <span className='text-gray-400 text-sm'>Posted By </span><span className='font-bold text-gray-500'>{review?.userName}</span></p>
                                <p className='flex flex-row-reverse justify-between'> <span className='text-gray-400 text-sm'>Email </span><span className='font-bold text-gray-500'>{review?.userEmail}</span></p>
                                <p className='flex flex-row-reverse justify-between'> <span className='text-gray-400 text-sm'>Review </span> <span className='font-bold'>{review?.review}</span></p>
                                <p className='flex flex-row-reverse justify-between'> <span className='text-gray-400 text-sm'>Rating </span> <span>
                                    <Rating initialRating={review.rating}
                                        readonly />
                                </span></p>
                                {/* <p> <span className='text-gray-400'>Rating: </span> <span className='font-bold'>{review?.rating}</span></p> */}
                            </div>
                        </div>
                    )

                }


            </div>

        </div >
    );
};

export default Review;