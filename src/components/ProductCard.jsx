import React from 'react'

export default function ProductCard({product: {image,title,price,category}}) {
  return (
    <li>
      <img src={image} alt={title} />
      <div>
        <h3>{title}.title</h3>
        <p>{price}</p>
      </div>
      <p>{category}</p>
    </li>
  )
}
