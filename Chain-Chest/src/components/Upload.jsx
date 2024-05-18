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
  const [selectedOption, setSelectedOption] = useState('');


  const[file, setFile] = useState(null);
  const[file2, setFile2] = useState(null);
  const[fileUrl, setFileUrl] =useState("");
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState("");

  const handleChange2 = (event) => {
    setSelectedOption(event.target.value);
  };


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


      await addUploadedFile(address, ipfsHash1, ipfsHash2, 'my photo', 'image');

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
      
      <form className=" gap-4 ">

      <div className='flex justify-start gap-4 items-baseline  mb-4'>
      <label htmlFor="fileType" className='font-medium'>Choose a file type:</label>
      <select id="fileType" value={selectedOption} onChange={handleChange2} className='w-28 bg-gray-200 px-4 py-2 rounded-sm'>
        <option value="">Select</option>
        <option value="Images">Images</option>
        <option value="PDF">PDF</option>
        <option value="Certificates">Certificates</option>
        <option value="eSign">eSign</option>
      </select>
      </div>

      <div>
      <label htmlFor="fileType" className='font-medium mr-6'>Enter file name:</label>
      <input id="filename" type="text" className='bg-gray-200 px-4 py-2 rounded-sm m-3'/>
      </div>
        
        <div className='flex justify-center gap-5 pt-4'>
        <label htmlFor="fileInput" className="bg-black   hover:bg-gray-700 text-white font-bold py-2 px-4 rounded cursor-pointer">
          Choose File
        </label>

        <input id="fileInput" type="file" className="hidden" onChange={(e) => {
          setFile(e.target.files[0]);
          setFile2(URL.createObjectURL(e.target.files[0]));
        }}/>

        <button className=" bg-black   hover:bg-gray-700 text-white font-bold py-2 px-4 rounded" type="submit" onClick={handleSubmit}>
          {loading ? 'Uploading...' : 'Upload'}
        </button>
        </div>

      </form>

      {/* <DocumentsList address={address} /> */}


      {file && (
        <>
          <img src={file2} alt="Selected File" className="mt-4 max-w-full h-96" />
        </>
      )}

      {fileUrl && (
        <a href={fileUrl} target="_blank" className="hidden mt-4 text-blue-500 underline">
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

      <button onClick={() => whatsMyAddress(address)} className='hidden bg-blue-400 hover:bg-blue-300 px-2 py-1 border border-gray-600 m-5'>
        whats my address
      </button>

      <button onClick={() => retrieve(address)} className='hidden bg-blue-400 hover:bg-blue-300 px-2 py-1 border border-gray-600 m-5'>
        retrieve
      </button>

    


    </div>

    <div className='flex justify-end'>
      <button onClick={async () => {
          await halfExperiment(address, 'hello');
          await halfExperiment(address, 'sup');
        }} className='bg-purple-700 text-white font-semibold  rounded-sm hover:bg-purple-500 px-4 py-2 border  m-5'>
        Add File
      </button>
      </div>
      
    </>
  )
}

export default Upload
