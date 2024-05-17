import {Web3} from 'web3';
import { providerUrl, abi, contractAddress } from './constants';


const web3 = new Web3(providerUrl);
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
		const address = await contract.methods.myAddress().call({
			from: "0x7EC8e6614A2E3A1E4d6e321376a608666C8B6f8d"
		});
		//   const tx = await contract.methods.addUploadedFile(ipfsHash).call().then(console.log);
		console.log('My address: ', address);
	} catch (error) {
		console.error('Error getting balance:', error);
	}
}



export async function addUploadedFile(link) {
	try {
		const tx = await contract.methods.addUploadedFile("hemlo").call({
			from: "0x7EC8e6614A2E3A1E4d6e321376a608666C8B6f8d"
		}).then(console.log);

		console.log('Document uploaded:', tx);
	//   const tx = await contract.methods.addUploadedFile(ipfsHash).call().then(console.log);
		// console.log('Document uploaded:', tx.transactionHash);
	} catch (error) {
		console.error('Error uploading document:', error);
	}
}


export async function retrieve() {
	try {
		const ipfsHash = await contract.methods.getMyDocs().call({
			from: "0x7EC8e6614A2E3A1E4d6e321376a608666C8B6f8d"
		});
		// const result = JSON.stringify(ipfsHash.toString());
		console.log('Document IPFS hash:', ipfsHash);
	} catch (error) {
		console.error('Error retrieving document:', error);
	}
}
