import React, {useState, useEffect } from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import {Link} from 'react-router-dom'
import Web3 from "web3";
import  contractABI  from "../abi/abi.json";
const contractAddress = "0x6744C02603868482fF329bB8E8CE463d90fE6E84";
const maticRPC = 'https://polygon-mumbai.g.alchemy.com/v2/gzDG51Gq8BDF6R5JpTR1WDXf_k7BRqZB';
const Buy = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const {logout} = useAuth0();
  console.log("User",user);

  const [web3, setWeb3] = useState();
  const [account, setAccount] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [contract, setContract] = useState(null);
  const[seller,setSeller]=useState([{}])

  const handleBuy=(walletId,price,actualValue)=>async()=>{
    console.log(contract)
    const web3Instance = new Web3(window.ethereum);

    // Request account access if needed
    window.ethereum.enable().then(async function(accounts) {
        const senderAddress = accounts[0]; // Sender's address
        const receiverAddress = `${walletId}`; // Receiver's address

        try {
            // Create a Web3 instance with the Matic RPC URL
            const maticWeb3 = new Web3(maticRPC);

            // Get the nonce of the sender's address on the Matic network
            const nonce = await maticWeb3.eth.getTransactionCount(senderAddress, 'pending');

            // Convert MATIC to Wei
            const amountInMatic = price; // Amount in MATIC
            const amountInWei = maticWeb3.utils.toWei(amountInMatic.toString(), 'ether');

            // Construct the transaction object
            const txObject = {
                from: senderAddress,
                to: receiverAddress,
                value: amountInWei,
                gas: 300000, // Gas limit
                nonce: nonce,
            };
            console.log("TxObject",txObject)
            // Send the transaction using MetaMask's send method
          web3Instance.eth.sendTransaction(txObject)
                
        } catch (error) {
            console.error('Error:', error);
        }
    });
  }
  useEffect(() => {
    const callseller=async()=>{
      const web3Instance =await new Web3(window?.ethereum);
    setWeb3(web3Instance);
    console.log("Web3",web3Instance);
    const contractInstance =await new web3Instance.eth.Contract(
      contractABI,
      contractAddress
    )
    console.log("Contract Instance",contractInstance);
    setContract(contractInstance);
      const result =await contractInstance.methods.getAllUsers().call();
     // console.log("REsults",result);
      setSeller(result);
      console.log("Result from seller",seller)
    }
    
    callseller();
    
  },[])

  return (
    <div className='p-4 '>
    <div className='bg-gray-900 flex p-2 justify-between items-center rounded-full'>
    <h1 className='text-white font-white text-xl font-bold px-3'>ENERGYLO.</h1>
    {
     isAuthenticated &&(
       <div className='flex gap-3'>
       <Link to="/"> <button className='text-white font-white text-xl'>Home</button></Link>
   <Link to="/sell"> <button className='text-white font-white text-xl'>Sell</button></Link>
       <button onClick={()=>logout()} className='text-xl font-semibold bg-white p-3'>Logout</button>  </div>     )
   }
    </div>
   <div className='flex flex-col items-center my-8'>
   <table className="mt-4 w-[75%] bg-gray-600 font-semibold text-white border-[1px] border-white">
  <thead className='border-[1px] border-white'>
    <tr>
      <th className="p-2">Wallet Address</th>
      <th className="p-2">Price</th>
      <th className="p-2">Available</th>
      <th className="p-2">Sales</th>


    </tr>
  </thead>
  <tbody>
    {seller.map((seller, index) => (
      <tr key={index} className="bg-gray-700">
        <td className="py-2 px-6 text-center">{seller.walletId}</td>
        <td className="p-2 text-center">{Number(seller.price)}</td>
        <td className="p-2 text-center"><span>{Number(seller.falseValue)}</span></td>
        <td className="p-2 text-center"><button onClick={handleBuy(seller.walletId,seller.price,seller.falseValue)} className='mx-3 text-black bg-white py-1 px-2 text-sm rounded-full font-white '>Buy now</button></td>

      </tr>
    ))}
  </tbody>
</table>

   </div>
    </div>
  )
}


export default Buy
