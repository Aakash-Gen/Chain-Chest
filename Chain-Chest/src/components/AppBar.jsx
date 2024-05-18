import {useNavigate} from 'react-router-dom'
import {useState} from 'react';
import Web3 from 'web3';

function AppBar(){
  const navigate = useNavigate();

  const [isConnected, setIsConnected] = useState(false);
  const [ethBalance, setEthBalance] = useState("");
  const [hover, setHover] = useState("false")

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
            const ethBalance = await web3.eth.getBalance(account);

            setEthBalance(web3.utils.fromWei(ethBalance, 'ether')); // Convert wei to ether before setting state
            setIsConnected(true);
        }
    } catch (err) {
        console.log(err);
    }
}
  
  const onDisconnect = () => {
    setIsConnected(false);
  }

    return(
        <>
        <div className="p-5 bg-purple-700 text-white font-medium">
          <div className="px-12 flex justify-start gap-14">
          {/* {window.location.pathname} */}
          <div className='cursor-pointer' onClick={() => navigate("/")}>Home</div>
          <div className='cursor-pointer' onClick={() => navigate("/platform")}>Platform</div>
          <div className='cursor-pointer' onClick={() => navigate("/about")}>About us</div>
          {!isConnected && (
            <div className='cursor-pointer ml-auto'>
              <button className="bg-white px-5 text-purple-700 py-1 font-bold rounded-md" onClick={onConnect}>
              Login
              </button>
            </div>
          )}

          {isConnected && 
            (
              <div className="cursor-pointer ml-auto">
              
                <button className="" onClick={onDisconnect}
                  onMouseEnter={() => setHover(true)}
                  onMouseLeave={() => setHover(false)} >
                  Disconnect
                </button>
                  
                {
                  hover &&
                    <div className='absolute top-12 right-20 bg-purple-300 p-5 text-black rounded-sm '>
                      <span>Balance:{ethBalance}</span>
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