import React from 'react';
import Banner from './Banner';
import Footer from '../Shared/Footer';
import BusinessSummary from './BusinessSummary';
import Review from './Review';
import ServiceNature from './ServiceNature';
import HightLights from './HightLights';
import './Home.css';
import DisplayProduct from './DisplayProduct';


const Home = () => {
    return (
        <div className='bgImg'>
            <Banner></Banner>
            <BusinessSummary></BusinessSummary>
            <DisplayProduct></DisplayProduct>

            {/* extra section  */}
            <ServiceNature></ServiceNature>

            <Review></Review>

            {/* extra section  */}
            <HightLights></HightLights>
            <Footer></Footer>
        </div>
    );
};

export default Home;