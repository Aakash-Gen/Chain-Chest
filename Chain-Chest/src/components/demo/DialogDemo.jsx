import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { IoMdShare } from "react-icons/io";
import { shareFile } from '@/contracts/Web3';
import {useState,useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import { retrieve } from "@/contracts/Web3";

 
export const DialogDemo = (props) => {
  // const [address, setAddress] = useState("");
  // const navigate = useNavigate();
  // // const [files,setFiles] = useState("");
  
  // useEffect(() => {
  //     const addressTemp = localStorage.getItem('address');
  //     if (addressTemp == null) {
  //       navigate('/login');
  //     }
  //     setAddress(addressTemp);
  // },[]);
  const [sharedAddress,setSharedAddress] = useState("");


  const handleShare = () => {
    shareFile(props.address, sharedAddress, props.ipfsHash1, props.ipfsHash2, props.fileName, props.docType);
  }

  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <IoMdShare size={20} className="hover:cursor-pointer"/>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px]">
          
          <DialogHeader>
            <DialogTitle className="text-2xl">Share</DialogTitle>
            <DialogDescription>
              Share Your document with people you trust. You can not undo this action.
            </DialogDescription>
          </DialogHeader>

              <Input
                id="withAddress"
                defaultValue=""
                className="w-full"
                placeholder="Enter the address"
                onChange={(e)=>setSharedAddress(e.target.value)}
              />

          <DialogFooter>
            <Button onClick={handleShare}type="submit">Send</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
