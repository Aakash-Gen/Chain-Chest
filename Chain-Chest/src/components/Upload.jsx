
import { useEffect, useState } from 'react'
import axios from 'axios';
import { whatsMyAddress, retrieve, addUploadedFile } from '../contracts/Web3';
// import { v4 as uuidv4 } from 'uuid';
// import Web3 from 'web3';
// import encryptFile from '../utils/encryptFile';
// import decryptFile from '../utils/decryptFile';
import { useNavigate } from 'react-router-dom';


function Upload() {
  const navigate = useNavigate();

  const[file, setFile] = useState(null);
  const[file2, setFile2] = useState(null);
  const[fileUrl, setFileUrl] =useState("");
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState("");
  const [name,setName] = useState("");
  const [docType,setDocType] = useState("");


  // const [ uploadedFile, setUploadedFile ] = useState('');
  // const [ filename, setFilename ] = useState('Choose A File');
  // const [ signature, setSignature ] = useState(null);

  // const onFileChange = (event) => {
  //     setUploadedFile((event.target.files[0] !== undefined) ? event.target.files[0] : '');
  //     setFilename((event.target.files[0] !== undefined) ? event.target.files[0].name : 'Choose File');
  // };

  // const encrypt = () => { encryptFile(uploadedFile, filename, signature); };
  // const decrypt = () => { decryptFile(uploadedFile, filename, signature); };

  useEffect(() => {
    const addressTemp = localStorage.getItem('address');
    if (addressTemp == null) {
      navigate('/login');
    }
    setAddress(addressTemp);
  },[]);
  
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
      
      console.log(responseData.data);
      const ipfsHash = responseData.data.IpfsHash;
      const midIndex = Math.floor(ipfsHash.length / 2);

      const ipfsHash1 = ipfsHash.slice(0,midIndex);
      const ipfsHash2 = ipfsHash.slice(midIndex);


      await addUploadedFile(address, ipfsHash1, ipfsHash2, name, docType);

      // await addUploadedFile(address,ipfsHash1,ipfsHash2); 


      setFileUrl("https://gateway.pinata.cloud/ipfs/" + ipfsHash);
      console.log(ipfsHash);


    } catch(err){
      console.log(err)

    }
    finally {
      setLoading(false); // Set loading to false when the upload process is completed
    }
  }

  // const signMessage = async () => {
  //   try {

  //     const message = "Sign this message to verify your identiy. This will be used for encrypting and decrypting your files."
  //     const hashedMessage = Web3.utils.sha3(message);

  //     const signature = await window.ethereum.request(
  //       { 
  //           method: "personal_sign", 
  //           params: [message, address] 
  //       }
  //     );

  //     console.log({ message });

  //     // split signature
  //     const r = signature.slice(0, 66);
  //     const s = "0x" + signature.slice(66, 130);
  //     const v = parseInt(signature.slice(130, 132), 16);
  //     console.log({ r, s, v });


  //     setSignature(signature);
  //   } catch (error) {
  //       console.error(error);
  //   }
  // };

  return (
  <>
    <div className="flex flex-col items-center py-10">
      
      <h1 className="text-5xl font-semibold mt-16 pb-[10vh]">IPFS: Upload File</h1>
      
      <form className="flex items-center gap-4 mt-8">
        
        <label htmlFor="fileInput" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer">
          Choose File
        </label>

        <input id="fileInput" type="file" className="hidden" onChange={(e) => {
          setFile(e.target.files[0]);
          setFile2(URL.createObjectURL(e.target.files[0]));
        }}/>

        <input className='bg-gray-200' type="text" placeholder='FileName' onChange={(e)=>setName(e.target.value)} />
        <input className='bg-gray-200' type="text" placeholder='DocType' onChange={(e)=>setDocType(e.target.value)} />

        <button className=" bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" type="submit" onClick={handleSubmit}>
          {loading ? 'Uploading...' : 'Upload'}
        </button>

      </form>

      {/* <DocumentsList address={address} /> */}


      {file && (
        <>
          <img src={file2} alt="Selected File" className="mt-4 max-w-full h-96" />
        </>
      )}

      {fileUrl && (
        <a href={fileUrl} target="_blank" className="mt-4 text-blue-500 underline">
          Check the uploaded file here
        </a>
      )}

      {/* <form className='mt-10'>
          <div className=''>
            <input type='file' className='border m-2 p-2' id='customFile' onChange={ onFileChange } />
          </div>

          <input type='button' value='Encrypt' onClick={signature == null || signature == undefined ? null : encrypt } className='border-gray-400 border bg-gray-100 m-5 px-4' />
          <input type='button' value='Decrypt' onClick={signature == null || signature == undefined ? null : decrypt } className='border-gray-400 border bg-gray-100 m-5 px-4' />
      </form> */}

      {/* <button  type="submit" onClick={signMessage} className={` ${signature == null || signature == undefined ? 'bg-red-500 hover:bg-red-700' : 'bg-green-500 hover:bg-green-700'} text-white font-bold py-2 px-4 rounded`}>
          {signature == null || signature == undefined ? 'Verify your identity' : 'Identity verified'}
      </button> */}

      <button onClick={() => whatsMyAddress(address)} className='bg-blue-400 hover:bg-blue-300 px-2 py-1 border border-gray-600 m-5'>
        whats my address
      </button>

      <button onClick={() => retrieve(address)} className='bg-blue-400 hover:bg-blue-300 px-2 py-1 border border-gray-600 m-5'>
        retrieve
      </button>

      <button onClick={async () => {
          await addUploadedFile(address, 'hello');
          await addUploadedFile(address, 'sup');
        }} className='bg-blue-400 hover:bg-blue-300 px-2 py-1 border border-gray-600 m-5'>
        add file
      </button>



    </div>
      
    </>
  )
}

export default Upload
