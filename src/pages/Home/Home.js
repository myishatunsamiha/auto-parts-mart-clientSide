import React from 'react';
import Banner from './Banner';
import Footer from '../Shared/Footer';
import BusinessSummary from './BusinessSummary';


const Home = () => {
    return (
        <div className=''>
            <Banner></Banner>
            <BusinessSummary></BusinessSummary>
            <Footer></Footer>
        </div>
    );
};

export default Home;