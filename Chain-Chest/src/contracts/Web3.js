import {Web3} from 'web3';
import { providerUrl, abi, contractAddress } from './constants';
import { mapDocuments } from '../utils/combinePairs';
import { combinePairsForSharedFiles } from '../utils/combinePairsForSharedFiles';
import { signMessageAndVerify } from './signMessage';


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


export async function addUploadedFile(address, ipfsHash1, ipfsHash2, fileName, docType) {
	try {

		await contract.methods.addUploadedFile(ipfsHash1).send({
			from: address
		})

        await contract.methods.addUploadedFile(ipfsHash2).send({
			from: address
		})

        await contract.methods.addUploadedFile(fileName).send({
			from: address
		})

        await contract.methods.addUploadedFile(docType).send({
			from: address
		})

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
		console.log('Document IPFS hash:', mapDocuments(output));

		return mapDocuments(output);
	} catch (error) {
		console.error('Error retrieving document:', error);
	}
}

export async function retrieveSharedFiles(address) {
	try {
		console.log('retrieving shared files')
		const output = await contract.methods.getSharedDocs().call({
			from: address
		});
		
		// console.log('Shared Files retrieved:', output);
		// console.log('Shared Files retrieved:', await combinePairsForSharedFiles(output, address));

		return await combinePairsForSharedFiles(output, address);
	} catch (error) {
		console.error('Error retrieving document:', error);
	}
}


export async function getAddressForIndexAndAddress(address, index) {
	try {
		const output = await contract.methods.addressForIndexAndAddress(index).call({
			from: address
		});
		// const result = JSON.stringify(ipfsHash.toString());
		// console.log('the address for given index is :', output);

		return output;
	} catch (error) {
		console.error('Error in getAddressForIndexAndAddress: ', error);
	}
}



export async function shareFile(address, _with, ipfsHash1, ipfsHash2, fileName, docType) {
	try {

		if (await signMessageAndVerify(address)){
			console.log('Message signed');
		} else {
			console.log('Message not signed or error signing message.');
			return;
		}


		console.log('sharing begins');

		await contract.methods.shareFilePreprocessor(_with).send({
			from: address
		});


		const index = await contract.methods.getshareAddressListForAddressIndex().call({
			from: _with
		});


		await contract.methods.shareFileAddIndex(index).send({
			from: _with
		});


		await contract.methods.shareFileAddData(ipfsHash1).send({
			from: _with
		});


		await contract.methods.shareFileAddData(ipfsHash2).send({
			from: _with
		});


		await contract.methods.shareFileAddData(fileName).send({
			from: _with
		});


		await contract.methods.shareFileAddData(docType).send({
			from: _with
		});

		console.log('the index returned:', index);

		return index;
	} catch (error) {
		console.error('Error retrieving document:', error);
	}
}