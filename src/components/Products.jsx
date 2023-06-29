import React from 'react';
import { useQuery } from '@tanstack/react-query'
import { getProduct } from '../api/firebase'
import ProductCard from './ProductCard';


export default function Products() {
  const { isLoading, error, data:products } = useQuery( ['products'], getProduct);
  console.log('products??', products)


  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <ul>
      { products && products.map( product => <ProductCard key={product.id} product={product} />  ) }
      </ul>
    </div>
  )
}
