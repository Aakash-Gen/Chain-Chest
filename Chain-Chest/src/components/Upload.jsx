import { useState } from 'react'
import axios from 'axios';
import { upload } from '../contracts/Web3';
// import { v4 as uuidv4 } from 'uuid';

function Upload() {
  const[file, setFile] = useState(null);
  const[fileUrl, setFileUrl] =useState("");
  // const documentId = uuidv4(); 
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const fileData = new FormData();
      fileData.append("file", file); 

      const responseData = await axios({
        method: "post",
        url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
        data: fileData,
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_PINATA_JWT}`,  

        }
      })
      const ipfsHash = responseData.data.IpfsHash;
      await upload('0x27BE32B99d6E2EdAb04c86Fe862F17BF24006345', ipfsHash);
      const fileUrl = "https://gateway.pinata.cloud/ipfs/" + responseData.data.IpfsHash;
      setFileUrl(fileUrl);

    } catch(err){
      console.log(err)

    }
  }


  return (
    <>
    <div>

      
      <h1>IPFS: Upload File</h1>
      <form>
        <input type="file" aria-label="uploaded" onChange= {(e)=>setFile(e.target.files[0])}/>
        <button type= "submit" onClick={handleSubmit} > Upload</button>

      </form>
      {fileUrl && (
        <a href= {fileUrl} target ="blank" >Check the image here</a>
      )}
    </div>
    
      
    </>
  )
}

export default Upload
