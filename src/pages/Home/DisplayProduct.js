import React from 'react';
import { useQuery } from 'react-query';
import Loading from '../Shared/Loading';

const DisplayProduct = () => {
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
        <div>
            <div className='my-5 p-10'>
                <p className='text-4xl font-bold text-gray-700 text-center p-4'>Car Parts</p>


                <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-5'>
                    {
                        products.map(product =>
                            <div class="card bg-base-100 shadow-xl">
                                <figure><img src={product.img} className='w-full' alt="Shoes" /></figure>
                                <div class="card-body">
                                    <p>name: {product.name}</p>
                                    <p>description: {product.description}</p>
                                    <p>min order quantity: {product.minQnt}</p>
                                    <p>available quantity: {product.availableQnt}</p>
                                    <p>per unit price: {product.price}</p>
                                    <button class="btn btn-primary">Purchase</button>
                                </div>
                            </div>
                        )
                    }
                </div>

            </div>
        </div>
    );
};

export default DisplayProduct;