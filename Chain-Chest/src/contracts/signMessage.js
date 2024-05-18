import Web3 from 'web3';
import {ethers} from 'ethers';

export const signMessageAndVerify = async (address) => {
    try {
      const message = "Sign this message to verify your identiy. "
    //   const hashedMessage = Web3.utils.sha3(message);

      const accounts = (await window.ethereum.request({
        method: "eth_requestAccounts",
      }));

      // account will be the signer of this message
      const account = accounts[0];
      console.log({address});

      const signature = await window.ethereum.request(
        { 
            method: "personal_sign", 
            params: [message, account] 
        }
      );

      const recoveredAddress = ethers.verifyMessage(message, signature);
      console.log({recoveredAddress});


      return recoveredAddress == address;
    } catch (error) {
        console.error(error);
    }
  };