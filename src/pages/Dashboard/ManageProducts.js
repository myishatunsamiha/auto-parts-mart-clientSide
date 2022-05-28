import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';
import Loading from '../Shared/Loading';

const ManageProducts = () => {
    const [deletingProduct, setDeletingProduct] = useState(null);

    const { data: products, isLoading, refetch } = useQuery('products', () => fetch('http://localhost:5000/Product', {
        headers: {
            method: 'GET',
            'authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => res.json()));


    if (isLoading) {
        return <Loading></Loading>
    }

    const handleDelete = product => {

        fetch(`http://localhost:5000/product/${product._id}`, {
            method: 'DELETE',
            headers: {
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount) {
                    toast.success(`${product.name} is deleted successfully`);
                    setDeletingProduct(null);
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
                            <th>Image</th>
                            <th>Name</th>
                            <th>Price(per unit)</th>
                            <th>Min Qty</th>
                            <th>Available Qty</th>
                            <th>Delete</th>
                            <th>Update</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.map((product, index) =>
                                <tr key={product._id}>
                                    <th>{index + 1}</th>
                                    <td>
                                        <div class="avatar">
                                            <div class="w-12 rounded">
                                                <img src={product.img} alt={product.name} />
                                            </div>
                                        </div>
                                    </td>
                                    <td>{product.name}</td>
                                    <td>{product.price}</td>
                                    <td>{product.minQnt}</td>
                                    <td>{product.availableQnt}</td>
                                    <td>
                                        <label for="delete-confirm-modal" class="btn btn-xs btn-error" onClick={() => setDeletingProduct(product)}>Delete</label>
                                    </td>

                                    <td>
                                        <button class="btn btn-xs btn-warning">Update</button>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>


            {/* delete confirmation modal */}

            {deletingProduct &&
                <>
                    <input type="checkbox" id="delete-confirm-modal" class="modal-toggle" />
                    <div class="modal modal-bottom sm:modal-middle">
                        <div class="modal-box">
                            <h3 class="font-bold text-lg">Are you sure you want to delete Product {deletingProduct.name}?</h3>
                            <div class="modal-action">
                                <button class="btn btn-xs btn-error" onClick={() => handleDelete(deletingProduct)}>Delete</button>
                                <label for="delete-confirm-modal" class="btn btn-xs">Cancel</label>
                            </div>
                        </div>
                    </div>
                </>
            }

        </div>
    );
};

export default ManageProducts;