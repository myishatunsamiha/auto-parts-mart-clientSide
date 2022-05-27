import React, { useEffect } from 'react';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { useForm } from 'react-hook-form';
import Loading from '../Shared/Loading';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useToken from '../../hooks/UseToken';


const Login = () => {
    // for react firebase hook for login with google account
    const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);

    // for react form
    const { register, formState: { errors }, handleSubmit } = useForm();

    // for react firebase hook for login with email and password
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);

    const [token] = useToken(user || gUser);

    let signInError;

    const navigate = useNavigate();
    const location = useLocation();
    let from = location.state?.from?.pathname || '/';


    useEffect(() => {
        if (token) {        // do the redirect for both email password login and google login
            navigate(from, { replace: true });
        }
    }, [token, from, navigate]);

    if (loading || gLoading) {
        return <Loading></Loading>;
    }

    if (error || gError) {
        signInError = <p className='text-red-500'>{error?.message || gError?.message}</p>
    }


    const onSubmit = data => {
        signInWithEmailAndPassword(data.email, data.password);
    }



    return (
        <div className='flex h-screen justify-center items-center'>
            <div className="card w-96 bg-gray-200 shadow-xl">
                <div className="card-body">
                    <h2 className="text-center text-2xl font-bold">Login</h2>

                    {/* login using email password  */}
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {/* email field  */}
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email"
                                placeholder="Your Email"
                                className="input input-bordered w-full max-w-xs"
                                {...register("email", {
                                    required: {
                                        value: true,
                                        message: 'Email is required'
                                    },
                                    pattern: {
                                        value: /[a-z0-9.]+@[a-z]+\.[a-z]{2,3}/,
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


                        {signInError}

                        {/* submit button */}
                        <input className='btn w-full max-w-xs text-white' type="submit" value='Login' />
                    </form>

                    <p><small>Don't have an account? Please <Link className='text-yellow-600 font-bold' to='/signup'>Signup</Link></small></p>

                    <div className="divider">OR</div>

                    {/* login using google account  */}
                    <button
                        onClick={() => signInWithGoogle()}
                        className="btn btn-outline">Continue with Google</button>
                </div>
            </div>
        </div>
    );
};

export default Login;