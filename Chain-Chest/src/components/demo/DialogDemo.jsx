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
import {useState} from 'react';

 
export function DialogDemo(props) {
  // const [address, setAddress] = useState("");
  // const navigate = useNavigate();
  
  // useEffect(() => {
  //     const addressTemp = localStorage.getItem('address');
  //     if (addressTemp == null) {
  //       navigate('/login');
  //     }
  //     setAddress(addressTemp);
  // },[]);
  const [sharedAddress,setSharedAddress] = useState("");

  const handleShare = () => {
    shareFile(props.address, sharedAddress, props.fileName, props.docType);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <IoMdShare size={24} className="hover:cursor-pointer"/>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Share</DialogTitle>
          <DialogDescription>
            Share Your document with people you trust. You can not undo this action.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="withAddress" className="text-right">
            </Label>
            <Input
              id="withAddress"
              defaultValue=""
              className="col-span-3"
              placeholder="Enter the address"
              onchange={(e)=>setSharedAddress(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button onclick={handleShare}type="submit">Send</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
