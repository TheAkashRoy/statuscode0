import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import Web3 from "web3";
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
      <div className="bg-gray-900 flex p-2 justify-between items-center rounded-full">
        <h1 className="text-white font-white text-3xl px-4">ENERGYLO</h1>
        {isAuthenticated && (
          <div className="flex gap-3">
            <Link to="/">
              {" "}
              <button className="text-white font-white text-xl">Home</button>
            </Link>
            <Link to="/sell">
              {" "}
              <button className="text-white font-white text-xl">Sell</button>
            </Link>
            <button
              onClick={() => logout()}
              className="text-xl font-semibold bg-white p-3"
            >
              Logout
            </button>{" "}
          </div>
        )}
      </div>
      <div className="">
        <table className="mt-4 w-[75%] bg-gray-600 font-semibold text-white border-2 border-white">
          <thead className="border-2 border-white">
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
                <td className="p-2 text-center">
                  <span>{Number(seller.falseValue)}</span>
                </td>
                <td className="p-2 text-center">
                  <button
                    onClick={handleBuy(
                      seller.walletId,
                      seller.price,
                      seller.falseValue
                    )}
                    className="mx-3 text-black bg-white p-1 rounded-full font-white "
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
