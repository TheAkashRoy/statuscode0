import React from 'react'
import {useAuth0} from '@auth0/auth0-react'
import {loginWithRedirect} from '@auth0/auth0-react'
const Landing = () => {
  const {logout} = useAuth0();
  const { user, isAuthenticated, isLoading } = useAuth0();
  const {loginWithRedirect} = useAuth0();

  return (
    <div>
   <div className='bg-gray-800 flex m-8 justify-between items-center'>
   <h1>ENERGYLO</h1>
   <div>
   <button>Buy</button>
   <button>Sell</button>
   {
    isAuthenticated?(
      <button onClick={()=>logout()} text-xl font-semibold bg-white p-3>Logout</button>      ):(
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
