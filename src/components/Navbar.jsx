import React from 'react'
import { Link } from 'react-router-dom';
import { HiPencilAlt } from "react-icons/hi";
import User from './User';
import Button from './ui/Button';
import { useAuthContext } from './context/AuthContext';

export default function Navbar() {

  const {user,login,logout} = useAuthContext()

  // const [user, setUser] = useState(); //로그인여부(로그인정보)

  // //화면이 마운트(리로드 될때) 로그인이 되어있는 아닌지 상태를 알아보는 함수 호출
  // useEffect(() => {
  //   onUserStateChange((user)=> {
  //     setUser(user)
  //     console.log('user',user)
  //   });
  // }, [])
  

  return (
    <div className='border-b border-slate-300'>
      <div className='w-full max-w-screen-2xl m-auto'>
        <header className='flex justify-between items-center p-5'>
          <h1 className='text-xl md:text-3xl font-logoFont tracking-widest'>DCBA<span className='pl-3 md:pl-6'>GFE</span></h1>

          <nav className='flex items-center gap-4'>
            <Link to='/products'>Product</Link>
            {user && <Link to='/cart'>Cart</Link> }
            {user && user.isAdmin && (<Link to='/products/new'><HiPencilAlt /></Link>)}
            {user && <User user={user} />}
            {!user && <Button onClick={login} text={'login'} />}
            {user && <Button onClick={logout} text={'logout'} />}
          </nav>
        </header>
      </div>
    </div>
    
  )
}
