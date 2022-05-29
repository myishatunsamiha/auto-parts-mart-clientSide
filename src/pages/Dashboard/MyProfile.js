import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import auth from '../../firebase.init';
import Loading from '../Shared/Loading';

const MyProfile = () => {
    const [user] = useAuthState(auth);
    // for react form
    const { register, formState: { errors }, handleSubmit, reset } = useForm();


    const { data: userProfile, isLoading, refetch } = useQuery('userProfile', () =>
        fetch(`https://peaceful-badlands-33828.herokuapp.com/user/${user.email}`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',    // not necessary 
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        }).then(res =>
            res.json()
        )
    )

    if (isLoading) {
        return <Loading></Loading>
    }


    const onSubmit = async data => {
        console.log('user profile', userProfile);
        console.log('data', data);

        const modifiedUser = {
            name: data.name,
            email: data.email,
            education: data.education,
            location: data.location,
            phone: data.phone,
            linkedIn: data.linkedIn
        }

        fetch(`https://peaceful-badlands-33828.herokuapp.com/user/${user.email}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(modifiedUser)
        })
            .then(res => res.json())
            .then(res => {
                refetch();
                reset();
            })

    }


    return (
        <div className='p-10 grid md:grid-cols-2 gap-5'>

            <div>
                <p className='text-2xl pb-4'>Name: <span className='text-2xl font-bold'>{user?.displayName}</span></p>
                <p className='text-2xl pb-4'>Email: <span className='text-2xl font-bold'>{user?.email}</span></p>

                {userProfile?.location && <p className='text-2xl pb-4'>Education: <span className='text-2xl font-bold'>{userProfile?.education}</span></p>}
                {userProfile?.location && <p className='text-2xl pb-4'>Location: <span className='text-2xl font-bold'>{userProfile?.location}</span></p>}
                {userProfile?.phone && <p className='text-2xl pb-4'>Phone Number: <span className='text-2xl font-bold'>{userProfile?.phone}</span></p>}
                {userProfile?.linkedIn && <p className='text-2xl pb-4'>LinkedIn:<span className='text-2xl font-bold'>{userProfile?.linkedIn}</span></p>}
            </div>


            <div>
                <form className='mx-auto' onSubmit={handleSubmit(onSubmit)}>
                    {/* name field  */}
                    <div className="form-control w-full max-w-xs mb-4">
                        <input type="name"
                            placeholder="Your Name"
                            className="input input-bordered w-full max-w-xs"
                            value={user?.displayName}
                            readOnly={true}
                            {...register("name")} />
                    </div>


                    {/* email field  */}
                    <div className="form-control w-full max-w-xs mb-4">
                        <input type="text"
                            placeholder="Your Email"
                            className="input input-bordered w-full max-w-xs"
                            value={user?.email}
                            readOnly={true}
                            {...register("email")} />
                    </div>

                    {/* education field  */}
                    <div className="form-control w-full max-w-xs mb-4">
                        <input type="text"
                            placeholder="Your Education"
                            className="input input-bordered w-full max-w-xs"
                            {...register("education")} />
                    </div>

                    {/* location field  */}
                    <div className="form-control w-full max-w-xs mb-4">
                        <input type="text"
                            placeholder="Your Location"
                            className="input input-bordered w-full max-w-xs"
                            {...register("location")} />
                    </div>

                    {/* phone number  */}
                    <div className="form-control w-full max-w-xs mb-4">
                        <input type="text"
                            placeholder="Your Phone Number"
                            className="input input-bordered w-full max-w-xs"
                            {...register("phone")} />
                    </div>

                    {/* linked-in profile field  */}
                    <div className="form-control w-full max-w-xs mb-4">
                        <input type="text"
                            placeholder="Your LinkedIn Url"
                            className="input input-bordered w-full max-w-xs"
                            {...register("linkedIn")} />
                    </div>

                    {/* submit button */}
                    <input className='btn mt-4 w-full max-w-xs text-white' type="submit" value='Update Profile' />
                </form>
            </div>

        </div>
    );
};

export default MyProfile;