import {useNavigate} from 'react-router-dom'

function AppBar(){
    const navigate = useNavigate();

    return(
        <>
            <div className="p-5 bg-purple-700 text-white font-medium">
                <div className="px-12 flex justify-start gap-14">
                    {/* {window.location.pathname} */}
                    <div className='cursor-pointer' onClick={() => navigate("/")}>Home</div>
                    <div className='cursor-pointer' onClick={() => navigate("/platform")}>Platform</div>
                    <div className='cursor-pointer' onClick={() => navigate("/about")}>About us</div>
                    <div className='cursor-pointer' onClick={() => navigate("/login")}>Login</div>
                    {/* <div  onClick={() => navigate("/login")}>Login</div> */}
                </div>
            </div>
        </>
    )


}

export default AppBar