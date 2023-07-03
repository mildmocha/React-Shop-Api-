import React from 'react';
import { getCart, deleteCartItem } from '../api/firebase';
import { useAuthContext } from '../components/context/AuthContext';
import { useQuery , useMutation, QueryClient} from '@tanstack/react-query';
import CartItem from '../components/CartItem';

export default function MyCart() {
  const { uid } = useAuthContext();
  const { isLoading, data:products } = useQuery(['carts'],()=> getCart(uid));

  const mutation = useMutation((productId) => deleteCartItem(uid, productId), {
    onSuccess: () => {
      // 삭제 후 상품 목록을 갱신하기 위해 다시 가져옴
      QueryClient.invalidateQueries(['carts']);
    },
  });


  if(isLoading) return <p>Loading...</p>
  const handleDelete = (productId) => {
    mutation.mutate(productId);
  };

  return (
    <section className='w-full max-w-screen-xl m-auto py-24 md:py-40'>
      <div>
        <h2 className='text-center text-2xl'>내 장바구니</h2>
        <div>
          <ul> 
            {products&& products.map((product) => (
                <div key={product.id} className="flex items-center">
                  <CartItem product={product} uid={uid} />
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="ml-2 text-red-500"
                  >
                    삭제
                  </button>
                </div>
              ))}

          </ul>
        </div>
      </div>
    </section>
  );
}
