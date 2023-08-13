import React from 'react'
import {useAuth0} from '@auth0/auth0-react'
import {loginWithRedirect} from '@auth0/auth0-react'
import hero from '../assets/hero.png'
import {Link} from 'react-router-dom'
const Landing = () => {
  const {logout} = useAuth0();
  const { user, isAuthenticated, isLoading } = useAuth0();
  const {loginWithRedirect} = useAuth0();

  return (
    <div className='p-4'>
   <div className='bg-black shadow-2xl flex p-3 justify-between items-center rounded-full'>
   <h1 className='text-white font-white text-xl font-bold px-3'>ENERGYLO.</h1>
   <div className='flex gap-3 px-3'>  
   {
    isAuthenticated?(
      <>
     <Link to="/buy"> <button className=' text-sm px-4 py-1 rounded-full bg-white font-semibold'>Buy</button></Link>
   <Link to="/sell"><button className=' text-sm bg-white font-semibold px-4 py-1 rounded-full'>Sell</button></Link>
      <button onClick={()=>logout()} className='text-xl font-semibold bg-white px-2'>Logout</button></>      ):(
        <button onClick={()=>loginWithRedirect()}
        className=' text-sm border-[1px] px-4 py-2 rounded-full text-white'>
        Login</button>    )
  } 
   </div>
   </div>
   <div className='flex flex-row px-28 mt-20 justify-between items-center'>
    <div className='flex flex-col gap-3 w-[40%]'>
      <h2 className='text-[#05FF00] font-semibold'>EFFICIENT RENEWABLE ENERGY UTILIZATION</h2>
      <h1 className='text-5xl text-white font-extrabold'>DECENTRALIZED RENEWABLE ENERGY PLATFORM</h1>
      <p className='text-white leading-5 font-light'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sollicitudin efficitur libero egestas tempus. Vivamus eros orci, porta eu purus ac, vehicula luctus dui. </p>
    </div>
    <div className='w-[45%]'>
      <img src={hero} alt="hero-img" />
    </div>
   </div>
    </div>
  )
}

export default Landing