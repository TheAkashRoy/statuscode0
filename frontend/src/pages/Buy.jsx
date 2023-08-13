import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import Web3 from "web3";
import axios from "axios";
import contractABI from "../abi/abi.json";
const contractAddress = "0xAf383eb2dA292cA415e1AaF88212f2704b331C43";
const maticRPC =
  "https://polygon-mumbai.g.alchemy.com/v2/gzDG51Gq8BDF6R5JpTR1WDXf_k7BRqZB";
const Buy = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const { logout } = useAuth0();
  console.log("User", user);

  const [web3, setWeb3] = useState();
  const [account, setAccount] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [contract, setContract] = useState(null);
  const [seller, setSeller] = useState([{}]);

  const handleBuy = (walletId, price, actualValue) => async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      try {
          // Request account access if needed
          await window.ethereum.enable();
      } catch (error) {
          // User denied account access...
          console.error('User denied account access')
      }
  }
  const recipientAddress = '0xRecipientAddress';
const sender= await window.web3.eth.getAccounts();
const senderAddress = sender[0];
console.log(price)
// Create transaction object
//console.log(window.web3.utils.toWei('0.001', 'ether'));
const txObject = {
    from: senderAddress, // Sender's address (Metamask's selected account)
    to: walletId,
    value: price, // Amount to send in Wei
    gas: 2000000, // Gas limit
};
console.log(txObject)
// Send transaction and trigger Metamask popup for signing
window.web3.eth.sendTransaction(txObject, (error, transactionHash) => {
    if (!error) {
        console.log('Transaction sent:', transactionHash);
        // You can listen for transaction confirmation events or do other things here
    } else {
        console.error('Transaction error:', error);
    }
});

const res =await axios.get(`https://energylobend.akashroy24.repl.co/predict/${walletId}`)
console.log(res.data)

  };
  useEffect(() => {
    const callseller = async () => {
      const web3Instance = await new Web3(window?.ethereum);
      setWeb3(web3Instance);
      console.log("Web3", web3Instance);
      const accountmeow = await web3Instance.eth.getAccounts();
      setAccount(accountmeow[0]);
      const contractInstance = await new web3Instance.eth.Contract(
        contractABI,
        contractAddress
      );
      console.log("Contract Instance", contractInstance);
      setContract(contractInstance);
      const result = await contractInstance.methods.getAllUsers().call();
      // console.log("REsults",result);
      setSeller(result);
      console.log("Result from seller", seller);
    };

    callseller();
  }, []);

  return (
    <div className="p-4 ">
    <div className='bg-black shadow-2xl flex p-3 justify-between items-center rounded-full'>
    <h1 className='text-white font-white text-xl font-bold px-3'><a href="/">ENERGYLO.</a></h1>
     
    {
     isAuthenticated &&(
       <div className='flex gap-3 px-3'>
      <Link to="/"> <button className=' text-sm px-4 py-1 rounded-full bg-white font-semibold'>Home</button></Link>
    <Link to="/sell"><button className=' text-sm bg-white font-semibold px-4 py-1 rounded-full'>Sell</button></Link>
       <button onClick={()=>logout()} className='text-sm rounded-full  font-semibold bg-white px-2'>Logout</button></div>      )
   } 
    </div>
      <div className="flex justify-center items-center">
        <table className=" w-[75%] bg-gray-700 font-semibold  mt-28 text-white border border-white">
          <thead className="">
            <tr>
              <th className="p-2 border  border-gray-600">Wallet Address</th>
              <th className="p-2 border  border-gray-600">Price</th>
              <th className="p-2 border  border-gray-600">Available</th>
              <th className="p-2 border  border-gray-600">Sales</th>
            </tr>
          </thead>
          <tbody>
            {seller.map((seller, index) => (
              <tr key={index} className="bg-gray-800">
                <td className="py-2 px-6 text-center border  border-gray-600">{seller.walletId}</td>
                <td className="p-2 text-center border  border-gray-600">{Number(seller.price)/Math.pow(10,18)}</td>
                <td className="p-2 text-center border  border-gray-600">
                  <span>{Number(seller.falseValue)}</span>
                </td>
                <td className="p-2 text-center border  border-gray-600">
                  <button
                    onClick={handleBuy(
                      seller.walletId,
                      seller.price,
                      seller.falseValue
                    )}
                    className="mx-3 text-sm text-black bg-white p-1.5 rounded-full font-white "
                  >
                    Buy now
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Buy;
