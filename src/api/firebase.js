import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { getDatabase, get, ref, set, remove} from "firebase/database";
import uuid from "react-uuid";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
};

const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const auth = getAuth();

export function login() {
  return signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      return user;
    })
    .catch(console.error);
}

export async function logout() {
  return signOut(auth).then(() => null);
}

export function onUserStateChange(callback) {
  onAuthStateChanged(auth, async (user) => {
    const updatedUser = user ? await adminUser(user) : null;
    callback(updatedUser);
  });
}

const database = getDatabase(app);

async function adminUser(user) {
  return get(ref(database, "admins"))
  .then((snapshot) => {
    if (snapshot.exists()) {
      const admins = snapshot.val();
      const isAdmin = admins.includes(user.uid);
      return { ...user, isAdmin };
    }
    return user;
  });
}
export async function addNewProduct(product, image) {
  const id = uuid();
  return set(ref(database, `products/${id}`), {
    ...product,
    id,
    price: parseInt(product.price),
    options: product.options.split(","),
    image
  })
}
export async function getProduct(){
  return get(ref(database, 'products'))
    .then((snapshot) => {
      if(snapshot.exists()){
        return Object.values(snapshot.val());
      }
    })
}

//사용자의 카트에 추가하거나 업데이트
export async function addOrUpdateToCart(userId,product){
  return set(ref(database,`carts/${userId}/${product.id}`),product)
}

//특정 사용자의 카트를 가져옴
export async function getCart(userId){
  return get(ref(database, `carts/${userId}`))
    .then((snapshot) => {
      const items = snapshot.val() || {};
        return Object.values(items);    
    })
}


export async function deleteCartItem (userId,product){
  try{ await remove(ref(database, `carts/${userId}/${product.id}`));
 return true;
} catch (error) {
  throw new Error();
} 
}





