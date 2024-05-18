import Web3 from 'web3';

const signMessage = async (address) => {
    try {

      const message = "Sign this message to verify your identiy. "
      const hashedMessage = Web3.utils.sha3(message);

      const signature = await window.ethereum.request(
        { 
            method: "personal_sign", 
            params: [message, address] 
        }
      );

      console.log({ message });

      // split signature
      const r = signature.slice(0, 66);
      const s = "0x" + signature.slice(66, 130);
      const v = parseInt(signature.slice(130, 132), 16);
      console.log({ r, s, v });


      return signature;
    } catch (error) {
        console.error(error);
    }
  };