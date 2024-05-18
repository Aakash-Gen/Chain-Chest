import { useState,useEffect } from 'react';
import { retrieve } from '@/contracts/Web3';
import { useNavigate } from 'react-router-dom';
import Upload from './Upload';
import { IoMdShare } from "react-icons/io";
import { DialogDemo } from './demo/DialogDemo';
import { MdSmsFailed } from "react-icons/md";
import SharedFiles from './SharedFiles';
import { RxCross2 } from "react-icons/rx";


function Platform() {
    const [files, setFiles] = useState([]);
    const [address, setAddress] = useState("");
    const [activeTab, setActiveTab] =  useState("My Files");
    const navigate = useNavigate();
    const[popup, setPopup] = useState(false);

    const handlePopup= ()=> {
        setPopup(!popup);

    }
    
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
                const retrievedFiles = await retrieve(address)
                // console.log('Documents:', retrievedFiles);
                // const ipfsHashes = retrievedFiles.map(doc => doc.ipfsHash);
                // console.log('IPFS Hashes:', ipfsHashes);
                setFiles(retrievedFiles);
                // setFiles(retrievedFiles)
            } catch (error) {
                console.error('Error retrieving files:', error);
            }
        };
        if (address !== "") {
            fetchFiles();
        }
    }, [address,activeTab]);


    return (
        <div className='h-auto px-4 sm:px-6 md:px-10 lg:px-14 py-8'>
            <div className='flex justify-between m-10 items-baseline'>
            
            <div className='h-9 w-48 sm:w-72 bg-gray-200 rounded-lg flex sm:gap-5 p-1 '>
                <Tab name="My Files" active={activeTab==="My Files"} onClick={()=>handleTabChange("My Files")} />
                <Tab name="Shared Files" active={activeTab==="Shared Files"} onClick={()=>handleTabChange("Shared Files")} />
            </div>

           

            <div className='px-8 py-2 bg-black text-white rounded-[1vh] cursor-pointer' onClick={handlePopup}>Add Files</div>

            {popup &&
             (
                <>
                  <div className='fixed inset-0 bg-black opacity-50 z-30'></div>
                  <div className='absolute top-1/2 bg-gray-50 px-8 py-4 rounded-lg left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-40 w-[60vh]'>
                    <div className='flex justify-between pb-10'>
                      <div className='text-2xl font-medium'>Add Files</div>
                      <RxCross2 className='size-5 cursor-pointer' onClick={handlePopup} />
                    </div>
                    <Upload/>
                    </div>
                   

                   
                      
                     
                 
                </>
              )}
              </div>

          



            {activeTab==="My Files" ? (
                <div className='grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
                        {files && files.length > 0 ? (
                            files.map((file, index) => (
                                <Card key={index} name={file.filename} ipfsHash={file.ipfsHash} />
                            ))
                    ) : (
                        <p className='text-3xl font-bold flex justify-center items-center'>No files available</p>
                    )}
                </div>
                ):( 
                    <div>
                        <SharedFiles/>
                    </div>
                )
            }
        </div>
  )
}

const Tab =(props)=> {
    const tabClass = props.active ? 'bg-white' : 'bg-gray-200';
    return(
        <div className={`w-[50%] flex items-center justify-center rounded-md cursor-pointer ${tabClass}`} onClick={props.onClick}>
            {props.name}
        </div>

    )
}

const Card =(props)=>{
    const navigate= useNavigate();
    const ImageUrl = "https://gateway.pinata.cloud/ipfs/" + props.ipfsHash

    const handleImageError = (e) => {
        e.target.src = '/src/assets/Landing_icon.jpg';
    }
    const [address, setAddress] = useState("");
    useEffect(() => {
        const addressTemp = localStorage.getItem('address');
        if (addressTemp == null) {
          navigate('/login');
        }
        setAddress(addressTemp);
    },[]);
    return(
        <div className='bg-gray-100 w-full shadow-md rounded-xl flex flex-col'>
            <div className='h-64 w-full'>
            <img className='w-full h-full object-cover rounded-t-xl' onError={handleImageError} src={ImageUrl} alt="imagePreview" />

               
            </div>
            <div className='flex justify-between py-2 items-center px-4'>
                <div className='font-semibold text-md'>
                    {props.name}
                </div>
                {/* <IoMdShare size={24} onClick={()=>shareFileWith(address,'0x333Ee1E11749921A2f2F9C0BA31d695e3e885689','hello')}/> */}
                {/* <DialogDemo /> */}
            </div>
        </div>
    )
}


export default Platform