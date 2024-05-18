import { useEffect, useState } from 'react'
import axios from 'axios';
import { addUploadedFile } from '../contracts/Web3';
// import { v4 as uuidv4 } from 'uuid';
// import Web3 from 'web3';
// import encryptFile from '../utils/encryptFile';
// import decryptFile from '../utils/decryptFile';
import { useNavigate } from 'react-router-dom';
import { signMessageAndVerify } from '../contracts/signMessage';


function Upload() {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState('');


  const[file, setFile] = useState(null);
  const[file2, setFile2] = useState(null);
  const[fileUrl, setFileUrl] =useState("");
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState("");
  const [name,setName] = useState("");
  const [docType, setDocType] = useState("");

  const [ msg, setMsg ] = useState(null);

  const handleChange2 = (event) => {
    setSelectedOption(event.target.value);
    setDocType(event.target.value)
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

      if (await signMessageAndVerify(address)){
        console.log('Message signed');
      } else {
        console.log('Message not signed or error signing message.');
        return;
      }

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
      setMsg(1);
      console.log(ipfsHash);
      window.location.reload();


    } catch(err){
      console.log(err)
      setMsg(0);
    }
    finally {
      setLoading(false); // Set loading to false when the upload process is completed
    }
  }


  return (
  <>
    <div className="flex flex-col items-center">
      
      <form className="gap-2">

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
        <input id="filename" type="text" onChange={(e)=>setName(e.target.value)} className='bg-gray-200 px-4 py-2 rounded-sm m-3'/>
        </div>

          {msg === null ? <p></p>  : msg === 0 ? <p className="text-red-500">Error uploading file. Please retry</p> : <p className="text-green-500">File successfully uploaded</p>}
          
          {file && (
            <>
              <img src={file2} alt="Selected File" className="mt-4 max-w-full h-[40vh]" />
            </>
          )}

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


      

    </div>
    </>
  )
}

export default Upload