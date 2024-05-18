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


export async function addUploadedFile(address,ipfsHash1,ipfsHash2, fileName, docType) {
	try {
		await contract.methods.addUploadedFileFirstHalf(ipfsHash1).send({
			from: address
		});

		await contract.methods.addUploadedFileSecondHalf(ipfsHash2).send({
			from: address
		});

		await contract.methods.addUploadedFileThirdHalf(fileName, docType).send({
			from: address
		});

		console.log('Document uploaded:');
	} catch (error) {
		console.error('Error uploading document:', error);
	}
}

export async function addUploadedFileTest(address,ipfsHash1) {
	try {
		await contract.methods.addUploadedFileFirstHalf(ipfsHash1).send({
			from: address
		});
		console.log('Document uploaded:');
	} catch (error) {
		console.error('Error uploading document:', error);
	}
}

export async function retrieve(address) {
	try {
		const output = await contract.methods.getMyDocs().call({
			from: address
		});
		// const result = JSON.stringify(ipfsHash.toString());
		console.log('Retrieved documents:', output);

		return combinePairs(output);
	} catch (error) {
		console.error('Error retrieving document:', error);
		return [];
	}
}


export async function shareFileWith(address, hash1, hash2, withAddress, fileName, docType) {
	try {

		await contract.methods.shareFileAddAddress(withAddress).send({
			from: address
		});

		await contract.methods.shareFileAddFirstHash(hash1).send({
			from: withAddress
		});

		const output = await contract.methods.shareFileAddFirstHash(hash2, fileName, docType).send({
			from: withAddress
		});

		// const result = JSON.stringify(ipfsHash.toString());
		console.log('Shared the file:', output);
	} catch (error) {
		console.error('Error retrieving document:', error);
		return [];
	}
}

export async function retrieveSharedFiles(address) {
	try {
		const output = await contract.methods.getSharedDocs().call({
			from: address
		});
		// const result = JSON.stringify(ipfsHash.toString());
		console.log('Shared Docs output:', combinePairs(output));
		return output;
	} catch (error) {
		console.error('Error retrieving document:', error);
		return [];
	}
}

export async function testFunction(address) {
	try {
		const output = await contract.methods.addUploadedFiletest1('QmQN2rxrGUe4o1FvTCveewTS').send({
			from: address
		});
		// const result = JSON.stringify(ipfsHash.toString());
		console.log('test succeeded:', combinePairs(output));
		return output;
	} catch (error) {
		console.error('Error retrieving document:', error);
		return [];
	}
}




