import Web3 from 'web3';

// Replace with your provider URL (e.g., Infura, Alchemy, Ganache)
const providerUrl = 'HTTP://127.0.0.1:8545';

// Contract ABI (Application Binary Interface)
const abi = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "documentId",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "ipfsHash",
        "type": "string"
      }
    ],
    "name": "uploadDocument",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "documentId",
        "type": "address"
      }
    ],
    "name": "retrieveDocument",
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
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "documentId",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "ipfsHash",
        "type": "string"
      }
    ],
    "name": "DocumentUploaded",
    "type": "event"
  }
];

// Contract address (replace with your deployed contract address)
const contractAddress = '0xbBd01C9914e653E728457266ea0BE2b07CAf8dE9';

  // Initialize Web3 provider
  const web3 = new Web3(providerUrl);

  // Create contract instance
  const contract = new web3.eth.Contract(abi, contractAddress);

  // Function to upload a document
  export async function upload(documentId, ipfsHash) {
    try {
      const tx = await contract.methods.uploadDocument(documentId, ipfsHash).send({
        from: web3.eth.accounts.getAccountIndex(0) // Replace with your account index
      });
      console.log('Document uploaded:', tx.transactionHash);
    } catch (error) {
      console.error('Error uploading document:', error);
    }
  }

  // Function to retrieve a document
  export async function retrieve(documentId) {
    try {
      const ipfsHash = await contract.methods.retrieveDocument(documentId).call();
      console.log('Document IPFS hash:', ipfsHash);
    } catch (error) {
      console.error('Error retrieving document:', error);
    }
  }
