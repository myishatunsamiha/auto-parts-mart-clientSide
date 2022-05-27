import React from 'react';
import Banner from './Banner';
import Footer from '../Shared/Footer';
import BusinessSummary from './BusinessSummary';
import CarParts from './CarParts';
import Review from './Review';
import ServiceNature from './ServiceNature';
import HightLights from './HightLights';
import './Home.css';


const Home = () => {
    return (
        <div className='bgImg'>
            <Banner></Banner>
            <BusinessSummary></BusinessSummary>
            <CarParts></CarParts>

            {/* extra section  */}
            <ServiceNature></ServiceNature>

            <Review></Review>

            {/* extra section  */}
            <HightLights></HightLights>
        </div>
    );
};

export default Home;