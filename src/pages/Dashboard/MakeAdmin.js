import React from 'react';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';
import Loading from '../Shared/Loading';

const MakeAdmin = () => {
    // getting all the users from db
    const { data: users, isLoading, refetch } = useQuery('users', () => fetch('http://localhost:5000/user', {
        method: 'GET',
        headers: {
            'authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => res.json()));

    if (isLoading) {
        return <Loading></Loading>
    }

    // updating the user 
    const makeAdmin = (user) => {
        fetch(`http://localhost:5000/user/admin/${user.email}`, {
            method: 'PUT',
            headers: {
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    console.log(data);
                    toast.success('Admin request is successful');
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
                            <th>Email</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, index) =>
                                <tr key={index}>
                                    <th>{index + 1}</th>
                                    <th>{user.email}</th>
                                    <th>{user.role !== 'admin' && <button className='btn btn-xs' onClick={() => makeAdmin(user)}>Make Admin</button>}</th>
                                </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MakeAdmin;