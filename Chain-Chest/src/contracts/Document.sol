// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DocumentStorage {
    struct Document {
        address owner;
        string ipfsHash;
    }

    mapping(address => string) public documents;

    event DocumentUploaded(address documentId, address owner, string ipfsHash);

    function uploadDocument(address documentId, string memory ipfsHash) public {
        documents[documentId] = ipfsHash;
        emit DocumentUploaded(documentId, msg.sender, ipfsHash);
    }

    function retrieveDocument(address documentId) public view returns (string memory) {
        return  documents[documentId];
    }
}
