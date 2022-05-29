import { signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';
import Loading from '../Shared/Loading';

const MyOrders = () => {
    // const [orders, setOrders] = useState([]);
    const [user] = useAuthState(auth);
    const navigate = useNavigate();
    const [deletingOrder, setDeletingOrder] = useState(null);

    // useEffect(() => {
    //     if (user) {
    //         fetch(`https://peaceful-badlands-33828.herokuapp.com/order?email=${user.email}`,
    //             {
    //                 method: 'GET',
    //                 headers: {
    //                     'authorization': `Bearer ${localStorage.getItem('accessToken')}`
    //                 }
    //             }
    //         )
    //             .then(res => {
    //                 if (res.status === 401 || res.status === 403) { // if unauthorized or forbidden
    //                     signOut(auth);
    //                     localStorage.removeItem('accessToken');
    //                     navigate('/');
    //                 }
    //                 return res.json();
    //             })
    //             .then(data => {
    //                 setOrders(data)
    //             });
    //     }
    // }, [user]);


    const { data: orders, isLoading, refetch } = useQuery(['myOrders', user], () => fetch(`https://peaceful-badlands-33828.herokuapp.com/order?email=${user?.email}`, {
        headers: {
            method: 'GET',
            'authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => res.json()));


    if (isLoading) {
        return <Loading></Loading>
    }



    const handleDelete = order => {

        fetch(`https://peaceful-badlands-33828.herokuapp.com/order/${order._id}`, {
            method: 'DELETE',
            headers: {
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount) {
                    toast.success(`${order.productName} is deleted successfully`);
                    setDeletingOrder(null);
                    refetch();
                }
            })
    }


    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Img</th>
                            <th>Product Name</th>
                            <th>Price(Per Unit)</th>
                            <th>Order Qty</th>
                            <th>Payment</th>
                            <th>Cancel</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders?.map((order, index) =>
                                <tr key={index}>
                                    <th>{index + 1}</th>
                                    <th>
                                        <div className="avatar">
                                            <div className="w-16 rounded">
                                                <img src={order.img} alt="Tailwind-CSS-Avatar-component" />
                                            </div>
                                        </div>
                                    </th>
                                    <th>{order.productName}</th>
                                    <th>{order.price}</th>
                                    <th>{order.orderedQnt}</th>
                                    <th>
                                        {!order.paid && <Link to={`/dashboard/payment/${order._id}`}><button className='btn btn-xs btn-success'>Pay</button></Link>}
                                        {order.paid &&
                                            <div>
                                                <span className='text-success'>Paid</span>
                                                <p>Transaction id: <span className='text-success'>{order.transactionId}</span></p>
                                            </div>}
                                    </th>
                                    <td>
                                        {
                                            !order.paid && <label htmlFor="delete-confirm-modal" className="btn btn-xs btn-error" onClick={() => setDeletingOrder(order)}>Delete</label>
                                        }

                                    </td>
                                </tr>)
                        }

                    </tbody>
                </table>
            </div>


            {deletingOrder &&
                <>
                    <input type="checkbox" id="delete-confirm-modal" className="modal-toggle" />
                    <div className="modal modal-bottom sm:modal-middle">
                        <div className="modal-box">
                            <h3 className="font-bold text-lg">Are you sure you want to cancel your order?</h3>
                            <div className="modal-action">
                                <button className="btn btn-xs btn-error" onClick={() => handleDelete(deletingOrder)}>Delete</button>
                                <label htmlFor="delete-confirm-modal" className="btn btn-xs">Cancel</label>
                            </div>
                        </div>
                    </div>
                </>
            }
        </div>
    );
};

export default MyOrders;