import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';

const AddReview = () => {
    const [user] = useAuthState(auth);
    const { register, formState: { errors }, handleSubmit, reset } = useForm();

    const onSubmit = async data => {
        const review = {
            review: data.review,
            rating: data.rating,
            userName: user.displayName,
            userEmail: user.email
        }

        // post a review to mongodb database
        fetch('https://peaceful-badlands-33828.herokuapp.com/review', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`

            },
            body: JSON.stringify(review)
        })
            .then(res => res.json())
            .then(inserted => {
                if (inserted.insertedId) {
                    toast.success('Review added successfully.');
                    reset();
                } else {
                    toast.error('Could not add the review!');

                }
            })
        console.log(data);
    }


    return (
        <div className='w-1/2 mx-auto p-20'>

            <form onSubmit={handleSubmit(onSubmit)} className='w-full'>


                {/* review field  */}
                <div className="form-control w-full max-w-xs">

                    <textarea className="textarea" {...register("review", {
                        required: {
                            value: true,
                            message: 'Review is required'
                        },
                    })} placeholder="Write a review"></textarea>

                    <label className="label">
                        {errors.review?.type === 'required' && <span className="label-text-alt text-red-500">{errors.review.message}</span>}
                    </label>
                </div>

                {/* rating field  */}
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text"></span>
                    </label>
                    <input type="number"
                        className="input input-bordered w-full max-w-xs"
                        min={1}
                        max={5}
                        placeholder='Give a rating'
                        {...register("rating", {
                            required: {
                                value: true,
                                message: 'Rating is required'
                            }
                        })} />
                    <label className="label">
                        {errors.rating?.type === 'required' && <span className="label-text-alt text-red-500">{errors.rating.message}</span>}
                    </label>
                </div>

                {/* submit button */}
                <input className='btn w-full max-w-xs text-white mt-10' type="submit" value='Add Review' />
            </form>
        </div>
    );
};

export default AddReview;