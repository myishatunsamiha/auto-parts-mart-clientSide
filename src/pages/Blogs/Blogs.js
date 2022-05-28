import React, { useEffect, useState } from 'react';

const Blogs = () => {
    const [blogs, setBlogs] = useState([]);
    useEffect(() => {
        fetch('blogs.json')
            .then(res => res.json())
            .then(data => setBlogs(data))
    }, [])
    return (
        <div className='p-20'>

            {
                blogs.map(blog => <>
                    <p className='text-2xl font-bold text-gray-900'>{blog.q}</p>
                    <p className='text-xl text-gray-900'>{blog.ans}</p>
                    <br /><br />
                </>)
            }
        </div>
    );
};

export default Blogs;


