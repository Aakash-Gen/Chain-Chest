import {useNavigate} from 'react-router-dom'
import { MdOutlineDriveFolderUpload } from "react-icons/md";
import { MdOutlineSecurity } from "react-icons/md";
import { FaShareAlt } from "react-icons/fa";




function Home(){
    const navigate = useNavigate();

    return(
        <div>
            <div className="flex lg:flex-row flex-col text-center lg:text-left justify-center items-center lg:gap-14 xl:gap-20 p-8 sm:p-20 lg:p-20 xl:pl-28 mt-6">
                <div>
                    <div className="text-4xl pb-6 font-semibold">Welcome to Chain Chest</div>
                    <div className="text-xl font-medium">where your data finds its secure fortress.
                    <span className="text-purple-800 font-medium"> Upload, secure, share - all in one place</span></div>
                    <button onClick={() => navigate("/login")} className="px-4 py-2 font-medium mt-6 bg-purple-800 rounded-lg text-white">Login</button>
                
                </div>
                <img className='md:h-[70vh] md:w-auto md:object-contain' src = "/src/assets/Landing_icon.jpg" alt=""/>
            </div>


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

            <div className='border-2 h-0  mb-40'></div>


        </div>
    )


}

export default Home