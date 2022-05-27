import React from 'react';
import { GlobeIcon } from '@heroicons/react/solid'
import { UserGroupIcon } from '@heroicons/react/solid'
import { ThumbUpIcon } from '@heroicons/react/solid'

const BusinessSummary = () => {
    return (
        <div className='bg-gray-400'>
            <p className='text-4xl font-bold text-white text-center pt-4 pb-2'>Our Business Overview</p>
            <div className='grid md:grid-cols-3 gap-5 p-10'>
                <div className='flex flex-col justify-center items-center rounded shadow-lg bg-[#f3f1e9]'>
                    <GlobeIcon className="h-14 w-14 text-gray-600" />
                    <p className='text-5xl font-bold text-blue-400'>88</p>
                    <p className='text-xl font-bold text-gray-600'>Countries</p>
                </div>
                <div className='flex flex-col justify-center items-center rounded shadow-lg bg-[#f3f1e9]'>
                    <UserGroupIcon className="h-14 w-14 text-gray-600" />
                    <p className='text-5xl font-bold text-blue-400'>1286+</p>
                    <p className='text-xl font-bold text-gray-600'>Satisfied Clients</p>
                </div>
                <div className='flex flex-col justify-center items-center rounded shadow-lg bg-[#f3f1e9]'>
                    <ThumbUpIcon className="h-14 w-14 text-gray-600" />
                    <p className='text-5xl font-bold text-blue-400'>1080+</p>
                    <p className='text-xl font-bold text-gray-600'>Reviews</p>
                </div>
            </div>
        </div>
    );
};

export default BusinessSummary;