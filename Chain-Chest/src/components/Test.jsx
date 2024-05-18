// import { addUploadedFileTest, addUploadedFile, retrieve, shareFileWith, retrieveSharedFiles, whatsMyAddress, testFunction } from '../contracts/Web3';
// import { useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom';


// const TestingPage = () => {
//     const navigate = useNavigate;
//     const [ address, setAddress ] = useState("");

//     useEffect(() => {
//         const addressTemp = localStorage.getItem('address');
//         if (addressTemp == null) {
//           navigate('/login');
//         }
//         setAddress(addressTemp);
//       },[]);

//     //   QmQN2rxrGUe4o1FvTCveewTS GDSmy61ce586Pm5WAfUFqX

//     return (
//         <>
//             <h1>testing screen</h1>
//             <div className='flex gap-4'>


//             <button onClick={() => whatsMyAddress(address)} className=" bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" type="submit">
//                 whats my address
//             </button>

//             <button onClick={()=>retrieve(address)} className=" bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" type="submit">
//                 get my docs
//             </button>


//             <button onClick={()=>addUploadedFile(address, 'h', 's', 'm', 'p')} className=" bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" type="submit">
//                 upload
//             </button>

//             <button onClick={()=>addUploadedFileTest(address, 'hello')} className=" bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" type="submit">
//                 upload 2
//             </button>


//             <button onClick={() => shareFileWith(address, 'QmQN2rxrGUe4o1FvTCveewTS', 'GDSmy61ce586Pm5WAfUFqX', '0x97Db295b26E4d94512e780f418F99e590CA72c81','filanme', 'pdf')} className=" bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" type="submit">
//                share file with
//             </button>
            

//             <button onClick={()=>retrieveSharedFiles(address)} className=" bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" type="submit">
//                 get shared files
//             </button>

//             <button onClick={()=>testFunction(address)} className=" bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" type="submit">
//                 test function
//             </button>
            
//             </div>


//         </>
//     )
// }

// export default TestingPage;