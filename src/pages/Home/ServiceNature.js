import React from 'react';
import { HomeIcon } from '@heroicons/react/solid'
import { CreditCardIcon } from '@heroicons/react/solid'
import { SwitchHorizontalIcon } from '@heroicons/react/solid'
import { GiftIcon } from '@heroicons/react/solid'

const ServiceNature = () => {
    return (
        <div className='bg-gray-400'>
            <div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-5 p-10'>
                <div className='flex flex-row justify-center md:justify-start items-center'>
                    <div><HomeIcon className="h-12 w-12 text-gray-700" /></div>
                    <div className='mx-2'>
                        <p className='font-bold text-gray-100'>FREE HOME DELIVERY</p>
                        <p><span className='text-gray-100'>Worldwide from 500BDT</span></p>
                    </div>
                </div>

                <div className='flex flex-row justify-center md:justify-start items-center'>
                    <div><SwitchHorizontalIcon className="h-12 w-12 text-gray-700" /></div>
                    <div className='mx-2'>
                        <p className='font-bold text-gray-100'>EASY RETURNS</p>
                        <p><span className='text-gray-100'>2 months for free returns</span></p>
                    </div>
                </div>

                <div className='flex flex-row justify-center md:justify-start items-center'>
                    <div><CreditCardIcon className="h-12 w-12 text-gray-700" /></div>
                    <div className='mx-2'>
                        <p className='font-bold text-gray-100'>EASY PAYMENT</p>
                        <p><span className='text-gray-100'>Credit cards available</span></p>
                    </div>
                </div>

                <div className='flex flex-row justify-center md:justify-start items-center'>
                    <div><GiftIcon className="h-12 w-12 text-gray-700" /></div>
                    <div className='mx-2'>
                        <p className='font-bold text-gray-100'>FREE GIFTS</p>
                        <p><span className='text-gray-100'>Get discounts and gifts</span></p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ServiceNature;