import React from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useState } from 'react'
import axios from 'axios'
import { RxCross1 } from 'react-icons/rx'
import { AiOutlineEye,AiOutlineEyeInvisible } from 'react-icons/ai'
// this session only valid for 5 min do this type of thing

const ResetPassword = ({resetactivation_token}) => {
    const [newPassword,setNewPassword] = useState("")
  const[newpassClick,setNewPassClick] = useState(false)
  const [confirmPassword,setConfirmPassword]= useState("")
  const[confirmpassClick,setConfirmPassClick] = useState(false)
  const navigate = useNavigate()

      const sendEmail =async()=>{
        console.log("sendemail wala",resetactivation_token)
        if(newPassword.length <5 || newPassword.length >16){
            toast.error("password length must be between 5 to 16 character")
            return
          }

       
        if(newPassword !== confirmPassword){
          toast.error("new password and confirm password must be same ")
          return
        }
        try{
        const {data} = 
      await axios.post("https://web-app-khans-projects-d3416322.vercel.app/api/u2/user/through-email-reset-pass",
      {newPassword,resetactivation_token},
      )
      if(data.success){
        toast.success(data.message)
        navigate('/login')
        
      }
      else{
        console.log("data",data)

      }
      toast.success(data.message)
    }
    catch(err){
      toast.error(err.response && err.response.data.message ? err.response.data.message : err.message)

    }
      }
  return (
    <div className="top-0 left-0 w-full shadow-md  h-screen bg-[#ffffffc8]  py-5 px-2
     fixed z-10  800px:flex justify-center items-center ">
      <div className='800px:w-[40%] flex justify-center items-center  w-full bg-white shadow-xl rounded-[10px] '>
      <div className="800px:w-[90%] h-[80%] my-5 w-full bg-[#ffffffe5] shadow-2xl rounded-[10px] ">

<div className="flex justify-end pt-3 pr-3">
  <RxCross1 className="cursor-pointer" 
   size={20}/>
</div>
<div className="flex  flex-col item-start justify-start w-full px-5 py-5">

{/* <h2 className="font-[500] text-blue-500 text-[15px] pb-2"> proshop</h2> */}
<h1 className="font-[600] text-[20px] pb-2">
Change password
</h1>
<h4 className=" text-[#00000094] text-[17px] pb-2 ">Your password must me atleast 5 charcater and atmost 16 charcater and 
for secure password please include the combination of number,letters, special charcater #%!</h4>

</div>
   <div className="w-full  py-3 px-3">
    


   <div className="relative">
   <input type={newpassClick ? "text" : "password"} placeholder="Enter New Password"
    required  onChange={(e)=>setNewPassword(e.target.value)} minLength={5} maxLength={16}
     className="rounded-[8px] my-3 py-2 hover:border-[2px]
      p-2 hover:border-blue-600 border w-full placeholder:text-[#0000007e] border-indigo-500
      ">

    </input>
    {
      newpassClick ? 
       <AiOutlineEye onClick={(e)=>setNewPassClick(false)} className="top-5 right-2 absolute " size={25}/> 
       :

      <AiOutlineEyeInvisible onClick={(e)=>setNewPassClick(true)} size={25} className="top-5 right-2 absolute">

      </AiOutlineEyeInvisible>
    }
   </div>

  <div className="relative">
  <input type={confirmpassClick ? "text" : "password"} placeholder="Enter Confirm Password"
    required   onChange={(e)=>setConfirmPassword(e.target.value)} minLength={5} maxLength={16}
     className="rounded-[8px] my-3 py-2 hover:border-[2px]
      p-2 hover:border-blue-600 border w-full placeholder:text-[#0000007e] border-indigo-500
      ">

    </input>
    {
      confirmpassClick ? 
       <AiOutlineEye onClick={(e)=>setConfirmPassClick(false)} className="top-5 right-2 absolute " size={25}/> 
       :

      <AiOutlineEyeInvisible onClick={(e)=>setConfirmPassClick(true)} size={25} className="top-5 right-2 absolute">

      </AiOutlineEyeInvisible>
    }
  </div>

   

    {/* <div className="w-full py-5 flex item-start">
      <h4 className="font-[550] cursor-pointer
       text-blue-800 hover:underline-offset-1 hover:underline "
      
      >
        
        Forget your password ?
      
        </h4>
      </div> */}

      <div className="flex justify-center items-center rounded-lg mt-8 
      h-[40px] py-2 bg-blue-600 px-5 mb-8" onClick={sendEmail}
      >
        <div className="text-white font-[550]  "> Change Password

        </div>

      </div>

   </div>




</div>
      </div>
   
      
    </div>
  )
}

export default ResetPassword