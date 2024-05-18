import { useState,useEffect } from 'react';
import { retrieve } from '@/contracts/Web3';
import { useNavigate } from 'react-router-dom';
import Upload from './Upload';
import { IoMdShare } from "react-icons/io";
import { DialogDemo } from './demo/DialogDemo';

function Platform() {
    const [files, setFiles] = useState([]);
    const [address, setAddress] = useState("");
    const [activeTab, setActiveTab] =  useState("My Files");
    const navigate = useNavigate();
    const handleTabChange =(tabName)=>{
        setActiveTab(tabName)
    }
    useEffect(() => {
        const addressTemp = localStorage.getItem('address');
        if (addressTemp == null) {
          navigate('/login');
        }
        setAddress(addressTemp);
      },[]);
      useEffect(() => {
        const fetchFiles = async () => {
            try {
                const retrievedFiles = await retrieve(address);
                setFiles(retrievedFiles);
            } catch (error) {
                console.error('Error retrieving files:', error);
            }
        };
        if (address !== "") {
            fetchFiles();
        }
    }, [address,activeTab]);
    return (
    <div className='w-full h-auto p-8'>
        <div className='h-[70px] bg-gray-200 rounded-lg flex text-center p-2 gap-4 mb-16'>
            <Tab name="My Files" active={activeTab==="My Files"} onClick={()=>handleTabChange("My Files")} />
            <Tab name="Upload" active={activeTab==="Upload"} onClick={()=>handleTabChange("Upload")} />
        </div>
        {activeTab==="My Files" ? (
            <div className='grid grid-cols-5 ml-12 '>
            {files && files.length > 0 ? (
              files.map((file, index) => (
                <Card key={index} ipfsHash={file} />
              ))
            ) : (
              <p className='text-3xl font-bold flex justify-center items-center'>No files available</p>
            )}
            </div>
            ):( 
                <div>
                    <Upload/>
                </div>
            )}
    </div>
  )
}

const Tab =(props)=> {
    const tabClass = props.active ? 'bg-white' : 'bg-gray-200';
    return(
        <div className={`w-[50%] flex items-center justify-center text-2xl font-semibold rounded-md cursor-pointer ${tabClass}`} onClick={props.onClick}>
            {props.name}
        </div>

    )
}

const Card =(props)=>{
    const ImageUrl = "https://gateway.pinata.cloud/ipfs/" + props.ipfsHash
    return(
        <div className='bg-gray-100 w-64 mb-10 shadow-md rounded-xl flex flex-col'>
            <div className='h-64 w-64'>
                {ImageUrl ? (
                    <img className='w-full h-full object-cover rounded-t-xl' src={ImageUrl} alt="imagePreview" />
                ):(
                    <h1>
                        No Preview  Available
                    </h1>
                )}
            </div>
            <div className='flex justify-between py-2 items-center mr-2 ml-24'>
                <div className='font-semibold text-xl'>
                    View
                </div>
                {/* <IoMdShare size={24}/> */}
                <DialogDemo/>
            </div>
        </div>
    )
}


export default Platform