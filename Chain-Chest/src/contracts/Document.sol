// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DocumentStorage {
    struct Document {
        address owner;
        string ipfsHash;
    }

    mapping(bytes32 => Document) public documents;

    event DocumentUploaded(bytes32 documentId, address owner, string ipfsHash);

    function uploadDocument(bytes32 documentId, string memory ipfsHash) public {
        documents[documentId] = Document(msg.sender, ipfsHash);
        emit DocumentUploaded(documentId, msg.sender, ipfsHash);
    }

    function retrieveDocument(bytes32 documentId) public view returns (string memory) {
        return documents[documentId].ipfsHash;
    }
}