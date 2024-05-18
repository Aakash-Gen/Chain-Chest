import { useState,useEffect } from 'react';
import { retrieve, shareFile, retrieveSharedFiles } from '@/contracts/Web3';
import { useNavigate } from 'react-router-dom';
import Upload from './Upload';
import { IoMdShare } from "react-icons/io";
import { DialogDemo } from './demo/DialogDemo';
import { MdSmsFailed } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";


const Division = ({files, docType, address}) =>{
    
    return(
        <>
            <h1 className='text-xl font-semibold mx-10 '>{docType}</h1>

                <div className='grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-5'>
                    {files && files.length > 0 ? (
                        files
                            .filter(file => file.doctype === docType)
                            .map((file, index) => (
                                <Card key={index} name={file.filename} ipfsHash={file.ipfsHash} type={file.doctype} address={address} docType={file.doctype}/>
                            ))
                        ) : (
                    <p className='text-lg text-gray-500  flex justify-center items-center'>No files </p>
                )}

            </div>
        </>


    );
};
const SharedDivision = ({sharedfiles, docType, address}) =>{
    
    return(
        <>
            <h1 className='text-xl font-semibold mx-10 '>{docType}</h1>

                <div className='grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-5'>
                    {sharedfiles && sharedfiles.length > 0 ? (
                        sharedfiles
                            .filter(sharedfile => sharedfile.doctype === docType)
                            .map((sharedfile, index) => (
                                <Card key={index} name={sharedfile.filename} ipfsHash={sharedfile.ipfsHash} type={sharedfile.doctype} address={address} docType={sharedfile.doctype}/>
                            ))
                        ) : (
                    <p className='text-lg text-gray-500  flex justify-center items-center'>No files </p>
                )}

            </div>
        </>


    );
};


function Platform() {
    const [ files, setFiles ] = useState([]);
    const [sharedFiles, setSharedFiles] = useState([]);
    const [ address, setAddress ] = useState("");
    const [ activeTab, setActiveTab ] =  useState("My Files");
    const navigate = useNavigate();
    const[ popup, setPopup ] = useState(false);

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
                setFiles(retrievedFiles);
            } catch (error) {
                console.error('Error retrieving files:', error);
            }
        };
        if (address !== "") {
            fetchFiles();
        }
    }, [address,activeTab]);
    useEffect(() => {
        const fetchFiles = async () => {
            try {
                const retrievedFiles = await retrieveSharedFiles(address)
                setSharedFiles(retrievedFiles);
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
                {activeTab !== "Shared Files" && (
                    <div className='px-8 py-2 bg-black text-white rounded-[1vh] cursor-pointer' onClick={handlePopup}>
                      Add Files
                    </div>)}
                {popup && (
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


            {activeTab==="My Files" && (
                <>
                    <Division address={address} files={files} docType="Images" />
                    <Division address={address} files={files} docType="PDF" />
                    <Division address={address} files={files} docType="Certificates" />
                    <Division address={address} files={files} docType="eSign" />
                </>
            )} 
            {activeTab==="Shared Files" && ( 
                <>
                    <SharedDivision address={address} sharedfiles={sharedFiles} docType="Images" />
                    <SharedDivision address={address} sharedfiles={sharedFiles} docType="PDF" />
                    <SharedDivision address={address} sharedfiles={sharedFiles} docType="Certificates" />
                    <SharedDivision address={address} sharedfiles={sharedFiles} docType="eSign" />
                </> 
            )}
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
    const ImageUrl = "https://gateway.pinata.cloud/ipfs/" + props.ipfsHash
    const ipfsHashFull = props.ipfsHash;
    const midIndex = Math.floor(ipfsHashFull.length / 2);
    const ipfsHash1 = ipfsHashFull.slice(0,midIndex);
    const ipfsHash2 = ipfsHashFull.slice(midIndex);

    const handleImageError = (e) => {
        e.target.src = '/src/assets/Landing_icon.jpg';
    }
    return(
        <div className='bg-gray-100 w-full shadow-md rounded-xl flex flex-col'>
            
            <div className='h-48 w-full'>
                <img className='w-full h-full object-cover rounded-t-xl' onError={handleImageError} src={ImageUrl} alt="imagePreview" />
            </div>

            <div className='flex justify-between py-2 items-center px-4'>
                <a href={ImageUrl} target="_blank" className="no-underline">
                    <div className='font-semibold text-md' >
                        {props.name}
                    </div>
                    {/* <IoMdShare size={24} onClick={()=>shareFile(address, "0x5A08ebD1d2982f9421d58Ff9af14492217901028", ipfsHash1,ipfsHash2, props.name, props.docType)}/> */}
                    {/* <IoMdShare size={24} onClick={()=>retrieveSharedFiles("0x5A08ebD1d2982f9421d58Ff9af14492217901028")}/> */}
                    {/* <IoMdShare size={24} onClick={()=>getAddressForIndexAndAddress("0x5A08ebD1d2982f9421d58Ff9af14492217901028", '0')}/> */}
                    <DialogDemo address={props.address}  ipfshash1={ipfsHash1} ipfshash2 ={ipfsHash2} fileName={props.name} docType={props.docType} />
                </a>
            </div>
        </div>
    )
}


export default Platform