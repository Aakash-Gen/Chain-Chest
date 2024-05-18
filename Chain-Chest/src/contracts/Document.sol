// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TokenContract {
    string public name = "ChainLocker";
    string public symbol = "CLOC";
    // uint8 public decimals = 18;
    // uint256 public totalSupply = 1000000 * (10 ** uint256(decimals));

    mapping(address => string[]) private uploadedFiles;
    mapping(address => mapping(address => string[][])) private sharedFiles;

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);

    event Uploaded(address indexed from, string link);
    event Shared(address indexed with, string link);
 
    function myAddress() public view returns (address) {
        return msg.sender;
    }

    function addUploadedFile(string memory half) public returns (bool) {
        uploadedFiles[msg.sender].push(half);
        return true;
    }

    function getMyDocs() public view returns (string[] memory) {
        string[] memory documents = new string[](uploadedFiles[msg.sender].length);

        for (uint i = 0; i < uploadedFiles[msg.sender].length; i++) {
            documents[i] = uploadedFiles[msg.sender][i];
        }

        return documents;
    }


    // function verifyMessage(bytes32 _hashedMessage, uint8 _v, bytes32 _r, bytes32 _s) public pure returns (address) {
    //     bytes memory prefix = "\x19Ethereum Signed Message:\n32";
    //     bytes32 prefixedHashMessage = keccak256(abi.encodePacked(prefix, _hashedMessage));
    //     address signer = ecrecover(prefixedHashMessage, _v, _r, _s);
    //     return signer;
    // }
 }