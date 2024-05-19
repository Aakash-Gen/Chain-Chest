// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TokenContract {
    string public name = "ChainLocker";
    string public symbol = "CLOC";
    
    mapping(address => string[]) private uploadedFiles;
    mapping(address => string[]) private sharedFiles;

    mapping(address => address[]) private shareAddressListForAddress;

    address[] private sharedFilesKeysGlobal;

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


    function getSharedDocs() public view returns (string[] memory) {
        string[] memory documents = new string[](sharedFiles[msg.sender].length);

        for (uint i = 0; i < sharedFiles[msg.sender].length; i++) {
            documents[i] = sharedFiles[msg.sender][i];
        }

        return documents;
    }


    function shareFilePreprocessor(address _with) public returns (bool) {
        shareAddressListForAddress[_with].push(msg.sender);
        return true;
    }


    function getshareAddressListForAddressIndex() public view returns (uint) {
        uint index = shareAddressListForAddress[msg.sender].length-1;
        return index;
    }


    function shareFileAddIndex(uint index) public returns (bool) {
        sharedFiles[msg.sender].push(num2st(index));
        return true;
    }


    function shareFileAddData(string memory half) public returns (bool) {
        sharedFiles[msg.sender].push(half);
        return true;
    }


    function addressForIndexAndAddress(string memory index) public view returns (address) {
        uint idx = st2num(index);
        require(idx < shareAddressListForAddress[msg.sender].length, "Index out of bounds");
        address result = shareAddressListForAddress[msg.sender][idx];
        return result;
    }


    function getShareAddressListForAddress() public view returns (address[] memory) {
        address[] memory documents = new address[](shareAddressListForAddress[msg.sender].length);

        for (uint i = 0; i < shareAddressListForAddress[msg.sender].length; i++) {
            documents[i] = shareAddressListForAddress[msg.sender][i];
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

    function st2num(string memory numString) public pure returns(uint) {
        uint  val=0;
        bytes   memory stringBytes = bytes(numString);
        for (uint  i =  0; i<stringBytes.length; i++) {
            uint exp = stringBytes.length - i;
            bytes1 ival = stringBytes[i];
            uint8 uval = uint8(ival);
           uint jval = uval - uint(0x30);
   
           val +=  (uint(jval) * (10**(exp-1))); 
        }
      return val;
    }

    function num2st(uint _i) internal pure returns (string memory _uintAsString) {
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

 }