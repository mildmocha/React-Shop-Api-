import React from 'react'
import { BsHandbag } from "react-icons/bs";
import { getCart } from '../api/firebase';

import { useAuthContext } from './context/AuthContext';
import { useQuery } from '@tanstack/react-query';

export default function CartStatus() {
  const {uid} = useAuthContext();
  const {data:products } = useQuery(['carts'],()=> getCart(uid));
  return (
    <div>
      <BsHandbag />
      {products && (<p>{products.length}</p>)}
    </div>
  )
}
