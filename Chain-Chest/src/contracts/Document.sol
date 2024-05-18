// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TokenContract {
    string public name = "ChainLocker";
    string public symbol = "CLOC";

    // struct FileObject {
    //     int id;
    //     string hash1;
    //     string hash2;
    //     string name;
    //     string docType;
    //     address owner;
    // }

    // FileObject[] private filesCollection;

    uint private lastUsedId;
    mapping(address => string[]) private uploadedFiles;
    // mapping(address => mapping(address => string[][])) private sharedFiles;
    mapping(address => string[]) private sharedFiles;
    address[] private sharedFilesKeys;


    constructor () {
        lastUsedId = 0;
    }

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);

    event Uploaded(address indexed from, string link);
    event Shared(address indexed with, string link);

    function myAddress() public view returns (address) {
        return msg.sender;
    }

    function addUploadedFileFirstHalf(string memory half) public returns (bool) {
        uploadedFiles[msg.sender].push(intToString(lastUsedId + 1));
        lastUsedId++;
        uploadedFiles[msg.sender].push(half);
        return true;
    }

    function addUploadedFileSecondHalf(string memory half, string memory fileName, string memory docType) public returns (bool) {
        uploadedFiles[msg.sender].push(half);
        uploadedFiles[msg.sender].push(fileName);
        uploadedFiles[msg.sender].push(docType);
        return true;
    }

    function shareFileAddAddress(address _with) public returns (bool) {
        sharedFilesKeys.push(_with);
        sharedFiles[_with].push(addressToString(msg.sender));
        return true;
    }

    function shareFileAddFirstHash(string memory hash) public returns (bool) {
        sharedFiles[msg.sender].push(hash);
        return true;
    }

    function shareFileAddSecondHash(string memory hash, string memory fileName, string memory docType) public returns (bool) {
        sharedFiles[msg.sender].push(hash);
        sharedFiles[msg.sender].push(fileName);
        sharedFiles[msg.sender].push(docType);
        return true;
    }

    function getMyDocs() public view returns (string[] memory) {
        string[] memory documents = new string[](uploadedFiles[msg.sender].length);

        for (uint i = 0; i < uploadedFiles[msg.sender].length; i++) {
            documents[i] = uploadedFiles[msg.sender][i];
        }

        return documents;
    }

    function getSharedDocs() public view returns (string[] memory) {
        string[] memory documents = new string[](sharedFiles[msg.sender].length);

        for (uint i = 0; i < sharedFiles[msg.sender].length; i++) {
            documents[i] = sharedFiles[msg.sender][i];
        }

        return documents;
    }

    function addressToString(address _addr) internal pure returns (string memory) {
        bytes32 value = bytes32(uint256(uint160(_addr)));
        bytes memory alphabet = "0123456789abcdef";

        bytes memory str = new bytes(42);
        str[0] = '0';
        str[1] = 'x';
        for (uint256 i = 0; i < 20; i++) {
            str[2 + i * 2] = alphabet[uint8(value[i + 12] >> 4)];
            str[3 + i * 2] = alphabet[uint8(value[i + 12] & 0x0f)];
        }
        return string(str);
    }

    function intToString(uint _i) internal pure returns (string memory _uintAsString) {
        if (_i == 0) {
            return "0";
        }
        uint j = _i;
        uint len;
        while (j != 0) {
            len++;
            j /= 10;
        }
        bytes memory bstr = new bytes(len);
        uint k = len;
        while (_i != 0) {
            k = k-1;
            uint8 temp = (48 + uint8(_i - _i / 10 * 10));
            bytes1 b1 = bytes1(temp);
            bstr[k] = b1;
            _i /= 10;
        }
        return string(bstr);
    }

    // function verifyMessage(bytes32 _hashedMessage, uint8 _v, bytes32 _r, bytes32 _s) public pure returns (address) {
    //     bytes memory prefix = "\x19Ethereum Signed Message:\n32";
    //     bytes32 prefixedHashMessage = keccak256(abi.encodePacked(prefix, _hashedMessage));
    //     address signer = ecrecover(prefixedHashMessage, _v, _r, _s);
    //     return signer;
    // }
 }