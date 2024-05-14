import Web3 from 'web3';

const web3 = new Web3('http://localhost:8545'); 

const abi = [
    [
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "bytes32",
                    "name": "documentId",
                    "type": "bytes32"
                },
                {
                    "indexed": false,
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
        },
        {
            "inputs": [
                {
                    "internalType": "bytes32",
                    "name": "documentId",
                    "type": "bytes32"
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
                    "internalType": "bytes32",
                    "name": "",
                    "type": "bytes32"
                }
            ],
            "name": "documents",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                },
                {
                    "internalType": "string",
                    "name": "ipfsHash",
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
                    "name": "documentId",
                    "type": "bytes32"
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
        }
    ]
];

const contractAddress = '0x27BE32B99d6E2EdAb04c86Fe862F17BF24006345'; 

const contract = new web3.eth.Contract(abi, contractAddress);

export async function retrieveDocument(documentId) {
    try {
        const result = await contract.methods.retrieveDocument(documentId).call();
        console.log('Retrieved document:', result);
    } catch (error) {
        console.error('Error retrieving document:', error);
    }
}

export async function uploadDocument(documentId, ipfsHash) {
    try {
        const accounts = await web3.eth.getAccounts();
        await contract.methods.uploadDocument(documentId, ipfsHash).send({ from: accounts[0] });
        console.log('Document uploaded successfully');
    } catch (error) {
        console.error('Error uploading document:', error);
    }
}
