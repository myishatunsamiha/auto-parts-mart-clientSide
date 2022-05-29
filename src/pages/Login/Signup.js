import React, { useEffect } from 'react';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { useCreateUserWithEmailAndPassword, useUpdateProfile } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { useForm } from 'react-hook-form';
import Loading from '../Shared/Loading';
import { Link, useNavigate } from 'react-router-dom';
import { useNavigation } from 'react-day-picker';
import useToken from '../../hooks/UseToken';


const Signup = () => {
    // for react firebase hook for login with google account
    const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);

    // for react form
    const { register, formState: { errors }, handleSubmit } = useForm();

    // for react firebase hook for login with email and password
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error
    ] = useCreateUserWithEmailAndPassword(auth, { sendEmailVerification: true });

    const [updateProfile, updating, updateError] = useUpdateProfile(auth);

    const [token] = useToken(user || gUser);

    const navigate = useNavigate();

    let signUpError;


    if (loading || gLoading || updating) {
        return <Loading></Loading>;
    }

    if (error || gError || updateError) {
        signUpError = <p className='text-red-500'>{error?.message || gError?.message || updateError?.message}</p>
    }


    if (token) {    // for both type of users
        console.log('redirect to home page');
        navigate('/');
    }


    const onSubmit = async data => {
        console.log(data);
        await createUserWithEmailAndPassword(data.email, data.password);
        await updateProfile({ displayName: data.name });
        // navigate('/');
    }


    return (
        <div>
            <div className='flex h-screen justify-center items-center'>
                <div className="card w-96 bg-gray-200 shadow-xl">
                    <div className="card-body">
                        <h2 className="text-center text-2xl font-bold">Signup</h2>

                        {/* login using email password  */}
                        <form onSubmit={handleSubmit(onSubmit)}>
                            {/* name field  */}
                            <div className="form-control w-full max-w-xs">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="name"
                                    placeholder="Your Name"
                                    className="input input-bordered w-full max-w-xs"
                                    {...register("name", {
                                        required: {
                                            value: true,
                                            message: 'Name is required'
                                        }
                                    })} />
                                <label className="label">
                                    {errors.name?.type === 'required' && <span className="label-text-alt text-red-500">{errors.name.message}</span>}
                                </label>
                            </div>


                            {/* email field  */}
                            <div className="form-control w-full max-w-xs">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="text"
                                    placeholder="Your Email"
                                    className="input input-bordered w-full max-w-xs"
                                    {...register("email", {
                                        required: {
                                            value: true,
                                            message: 'Email is required'
                                        },
                                        pattern: {
                                            value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                                            message: 'Provide a valid email'
                                        }
                                    })} />
                                <label className="label">
                                    {errors.email?.type === 'required' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}
                                    {errors.email?.type === 'pattern' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}

                                </label>
                            </div>

                            {/* password field  */}
                            <div className="form-control w-full max-w-xs">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password"
                                    placeholder="Your Password"
                                    className="input input-bordered w-full max-w-xs"
                                    {...register("password", {
                                        required: {
                                            value: true,
                                            message: 'Password is required'
                                        },
                                        minLength: {
                                            value: 6,
                                            message: 'Must be 6 characters long' // JS only: <p>error message</p> TS only support string
                                        }
                                    })} />
                                <label className="label">
                                    {errors.password?.type === 'required' && <span className="label-text-alt text-red-500">{errors.password.message}</span>}
                                    {errors.password?.type === 'minLength' && <span className="label-text-alt text-red-500">{errors.password.message}</span>}

                                </label>
                            </div>


                            {signUpError}

                            {/* submit button */}
                            <input className='btn w-full max-w-xs text-white' type="submit" value='Signup' />
                        </form>

                        <p><small>Do you have an account? Please <Link className='text-yellow-600 font-bold' to='/login'>Login</Link></small></p>

                        <div className="divider">OR</div>

                        {/* login using google account  */}
                        <button
                            onClick={() => signInWithGoogle()}
                            className="btn btn-outline">Continue with Google</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;