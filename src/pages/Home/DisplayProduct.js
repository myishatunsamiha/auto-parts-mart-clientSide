import React from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import Loading from '../Shared/Loading';

const DisplayProduct = () => {
    const { data: products, isLoading } = useQuery('products', () => fetch('https://peaceful-badlands-33828.herokuapp.com/producthome').then(res => res.json()));


    if (isLoading) {
        return <Loading></Loading>;
    }

    return (
        <div>
            <div className='my-5 p-10'>
                <p className='text-4xl font-bold text-gray-700 text-center p-4'>Car Parts</p>


                <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-5'>
                    {
                        products?.map(product =>
                            <div key={product._id} className="card bg-base-100 shadow-xl">
                                <figure><img src={product.img} className='w-full' alt="Shoes" /></figure>
                                <div className="card-body">
                                    <p>name:               <span className='font-bold text-base'>{product.name}</span></p>
                                    <p>description:        <span className='font-bold text-base' title={product.description}>{product.description.slice(0, 40)}...</span></p>
                                    <p>min order quantity: <span className='font-bold text-base'>{product.minQnt}</span></p>
                                    <p>available quantity: <span className='font-bold text-base'>{product.availableQnt}</span></p>
                                    <p>per unit price:     <span className='font-bold text-base'>${product.price}</span></p>
                                    <Link to={`/purchase/${product._id}`}><button className="btn btn-primary">Purchase</button></Link>
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