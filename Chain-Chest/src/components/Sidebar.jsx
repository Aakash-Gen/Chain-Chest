import {useNavigate} from 'react-router-dom'

function Sidebar(){
    const navigate = useNavigate();

    return(
        <>
       
        <div className="p-5 bg-purple-700 text-white font-medium">
        <div className="flex justify-around cursor-pointer">
            <div  onClick={() => navigate("/")}>Home</div>
            <div  onClick={() => navigate("/upload")}>Upload Documents</div>
            <div  onClick={() => navigate("/about")}>About us</div>
            <div  onClick={() => navigate("/login")}>Login</div>
            </div>
        </div>

        </>
    )


}

export default Sidebar