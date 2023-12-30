import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'
const ForgetPass = () => {
    const [email,setEmail] = useState("")
    const navigate = useNavigate()
    //  check here to see what the issue is here when i click on 
    // submit button and then the user request is not send in the backend server tis is some poroblem 
    //  in backend check the forget email router 
    const handelSubmit = async()=>{
        try{
            const data = await axios.post("https://web-app-khans-projects-d3416322.vercel.app/api/u2/user/forget-email",{email})

            if(data){
                console.log(data)
                toast.success("Please check your email , ResetPass email send successfully!!",{
                    toastId:"success1"
                })
                navigate("/login")
            }

        }
        catch(err){
            console.log(err)
            toast.error(err.response && err.response.data.message ? err.response.data.message : err.message)
    
        }
    }
  return (
    <div className='w-full  bg-gray-50  flex justify-center items-center flex-col py-12 sm:px-6 lg:px-8'>
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-3 text-center text-3xl font-extrabold text-gray-900 ">
          Please Enter your Email
        </h2>


        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl sm:rounded-lg sm:px-10">
            <div>
            <input
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            required
            type='email'
            placeholder='Enter your registered Email...'
            className='px-2 py-2 placeholder-[#00000090] w-full  focus:outline-none border-[#0000009e]
             focus:ring-indigo-500 hover:border-purple-500 block appearance-none
              border-[2px] focus:border-indigo-500 '
            >

</input>
            </div>
            <div className=' flex justify-end items-center mt-5 '>
               <div
               className='px-4 py-2 border-[2px] shadow-md bg-[black] rounded  '
               onClick={handelSubmit}
               >
                <span className='text-[14px] text-white font-[600] 800px:text-[19px] '>

                Submit
                </span>

               </div>

            </div>
            
            
            </div>
        </div>
        
    </div>
  )
}

export default ForgetPass