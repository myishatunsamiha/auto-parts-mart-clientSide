import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import Loading from '../Shared/Loading';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';


const stripePromise = loadStripe('pk_test_51IJ2xsFn6cvMBriYaCoTYsCyXqEpgm1VgMAsNofHm85wROuqecV1FeqGFPN7z43SLiNLmVCtklzDxaJBprrERke700cEzYVyiT');

const Payment = () => {
    const { id } = useParams();
    const url = `https://peaceful-badlands-33828.herokuapp.com/order/${id}`;

    const { data: order, isLoading } = useQuery(['orderPayment', id], () => fetch(url, {
        method: 'GET',
        headers: {
            'authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => res.json()));

    if (isLoading) {
        return <Loading></Loading>;
    }

    return (
        <div>
            <h2 className="text-2xl text-purple-500">Payment</h2>

            <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                    <p>Hello, {order.userName}</p>
                    <h2 className="card-title">Please pay for {order.productName}</h2>
                    <p>Order Quantity: <span className='text-orange-700'>{order.orderedQnt}</span></p>
                    <p>Per Unit Price: <span className='text-orange-700'>{order.price}</span></p>
                    <p>Please pay: ${order.price * order.orderedQnt}</p>
                </div>
            </div>

            <div className="card w-96 bg-base-100 shadow-xl mt-20">
                <div className="card-body">
                    <Elements stripe={stripePromise}>
                        <CheckoutForm order={order} />
                    </Elements>
                </div>
            </div>
        </div>
    );
};

export default Payment;