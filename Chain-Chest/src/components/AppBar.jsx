import {useNavigate} from 'react-router-dom'
import { useState, useEffect } from 'react';
import Web3 from 'web3';

function AppBar(){
  const navigate = useNavigate();

  const [isConnected, setIsConnected] = useState(true);
  const [ethBalance, setEthBalance] = useState("");
  const [hover, setHover] = useState(false)

  useEffect(() => {
    const addressTemp = localStorage.getItem('address');
    if (addressTemp === null) {
      setIsConnected(false);
    } else {
      setIsConnected(true);
    }
  },[]);

  const detectCurrentProvider = () => {
    let provider;
    if (window.ethereum) {
      provider = window.ethereum;
    } else if (window.web3) {
      provider = window.web3.currentProvider;
    } else {
      console.log("Non-ethereum browser detected. You should install Metamask");
    }
    return provider;
  };
  
  const onConnect = async () => {
    try {
        const currentProvider = detectCurrentProvider();
        if (currentProvider) {
            await currentProvider.request({ method: 'eth_requestAccounts' });
            const web3 = new Web3(currentProvider);
            const userAccount = await web3.eth.getAccounts();
            const account = userAccount[0];
            localStorage.setItem('address', account);
            setIsConnected(true);
            const ethBalance = await web3.eth.getBalance(account);

            setEthBalance(web3.utils.fromWei(ethBalance, 'ether'));
            
        }
    } catch (err) {
        console.log(err);
    }
  }
  
  const onDisconnect = () => {
    setIsConnected(false);
    localStorage.removeItem('address');
  }

  return(
      <>
      <div className="p-5 bg-purple-700 text-white font-medium">
        <div className="px-12 flex justify-between">
        {/* {window.location.pathname} */}
        
        <div className='flex justify-start gap-14'>
          <div className='cursor-pointer' onClick={() => navigate("/")}>Home</div>
          <div className='cursor-pointer' onClick={() => navigate("/platform")}>Platform</div>
          <div className='cursor-pointer' onClick={() => navigate("/about")}>About us</div>
        </div>

        {!isConnected && (
          <div className='cursor-pointer ml-auto'>
            <button className="bg-white px-5 text-purple-700 py-1 font-bold rounded-md" onClick={onConnect}>
            Login
            </button>
          </div>
        )}

        {isConnected && 
          (
            <div className="bg-white px-5 text-purple-700 py-1 font-bold rounded-md">
            
              <button className="" onClick={onDisconnect}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)} >
                Disconnect
              </button>
                
              {
                hover &&
                  <div className='absolute bg-purple-200 px-3 py-1 text-black rounded-sm '>
                    <span className='font-semibold'>Balance:</span>
                    {ethBalance}
                  </div>
              }
            </div>
          )
        }


        </div>
        </div>
      </>
  )


}

export default AppBar