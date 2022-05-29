import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import UseAdmin from '../../hooks/UseAdmin';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';


const Dashboard = () => {
    const [user] = useAuthState(auth);
    const [admin] = UseAdmin(user);

    return (
        <div className="drawer drawer-mobile">
            <input id="dashboard-sidebar" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                {/* <!-- Page content here --> */}
                {/* <h2 className='text-3xl font-bold text-purple-500'>Dashboard</h2> */}
                <Outlet></Outlet>
            </div>
            <div className="drawer-side">
                <label htmlFor="dashboard-sidebar" className="drawer-overlay"></label>
                <ul className="menu p-4 overflow-y-auto w-50 bg-gray-500 text-white">

                    {/* <!-- link for both admin and non-admin user --> */}
                    <li><Link to='/dashboard'>My Profile</Link></li>


                    {/* <!-- link for only non-admin user --> */}
                    {!admin &&
                        <>
                            <li><Link to='/dashboard/myOrders'>My Orders</Link></li>
                            <li><Link to='/dashboard/addReview'>Add a Review</Link></li>
                        </>
                    }


                    {/* <!-- link for only admin user --> */}
                    {admin &&
                        <>
                            <li><Link to='/dashboard/allOrders'>Manage All Orders</Link></li>
                            <li><Link to='/dashboard/addProduct'>Add a Product</Link></li>
                            <li><Link to='/dashboard/makeAdmin'>Make Admin</Link></li>
                            <li><Link to='/dashboard/manageProducts'>Manage Products</Link></li>
                        </>
                    }




                    {/* <li><Link to='/dashboard/users'>All Users</Link></li> */}


                </ul>

            </div>
        </div>
    );
};

export default Dashboard;