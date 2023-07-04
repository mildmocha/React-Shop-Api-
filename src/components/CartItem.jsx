import React from 'react'
import { PiMinusSquareLight, PiPlusSquareLight, PiXBold } from "react-icons/pi";
import {useMutation, useQueryClient} from '@tanstack/react-query'
import { addOrUpdateToCart, deleteCartItem } from '../api/firebase';


export default function CartItem({product, product: { id,quantity, image, title, options,price}, uid}) {

  //useQuery Mutation -실시간 업데이트
  const queryClient = useQueryClient();
  const addOrUpdatePlus = useMutation((product)=>
  addOrUpdateToCart(uid,{...product,quantity:quantity+1}),{
    onSuccess: ()=> queryClient.invalidateQueries(['carts', uid])
    //carts 키를 가진 쿼리를 무효화 (+uid 확인 바로 업데이트)
  });
  const addOrUpdateMinus = useMutation((product)=>
  addOrUpdateToCart(uid,{...product,quantity:quantity-1}),{
    onSuccess: ()=> queryClient.invalidateQueries(['carts', uid])
  });
  const removeCart = useMutation(()=>
  deleteCartItem(uid,id),{
    onSuccess: () => queryClient.invalidateQueries(['carts',uid])
  });
const handleMinus =()=>{
  if(quantity<2) return ; //1일때 못하게하는
  addOrUpdateMinus.mutate(product)
}
const handlePlus = ()=>{
  addOrUpdatePlus.mutate(product)
}
const handleDelete = ()=> removeCart.mutate(uid,id);

  



  return (
    <li className='flex justify-between'>
      <img className='w-24 md:w-36 rounded-lg' src={image} alt={title} />
      <div className='flex-1 flex justify-between ml-4'>
      <div>
        <p>{title}</p>
        <p>{options}</p>
        <p>{`₩${price}`}</p>
      </div>
      <div>
        <PiMinusSquareLight onClick={handleMinus}></PiMinusSquareLight>
        <span>{quantity}</span>
        <PiPlusSquareLight className='text-slate-400' onClick={handlePlus} /> 

        <PiXBold className='text-2xl' onClick={handleDelete}/>

        </div> 
      </div>
    </li>
  )
}
