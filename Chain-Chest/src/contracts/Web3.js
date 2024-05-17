import {Web3} from 'web3';
import { providerUrl, abi, contractAddress } from './constants';
import { combinePairs } from '../utils/combinePairs';


const web3 = new Web3(providerUrl);
const contract = new web3.eth.Contract(abi, contractAddress);



export const getBalance = async (address) => {
	try {
		const balance = await web3.eth.getBalance(address);
		console.log('Balance:', balance);
	} catch (error) {
		console.error('Error getting balance:', error);
	}
}

export const whatsMyAddress = async (address) => {
	try {
		const addressOutput= await contract.methods.myAddress().call({
			from: address
		});
		//   const tx = await contract.methods.addUploadedFile(ipfsHash).call().then(console.log);
		console.log('My address: ', addressOutput);
	} catch (error) {
		console.error('Error getting balance:', error);
	}
}


export async function addUploadedFile(address,ipfsHash1) {
	try {
		await contract.methods.halfExperiment(ipfsHash1).send({
			from: address
		}).then(console.log);

		console.log('Document uploaded:');
	} catch (error) {
		console.error('Error uploading document:', error);
	}
}


export async function retrieve(address) {
	try {
		const ipfsHash = await contract.methods.getMyDocs2().call({
			from: address
		});
		// const result = JSON.stringify(ipfsHash.toString());
		console.log('Document IPFS hash:', combinePairs(ipfsHash));

		return combinePairs(ipfsHash);
	} catch (error) {
		console.error('Error retrieving document:', error);
	}
}
