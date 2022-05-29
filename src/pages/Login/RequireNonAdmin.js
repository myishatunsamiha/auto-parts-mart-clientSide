import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate, useLocation } from 'react-router-dom';
import auth from '../../firebase.init';
import UseAdmin from '../../hooks/UseAdmin';
import Loading from '../Shared/Loading';

const RequireNonAdmin = ({ children }) => {
    const [user, loading, error] = useAuthState(auth);
    const [admin, adminLoading] = UseAdmin(user);
    const location = useLocation();

    // it takes time to check whether the user is logged in or not from the firebase. For that reason, when the user reloads the page it would be redirected to the login page as the response takes a little time.
    if (loading || adminLoading) {
        return <Loading></Loading>;
    }

    if (!user) {
        return <Navigate to='/login' state={{ from: location }} replace></Navigate>;
    }

    if (user && admin) {
        return <Navigate to='/' state={{ from: location }} replace></Navigate>;
    }

    return children;
};

export default RequireNonAdmin;