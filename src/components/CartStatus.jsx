import React from "react";
import { BsHandbag } from "react-icons/bs";
import { getCart } from "../api/firebase";
import { useAuthContext } from "./context/AuthContext";
import { useQuery } from "@tanstack/react-query";

export default function CartStatus() {
  const { uid } = useAuthContext();
  const { data: products } = useQuery(
    ["carts", uid || ""],
    () => getCart(uid),
    { staleTime: 1000 }
  );
  return (
    <div className="relative">
     
      <BsHandbag />
      {products && <p>{products.length}</p>}
    </div>
  );
}
