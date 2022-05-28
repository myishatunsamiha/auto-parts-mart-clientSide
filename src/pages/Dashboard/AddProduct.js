import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const AddProduct = () => {
    const { register, formState: { errors }, handleSubmit, reset } = useForm();

    const imageStorageKey = 'e456faf8f447681928ea7794830bfde1';

    const onSubmit = async data => {
        const image = data.image[0];
        const formData = new FormData();
        formData.append('image', image);

        // send image to third party storage imgbb
        const url = `https://api.imgbb.com/1/upload?key=${imageStorageKey}`;
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(res => {
                console.log(res);
                if (res.success) {
                    const img = res.data.url;

                    // create the product(car parts) object
                    const product = {
                        name: data.name,
                        description: data.description,
                        minQnt: data.minQnt,
                        availableQnt: data.availableQnt,
                        price: data.price,
                        img: img
                    }

                    // post a product(car parts) to mongodb database
                    fetch('http://localhost:5000/product', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                            'authorization': `Bearer ${localStorage.getItem('accessToken')}`

                        },
                        body: JSON.stringify(product)
                    })
                        .then(res => res.json())
                        .then(inserted => {
                            if (inserted.insertedId) {
                                toast.success('Product added successfully.');
                                reset();
                            } else {
                                toast.error('Could not add the product!');

                            }
                        })
                }
            })

        console.log(data);
        // navigate('/appointment');
    }
    return (
        <div className='w-1/2 mx-auto'>
            <form onSubmit={handleSubmit(onSubmit)} className='w-full'>
                {/* name field  */}
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">product name</span>
                    </label>
                    <input type="text"
                        className="input input-bordered w-full max-w-xs"
                        {...register("name", {
                            required: {
                                value: true,
                                message: 'Product name is required'
                            }
                        })} />
                    <label className="label">
                        {errors.name?.type === 'required' && <span className="label-text-alt text-red-500">{errors.name.message}</span>}
                    </label>
                </div>


                {/* minimum order quantity field  */}
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Minimum Order Quantity</span>
                    </label>
                    <input type="number"
                        className="input input-bordered w-full max-w-xs"
                        {...register("minQnt", {
                            required: {
                                value: true,
                                message: 'Minimum order quantity is required'
                            }
                        })} />
                    <label className="label">
                        {errors.minQnt?.type === 'required' && <span className="label-text-alt text-red-500">{errors.minQnt.message}</span>}
                    </label>
                </div>

                {/* available quantity field  */}
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Available Quantity</span>
                    </label>
                    <input type="number"
                        className="input input-bordered w-full max-w-xs"
                        {...register("availableQnt", {
                            required: {
                                value: true,
                                message: 'Available quantity is required'
                            }
                        })} />
                    <label className="label">
                        {errors.availableQnt?.type === 'required' && <span className="label-text-alt text-red-500">{errors.availableQnt.message}</span>}
                    </label>
                </div>

                {/* price field  */}
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Price</span>
                    </label>
                    <input type="number"
                        className="input input-bordered w-full max-w-xs"
                        {...register("price", {
                            required: {
                                value: true,
                                message: 'Price is required'
                            }
                        })} />
                    <label className="label">
                        {errors.price?.type === 'required' && <span className="label-text-alt text-red-500">{errors.price.message}</span>}
                    </label>
                </div>



                {/* image file field  */}
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Photo</span>
                    </label>
                    <input type="file"
                        className="input input-bordered w-full max-w-xs"
                        {...register("image", {
                            required: {
                                value: true,
                                message: 'Image is required'
                            },
                            pattern: {
                                value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                                message: 'Provide a valid email'
                            }
                        })} />
                    <label className="label">
                        {errors.image?.type === 'required' && <span className="label-text-alt text-red-500">{errors.image.message}</span>}
                    </label>
                </div>


                {/* description field  */}
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Description</span>
                    </label>
                    <textarea class="textarea" {...register("description")} placeholder="description"></textarea>
                </div>

                {/* submit button */}
                <input className='btn w-full max-w-xs text-white mt-10' type="submit" value='Add Product' />
            </form>
        </div>
    );
};

export default AddProduct;