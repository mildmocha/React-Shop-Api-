import React from 'react'

export default function ProductCard({product: {image,title,price,category}}) {
  return (
    <li className='rounded-sm hover:shadow-xl hover:scale-105 cursor-pointer transition-all duration-300 pb-6'>
      <img className='w-full' src={image} alt={title} />
      <div className='flex justify-between items-center mt-6 mb-2 px-2'>
        <h3 className='truncate'>{title}</h3>
        <p className=' text-red-700 text-sm'>{`₩${price}`}</p>
      </div>
      <p className='text-sm text-slate-400 pl-2'>{category}</p>
    </li>
  )
}
