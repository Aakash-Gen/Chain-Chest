
import { useState } from 'react'
import axios from 'axios';
import { uploadDocument } from '../contracts/Web3';


function Upload() {
  const[file, setFile] = useState(null);
  const[file2, setFile2] = useState(null);
  const[fileUrl, setFileUrl] =useState("");
  const [loading, setLoading] = useState(false);
  // const documentId = uuidv4(); 
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
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
    finally {
      setLoading(false); // Set loading to false when the upload process is completed
    }
  }


  return (
    <>
  <div className="flex flex-col items-center justify-center py-10 pb-[60vh]">
  <h1 className="text-5xl font-semibold mt-16 pb-[10vh]">IPFS: Upload File</h1>
  <form className="flex items-center gap-4 mt-8">
    <label htmlFor="fileInput" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer">
      Choose File
    </label>
    <input id="fileInput" type="file" className="hidden" onChange={(e) => {
  setFile(e.target.files[0]);
  setFile2(URL.createObjectURL(e.target.files[0]));
}}/>
    <button className=" bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" type="submit" onClick={handleSubmit}>
    {loading ? 'Uploading...' : 'Upload'}
    </button>
  </form>
  {file && (
    <>
    
      <img src={file2} alt="Selected File" className="mt-4 max-w-full h-auto" />
    </>
  )}
  {fileUrl && (
    <a href={fileUrl} target="_blank" className="mt-4 text-blue-500 underline">
      Check the uploaded file here
    </a>
  )}
</div>
    
      
    </>
  )
}

export default Upload
