import React from 'react'

export default function CartItem({product, product: { image, title, options,price}, uid}) {

  return (
    <li className='flex justify-between'>
      <img className='w-24' src={image} alt={title} />
      <div>
        <p>{title}</p>
        <p>{options}</p>
        <p>{`₩${price}`}</p>
      </div>
    </li>
  )
}
