import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';
import Loading from '../Shared/Loading';

const Purchase = () => {
    const { id } = useParams();
    const [user] = useAuthState(auth);
    const [disable, setDisable] = useState(false);
    const [qntError, setQntError] = useState('');


    // for react form
    const { register, formState: { errors }, handleSubmit, reset } = useForm();

    // get the product data
    const { data: product, isLoading, refetch } = useQuery('product', () =>
        fetch(`https://peaceful-badlands-33828.herokuapp.com/product/${id}`, {
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
        return <Loading></Loading>;
    }


    // get the order quantity when onBlur event occurs
    const handleQuantity = event => {       // on blur event
        const orderQnt = parseInt(event.target.value);
        if (orderQnt > product.availableQnt || orderQnt < product.minQnt) {
            setQntError(`Order Quantity needs to be between ${product.minQnt} and ${product.availableQnt}`);
            console.log(qntError);
            setDisable(true);
        } else {
            setQntError('');
            setDisable(false);
        }
    }

    // order the product
    const onSubmit = async data => {
        const order = {
            productId: id,
            productName: product.name,
            orderedQnt: data.quantity,
            price: product.price,
            img: product.img,

            userName: user.displayName,
            userEmail: user.email,
            location: data.location,
            phone: data.phone,
        }


        fetch('https://peaceful-badlands-33828.herokuapp.com/order', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(order)
        })
            .then(res => res.json())
            .then(res => {
                console.log(res);
                if (res.success) {
                    reset();
                    toast(`Order has been placed.`);

                } else {
                    toast.error(`Failed to place the order.`);
                }
            })

        console.log(order);
    }



    return (
        <div className='p-14'>
            <h2 className='text-center font-bold text-3xl mb-5'>Product Details</h2>

            <div className='grid md:grid-cols-2 gap-10'>
                {
                    product &&

                    <div className="card bg-base-100 shadow-xl max-w-sm">
                        <figure><img src={product.img} className='w-full' alt="Shoes" /></figure>
                        <div className="card-body">
                            <p>name: {product.name}</p>
                            <p>description: {product.description}</p>
                            <p>min order quantity: {product.minQnt}</p>
                            <p>available quantity: {product.availableQnt}</p>
                            <p>per unit price: {product.price}</p>
                            <Link to={`/purchase/${product._id}`}><button className="btn btn-primary">Purchase</button></Link>
                        </div>
                    </div>

                }

                <div className="card bg-yellow-200 shadow-xl max-w-sm">
                    <div className="card-body">

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

                            {/* location field  */}
                            <div className="form-control w-full max-w-xs mb-4">
                                <input type="text"
                                    placeholder="Your Location"
                                    className="input input-bordered w-full max-w-xs"
                                    {...register("location", {
                                        required: {
                                            value: true,
                                            message: 'Location is required'
                                        }
                                    })} />

                                <label className="label">
                                    {errors.location?.type === 'required' && <span className="label-text-alt text-red-500">{errors.location.message}</span>}
                                </label>
                            </div>

                            {/* phone number  */}
                            <div className="form-control w-full max-w-xs mb-4">
                                <input type="text"
                                    placeholder="Your Phone Number"
                                    className="input input-bordered w-full max-w-xs"
                                    {...register("phone", {
                                        required: {
                                            value: true,
                                            message: 'Phone number is required'
                                        }
                                    })} />

                                <label className="label">
                                    {errors.phone?.type === 'required' && <span className="label-text-alt text-red-500">{errors.phone.message}</span>}
                                </label>
                            </div>


                            {/* order quantity */}
                            <div className="form-control w-full max-w-xs mb-4" onBlur={handleQuantity}>

                                <input type="number"
                                    placeholder="Order Quantity"
                                    className="input input-bordered w-full max-w-xs"
                                    min={product?.minQnt}
                                    max={product?.availableQnt}
                                    {...register("quantity", {
                                        required: {
                                            value: true,
                                            message: 'Quantity is required'
                                        },

                                    })} />

                                <label className="label">
                                    {errors.quantity?.type === 'required' && <span className="label-text-alt text-red-500">{errors.quantity.message}</span>}
                                    <p className='text-red-500 text-center' style={{ fontSize: '12px' }}><span>{qntError}</span></p>
                                </label>
                            </div>

                            <input className='btn mt-4 w-full max-w-xs text-white' type="submit" value='Order Now' disabled={disable} />
                        </form>


                    </div>
                </div>
            </div>



        </div>
    );
};

export default Purchase;