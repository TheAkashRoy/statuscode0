import React,{useState} from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import {Link} from 'react-router-dom'
import Web3 from "web3";
import contractABI from "../abi/abi.json";
import axios from "axios";
import {AiOutlineSync} from "react-icons/ai"
const Sell = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const {logout} = useAuth0();
  console.log("User",user);
  const [web3, setWeb3] = useState();
  const [account, setAccount] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [contract, setContract] = useState(null);
  const [values, setValues] = useState([]);
  const contractAddress = "0xAf383eb2dA292cA415e1AaF88212f2704b331C43";
  const [price, setPrice] = useState(0);
  const [av, setAv] = useState(0);
  const [fv, setFv] = useState(0);
  const [isUser, setIsuser] = useState("False");


  async function loadWeb3() {
    if (window.ethereum) {
      const web3Instance = new Web3(window?.ethereum);

      try {
        // Request account access if needed
        await window.ethereum.enable();
        // Get the user's accounts
        const accounts = await web3Instance.eth.getAccounts();
        setAccount(accounts[0]);
        setIsConnected(true);
        setWeb3(web3Instance);
        {/*sending to databse for first time */ }
      } catch (error) {
        console.error("Error connecting to wallet:", error);
      }
    } else {
      console.error(
        "Web3 not found. Please install MetaMask or another Ethereum wallet extension."
      );
    }
  }

  const handleDisconnect = () => {
    setWeb3(null);
    setAccount("");
    setIsConnected(false);
  };
  const handleSync = async () => {
    console.log("Syncing");
    console.log("account", account);
    const response = await axios.post("https://energylobend.akashroy24.repl.co/isNew", {
      "wallet_address": account
    })
    console.log(response.data);

    if (response.data === "True") {
      const contractInstance = new web3.eth.Contract(
        contractABI,
        contractAddress,
        { from: account }
      );

      
        console.log("Contract", contractInstance);
        console.log("Contractabi", contractABI);

        setContract(contractInstance);
        const result = await contractInstance.methods
          .addUser(account, 100, 100)
          .send({ from: account });

        console.log("Smart contract result:", result);
      
        
      
        const meow = axios.post("https://energylobend.akashroy24.repl.co/validate", {
          "wallet_address": account,
          "actual_value": 100,
          "false_value": 100,
          "price": 0
        })
        console.log("Request sent")
      
    }else{
      const contractInstance = new web3.eth.Contract(
        contractABI,
        contractAddress,
        { from: account }
      )
      setContract(contractInstance);
      const result = await contractInstance.methods.getAllUsers().call();
      console.log("Smart contract result:", result);
      for(var i=0;i<result.length;i++){
        if(result[i].walletId===account){
          console.log(result[i].actualValue , result[i].falseValue )
          setAv(Number(result[i].actualValue));
          setFv(Number(result[i].falseValue));
        }
      }
        
  }
}

const handleUpdate = async () => {
  console.log("Updating");
  console.log(account,price)
  const response = await contract.methods.updatePriceByAddress(account , price).send({from:account});
  console.log(response);
}
  // if (isLoading) {
  //   return <div>Loading ...</div>;
  // }}
console.log("User details",user);
  return (
    <div className='p-4'>
    <div className='bg-black shadow-2xl flex p-3 justify-between items-center rounded-full'>
   <h1 className='text-white font-white text-xl font-bold px-3'><a href="/">ENERGYLO.</a></h1>
    
   {
    isAuthenticated &&(
      <div className='flex gap-3 px-3'>
     <Link to="/"> <button className=' text-sm px-4 py-1 rounded-full bg-white font-semibold'>Home</button></Link>
   <Link to="/buy"><button className=' text-sm bg-white font-semibold px-4 py-1 rounded-full'>Buy</button></Link>
      <button onClick={()=>logout()} className='text-xl font-semibold bg-white px-2'>Logout</button></div>      )
  } 
   </div>
     {/*isAuthenticated && (
        <div>
          <h2 className='text-white'>{user.name}</h2>
        </div>
     )*/}
      <div className="mt-10 ml-16  font-semibold ">
      <div className='flex flex-col gap-5'>
      {isConnected ? (
        <>
          <button onClick={handleDisconnect} className=' text-sm p-3 rounded-full bg-white font-semibold w-[150px]'>Disconnect Wallet</button>
          <p>Account: {account}</p>
        </>
      ) : (
        <button onClick={loadWeb3} className=' text-sm p-3 rounded-full bg-white font-semibold w-[150px]'>Connect wallet</button>
      )}
        <div className='flex flex-col gap-2  bg-gray-100 bg-opacity-30 backdrop-blur-md p-6 rounded-lg items-center w-[35vw] h-[60vh] justify-center border-[0.5px] border-white'>
        <button  className='bg-black text-white font-semibold p-3 rounded-full flex justify-center w-[50vw] md:w-[25vw]'>
         <span className='flex gap-3 flex-row items-center' onClick={handleSync}>Sync with Smart Meter<AiOutlineSync className="text-white "/></span> 
          </button>
          <p  className='text-white font-semibold p-2 rounded-full flex justify-start w-[50vw] md:w-[25vw]'>
          Actual value: {av}
          </p>
          <p  className='text-white font-semibold p-2 rounded-full flex justify-start w-[50vw] md:w-[25vw]'>
        False Value: {fv}
          </p>
          <input type="number" onChange={(e)=>setPrice(e.target.value)} className='bg-white text-black font-semibold p-2 rounded-full flex justify-center w-[50vw] md:w-[25vw]'
          placeholder='Set Price'>
          </input>
          <button  className='bg-black text-white font-semibold p-3 rounded-full flex justify-center w-[50vw] md:w-[25vw]'>
         <p className='flex gap-3 flex-row items-center'>Let<span className='text-pink-600 font-bold'>AI</span>set your price</p> 
          </button>
          <button type="submit" onClick={handleUpdate} className='bg-pink-600 shadow-xl text-white font-semibold rounded-full p-2 w-[10vw] items-center'>Update</button>
        </div>
      </div>
      </div>
    </div>
  )
}


export default Sell
