import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';
import Loading from '../Shared/Loading';

const ManageAllOrders = () => {
    // const [orders, setOrders] = useState([]);
    const [user] = useAuthState(auth);
    const navigate = useNavigate();
    const [deletingOrder, setDeletingOrder] = useState(null);

    const { data: orders, isLoading, refetch } = useQuery(['allOrders', user], () => fetch(`http://localhost:5000/allorder`, {
        headers: {
            method: 'GET',
            'authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => res.json()));


    if (isLoading) {
        return <Loading></Loading>;
    }


    const handleShipping = order => {

        fetch(`http://localhost:5000/shipOrder/${order._id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                refetch();
                console.log(data);
            })
    }








    const handleDelete = order => {

        fetch(`http://localhost:5000/order/${order._id}`, {
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
            <div class="overflow-x-auto">
                <table class="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Img</th>
                            <th>Product Name</th>
                            <th>Price(Per Unit)</th>
                            <th>Order Qty</th>
                            <th>Email</th>
                            <th>Order Status</th>
                            <th>Cancel/ship</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders.map((order, index) =>
                                <tr key={index}>
                                    <th>{index + 1}</th>
                                    <th>
                                        <div class="avatar">
                                            <div class="w-16 rounded">
                                                <img src={order.img} alt="Tailwind-CSS-Avatar-component" />
                                            </div>
                                        </div>
                                    </th>
                                    <th>{order.productName}</th>
                                    <th>{order.price}</th>
                                    <th>{order.orderedQnt}</th>
                                    <th>{order.userEmail}</th>
                                    <th>
                                        {!order.paid &&
                                            <div>
                                                <span className='text-success'>Unpaid</span>

                                            </div>
                                        }
                                        {(order.paid &&
                                            !order.shipped) && <div><span className='text-success'>Pending</span></div>}

                                        {(order.paid &&
                                            order.shipped) && <div><span className='text-success'>Shipped</span></div>}

                                    </th>
                                    <td>
                                        {
                                            !order.paid && <label for="delete-confirm-modal" class="btn btn-xs btn-error" onClick={() => setDeletingOrder(order)}>Cancel</label>
                                        }

                                        {
                                            (order.paid && !order.shipped) && <label for="delete-confirm-modal" class="btn btn-xs btn-error" onClick={() => handleShipping(order)}>Ship</label>
                                        }

                                    </td>
                                </tr>)
                        }

                    </tbody>
                </table>
            </div>


            {deletingOrder &&
                <>
                    <input type="checkbox" id="delete-confirm-modal" class="modal-toggle" />
                    <div class="modal modal-bottom sm:modal-middle">
                        <div class="modal-box">
                            <h3 class="font-bold text-lg">Are you sure you want to cancel your order?</h3>
                            <div class="modal-action">
                                <button class="btn btn-xs btn-error" onClick={() => handleDelete(deletingOrder)}>Delete</button>
                                <label for="delete-confirm-modal" class="btn btn-xs">Cancel</label>
                            </div>
                        </div>
                    </div>
                </>
            }
        </div>
    );
};

export default ManageAllOrders;