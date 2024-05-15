import {Web3} from 'web3';

// Replace with your provider URL (e.g., Infura, Alchemy, Ganache)
const providerUrl = 'http://127.0.0.1:8545';

// Contract ABI (Application Binary Interface)
const abi = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_withWhom",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_fileName",
				"type": "string"
			}
		],
		"name": "addSharedFile",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_from",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_fileName",
				"type": "string"
			}
		],
		"name": "addUploadedFile",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "with",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "link",
				"type": "string"
			}
		],
		"name": "Shared",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "link",
				"type": "string"
			}
		],
		"name": "Uploaded",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_from",
				"type": "address"
			}
		],
		"name": "getMyDocs",
		"outputs": [
			{
				"internalType": "string[]",
				"name": "",
				"type": "string[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "myAddress",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "_hashedMessage",
				"type": "bytes32"
			},
			{
				"internalType": "uint8",
				"name": "_v",
				"type": "uint8"
			},
			{
				"internalType": "bytes32",
				"name": "_r",
				"type": "bytes32"
			},
			{
				"internalType": "bytes32",
				"name": "_s",
				"type": "bytes32"
			}
		],
		"name": "verifyMessage",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "pure",
		"type": "function"
	}
]
// Contract address (replace with your deployed contract address)
const contractAddress = '0xD115D8D507f521E1b087B3273204CC0D703e49Bf';

  // Initialize Web3 provider
  const web3 = new Web3(providerUrl);

  // Create contract instance
  const contract = new web3.eth.Contract(abi, contractAddress);

  export const getBalance = async () => {
    try {
      const balance = await web3.eth.getBalance("0x27BE32B99d6E2EdAb04c86Fe862F17BF24006345");
      console.log('Balance:', balance);
    } catch (error) {
      console.error('Error getting balance:', error);
    }
  }

  export const whatsMyAddress = async () => {
    try {
        const address = await contract.methods.myAddress().call();
        //   const tx = await contract.methods.addUploadedFile(ipfsHash).call().then(console.log);
        console.log('My address: ', address);
    } catch (error) {
      console.error('Error getting balance:', error);
    }
  }

  // Function to upload a document
  export async function addUploadedFile(address, link) {
    try {
      const tx = await contract.methods.addUploadedFile(address, link).call();
    //   const tx = await contract.methods.addUploadedFile(ipfsHash).call().then(console.log);
      console.log('Document uploaded:', tx.transactionHash);
    } catch (error) {
      console.error('Error uploading document:', error);
    }
  }

  // Function to retrieve a document
  export async function retrieve(address) {
    try {
      const ipfsHash = await contract.methods.getMyDocs(address).call();
      console.log('Document IPFS hash:', ipfsHash);
    } catch (error) {
      console.error('Error retrieving document:', error);
    }
  }
