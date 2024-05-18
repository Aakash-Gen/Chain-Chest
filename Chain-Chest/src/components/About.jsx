import { MdOutlineDriveFolderUpload } from "react-icons/md";
import { MdOutlineSecurity } from "react-icons/md";
import { FaShareAlt } from "react-icons/fa";

function About(){

    return(
        <div>
        <div className="pt-[30vh] flex justify-center">
            <div className="text-4xl font-semibold">Chain Chest</div>
        </div>
           <p className="px-[20vh] text-xl font-medium text-center pt-[7vh] pb-[30vh]">With Chain Chest, your data is not just stored; it is fortified. Our application empowers you to safeguard your valuable information by storing it securely on the blockchain. Once your data is on the blockchain, it becomes immutable, incorruptible, and impervious to loss or tampering.</p>
           <div className='border-2 h-0'></div>

<div className='pt-40 pb-40'>

    <div className='flex justify-center'>
        <span className='text-4xl font-semibold'>Upload your documents now</span>
    </div>

    <div className='grid grid-cols-3 pl-48 pt-10 text-xl font-semibold mt-20'>
            <div className='grid grid-col-1 '>
                <div>Upload with Ease</div>
                <MdOutlineDriveFolderUpload className='mx-11 size-16 mt-6'/>
                </div>
            
                <div className='grid grid-col-1 '>
                <div>Blockchain Security</div>
                <MdOutlineSecurity className='mx-11 size-16 mt-6'/>
                </div>

                <div className='grid grid-col-1 '>
                <div>Share Effortlessly</div>
                <FaShareAlt className='mx-11 size-16 mt-6'/>
                </div>
    </div>


</div>
<div className='border-2 h-0 pb-40 w-full'></div>

           
           </div>

           
    )



}

export default About