import { FaPhoneAlt } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";

function Footer(){

    return(
        <div>
            <div className="bg-gray-200 grid sm:grid-cols-2 lg:grid-cols-10 p-10 lg:p-20 gap-10">
          
          {/* skyzone dealership */}
          <div className="flex flex-col text-black gap-6 text-md col-span-3">
            <div className="text-3xl font-black">
              Chain Chest
            </div>
            <div>
            Once your data is on the blockchain, it becomes immutable, 
            incorruptible, and impervious to loss or tampering.
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2"> <FaPhoneAlt /> +91 (768)30 89932</div>
              <div className="flex items-center gap-2"> <MdOutlineMail /> dealers@chain-chest.com</div>
              <div className="flex items-center gap-2"> <FaLocationDot />65/13, Dwarka, IN</div>
            </div>
          </div>

          {/* company */}
          <div className="flex flex-col text-black gap-5 text-md col-span-2">
            <div className="text-3xl font-bold">
              Company
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2"> Careers</div>
              <div className="flex items-center gap-2"> Blogs</div>
              <div className="flex items-center gap-2">Blog</div>
            </div>
          </div>

          {/* working hours */}
          <div className="flex flex-col text-black gap-5 text-md col-span-2">
            <div className="text-3xl font-bold">Working Hours</div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">Mon - Fri: 9:00AM - 9:00PM</div>
              <div className="flex items-center gap-2">Sat: 9:00AM - 19:00PM</div>
              <div className="flex items-center gap-2">Sun: Closed</div>
            </div>
          </div>

          {/* subscribe */}
          <div className="flex flex-col text-black gap-5 text-md col-span-3">
            <div className="text-3xl font-bold">Subscription</div>
            <div className="flex flex-col gap-3">
              <div className="flex items-center">Subscribe your Email address for latest news & updates.</div>
              <input type="email" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-black focus:border-black block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Email" required />
              <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Subscribe</button>
            </div>
          </div>
      </div>
  </div>
  )
}
        

export default Footer