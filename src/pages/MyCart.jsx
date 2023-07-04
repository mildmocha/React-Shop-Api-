import React from "react";
import { PiPlusCircleThin, PiEquals } from "react-icons/pi";
import { getCart } from "../api/firebase";
import { useAuthContext } from "../components/context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import CartItem from "../components/CartItem";
import Button from "../components/ui/Button";

const SHIPPING = 50; //배송액
const MONEY_CLASS = "text-2xl text-red-700";

export default function MyCart() {
  const { uid } = useAuthContext();
  const { isLoading, data: products } = useQuery(
    ["carts", uid || ""],
    () => getCart(uid),
    { staleTime: 1000 }
  );

  if (isLoading) return <p>Loading...</p>;
  const hasProduct = products && products.length > 0;

  const totalPrice =
    products &&
    products.reduce(
      (sum, value) => sum + (parseInt(value.price) * value.quantity), 0)
    ;

  return (
    <section className="w-full max-w-screen-xl m-auto py-24 md:py-40">
      <div>
        <h2 className="text-center text-2xl">내 장바구니</h2>
        <div>
          <ul>
            {!hasProduct && <p>장바구니 빔</p>}
            {products &&
              products.map((product) => (
                <div key={product.id} className="flex items-center">
                  <CartItem product={product} uid={uid} />
                </div>
              ))}
          </ul>
          <div>
            <div>
              <p className={MONEY_CLASS}>{`₩ ${totalPrice}`} </p>
            </div>
            <PiPlusCircleThin />
            <div> 배송액</div>
            <p className={MONEY_CLASS}>₩ {SHIPPING}</p>
          </div>
          <PiEquals />
          <div>
            총가격
            <p className={MONEY_CLASS}>₩ {totalPrice + SHIPPING}</p>
          </div>
        </div>
        <div>
          <Button text="주문" />
        </div>
      </div>
    </section>
  );
}
