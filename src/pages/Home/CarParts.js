import React from 'react';
import { useQuery } from 'react-query';
import Loading from '../Shared/Loading';

const CarParts = () => {
    const { data: products, isLoading } = useQuery('products', () => fetch('http://localhost:5000/Product', {
        headers: {
            method: 'GET',
            'authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => res.json()));


    if (isLoading) {
        return <Loading></Loading>;
    }

    return (
        <div className='my-5 p-10'>
            <p className='text-4xl font-bold text-gray-700 text-center p-4'>Car Parts</p>

            <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-5'>
                <div class="card bg-base-100 shadow-xl">
                    <figure><img src="https://api.lorem.space/image/shoes?w=400&h=225" className='w-full' alt="Shoes" /></figure>
                    <div class="card-body">
                        <p>name: { }</p>
                        <p>description: { }</p>
                        <p>min order quantity: { }</p>
                        <p>available quantity: { }</p>
                        <p>per unit price: { }</p>
                        <button class="btn btn-primary">Purchase</button>
                    </div>
                </div>

                <div class="card bg-base-100 shadow-xl">
                    <figure><img src="https://api.lorem.space/image/shoes?w=400&h=225" alt="Shoes" /></figure>
                    <div class="card-body">
                        <h2 class="card-title">Shoes!</h2>
                        <p>If a dog chews shoes whose shoes does he choose?</p>
                        <div class="card-actions justify-end">
                            <button class="btn btn-primary">Buy Now</button>
                        </div>
                    </div>
                </div>

                <div class="card bg-base-100 shadow-xl">
                    <figure><img src="https://api.lorem.space/image/shoes?w=400&h=225" alt="Shoes" /></figure>
                    <div class="card-body">
                        <h2 class="card-title">Shoes!</h2>
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

export default CarParts;