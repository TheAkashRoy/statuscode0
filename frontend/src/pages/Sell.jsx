import React from 'react'
import { useAuth0 } from "@auth0/auth0-react";

const Sell = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  console.log("User",user);
  if (isLoading) {
    return <div>Loading ...</div>;
  }
console.log("User details",user);
  return (
    <div className='text-white'>
      sell page
     {isAuthenticated && (
        <div>
          <h2>{user.name}</h2>
          <p>{user.email}</p>
        </div>
      )}
    </div>
  )
}

export default Sell
