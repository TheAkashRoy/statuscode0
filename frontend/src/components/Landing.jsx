import React from 'react'
import {useAuth0} from '@auth0/auth0-react'
import {loginWithRedirect} from '@auth0/auth0-react'
const Landing = () => {
  const {logout} = useAuth0();
  const { user, isAuthenticated, isLoading } = useAuth0();
  const {loginWithRedirect} = useAuth0();

  return (
    <div className='p-4'>
   <div className='bg-gray-900 flex p-4 justify-between items-center rounded-full'>
   <h1 className='text-white font-white text-3xl'>ENERGYLO</h1>
   <div className='flex gap-3'>
   <button className='text-white font-white text-xl'>Buy</button>
   <button className='text-white font-white text-xl'>Sell</button>
   {
    isAuthenticated?(
      <button onClick={()=>logout()} className='text-xl font-semibold bg-white p-3'>Logout</button>      ):(
        <button onClick={()=>loginWithRedirect()}
        className=' text-xl font-semibold bg-white p-3'>
        Login</button>    )
  }
   
   </div>
   </div>
    </div>
  )
}

export default Landing
