// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TokenContract {
    string public name = "ChainLocker";
    string public symbol = "CLOC";

    mapping(address => string[]) private uploadedFiles;
    mapping(address => mapping(address => string[])) private sharedFiles;

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);

    event Uploaded(address indexed from, string link);
    event Shared(address indexed with, string link);

    function myAddress() public view returns (address) {
        return msg.sender;
    }

    function addUploadedFile(string memory _fileName) public returns (bool) {
        uploadedFiles[msg.sender].push(_fileName);
        return true;
    }

    function addSharedFile(address _withWhom, string memory _fileName) public returns (bool) {
        sharedFiles[msg.sender][_withWhom].push(_fileName);
        return true; 
    }

    function getMyDocs() public view returns (string[] memory) {
        string[] memory documents = new string[](uploadedFiles[msg.sender].length);
        for (uint i = 0; i < uploadedFiles[msg.sender].length; i++) {
            documents[i] = uploadedFiles[msg.sender][i];
        }
        return documents;
    }

    // function getSharedDocs() public view returns (mapping(address => string[]) memory) {
    //     return sharedFiles[msg.sender];
    // }  

    // function getSharedFilesFor(address y) public view returns (string[] memory) {
    //     uint fileCount = sharedFiles[y].length; // Get the number of shared files
    //     string[] memory files = new string[](fileCount);

    //     uint i = 0;
    //     for (string memory file in sharedFiles[y]) {
    //         files[i] = file;
    //         i++;
    //     }

    //     return files;
    // }

    function verifyMessage(bytes32 _hashedMessage, uint8 _v, bytes32 _r, bytes32 _s) public pure returns (address) {
        bytes memory prefix = "\x19Ethereum Signed Message:\n32";
        bytes32 prefixedHashMessage = keccak256(abi.encodePacked(prefix, _hashedMessage));
        address signer = ecrecover(prefixedHashMessage, _v, _r, _s);
        return signer;
    }

       // function upload(address _signer, string _link, bytes memory _sig) public returns (bool success) {
    //     // require(balanceOf[msg.sender] >= _value, "Not enough balance");
    //     // balanceOf[msg.sender] -= _value;
    //     // balanceOf[_to] += _value;
    //     // emit Transfer(msg.sender, _to, _value);
    //     return true;
    // }


    // function approve(address _spender, uint256 _value) public returns (bool success) {
    //     // allowance[msg.sender][_spender] = _value;
    //     // emit Approval(msg.sender, _spender, _value);
    //     return true;
    // }

 }