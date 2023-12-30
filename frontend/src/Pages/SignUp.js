import React, { useState, useEffect } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import styles from "../Style/style";
import { Link } from "react-router-dom";
import { RxAvatar } from "react-icons/rx";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
// import { response } from "express";

// import express from "express";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [confirmPass, setComfirmPass] = useState("");
  const [show, setShow] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const navigate = useNavigate();

  const { isAuthenticatd } = useSelector((state) => state.userRed);

  useEffect(() => {
    if (isAuthenticatd) {
      navigate("/");
    }
  }, []);

  const setProfileAvatar = (e) => {
    const render = new FileReader();
    render.readAsDataURL(e.target.files[0]);
    render.onload = () => {
      if (render.readyState === 2) {
        setAvatar(render.result);
      }
    };
  };

  // const submitHandler = async(e)=>{

  // }

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const dat = await axios.post(
        "http://localhost:8000/api/u2/user/create-user",
        { name, email,  password, avatar }
      );
      toast.success(dat.data.message);
      navigate("/login");
      setName("");
      setEmail("");
      setPass("");
      setComfirmPass("");
      setAvatar();
    } catch (err) {
      toast.error(
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message
      );
      // console.log(err.response.data.message)
    }
  };

  return (
    <div className="bg-gray-50 py-12 min-h-screen sm:px-6 lg:px-8 flex justify-center flex-col">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-3 text-center font-extrabold text-gray-900 text-3xl">
          Sign Up
        </h2>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md ">
          <div className="bg-white py-8 px-4 shadow sm:rounder-lg sm:px-10">
            <form className="space-y-6" onSubmit={submitHandler}>
              <div>
                <label
                  htmlFor="Name"
                  className="block text-sm text-gray-700 font-medium"
                >
                  Name
                </label>
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  name="Name"
                  placeholder="Enter your name"
                  className="text-sm block font-medium appearance-none border border-gray-500 w-full placeholder-gray-700
                  focus:ring-blue-500 focus:border-blue-500 rounded-sm focus:outline-none px-3 py-2 sm:text-sm
                  "
                ></input>
              </div>
              <div >
                <label
                  htmlFor="email"
                  className="text-gray-700 font-medium text-sm block"
                >
                  Email
                </label>
                <input
                  required
                  autoComplete="on"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your Email"
                  type="email"
                  className="py-2 px-3 w-full block appearance-none border text-sm border-gray-500 placeholder-gray-700
                focus:ring-blue-500 focus:border-blue-500 focus:outline-none rounded-sm sm:text-sm font-medium"
                ></input>
              </div>

              <div className="relative">
                <label
                  htmlFor="password"
                  className="text-gray-700 font-medium text-sm block"
                >
                  Password
                </label>
                <div className="relative w-full">
                  <input
                    required
                    value={password}
                    onChange={(e) => setPass(e.target.value)}
                    placeholder="Enter your Password"
                    type={show ? "text" : "password"}
                    className="py-2 px-3 w-full block appearance-none border text-sm border-gray-500 placeholder-gray-700 focus:ring-blue-500 focus:border-blue-500 focus:outline-none rounded-sm sm:text-sm font-medium"
                  />
                  <div className="absolute top-2 right-2">
                    {show ? (
                      <AiOutlineEye
                      onClick={()=>setShow(false)}
                      className="cursor-pointer"
                       size={22} />
                    ) : (
                      <AiOutlineEyeInvisible
                      onClick={()=>setShow(true)}
                      className="cursor-pointer"
                       size={22} />
                    )}
                  </div>
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-color-700 text-sm font-medium"
                >
                  Confirm Password
                </label>
                <input
                  value={confirmPass}
                  required
                  onChange={(e) => setComfirmPass(e.target.value)}
                  placeholder="Enter Confirm Password"
                  type="password"
                  className="py-2  px-3 appearance-none border border-gray-500 placeholder-gray-700 w-full block
                focus:ring-blue-500 focus:outline-none rounded-sm sm:text-sm font-medium focus:border-blue-500 "
                ></input>
              </div>
              <div>
                <label
                  htmlFor="avatar"
                  className="block text-sm font-medium text-gray-700"
                ></label>

                <div className="mt-2 flex items-center">
                  <span className="inline-block h-8 w-8 rounded-full overflow-hidden">
                    {avatar ? (
                      <img
                        src={avatar}
                        alt="avatar"
                        className="h-full w-full object-cover rounded-full"
                      ></img>
                    ) : (
                      <RxAvatar className="h-8 w-8 "></RxAvatar>
                    )}
                  </span>
                  <label
                    htmlFor="file-input"
                    className="ml-5 flex items-center cursor-pointer justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm backdrop:font-medium text-gray-700 bg-white hover:backdrop:bg-gray-50"
                  >
                    <span>Upload a Image</span>
                    <input
                      type="file"
                      name="avatar"
                      id="file-input"
                      accept=".jpg,.jpeg,.png"
                      onChange={setProfileAvatar}
                      className="sr-only"
                    ></input>
                  </label>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="py-2 px-4 rounded-md group relative flex justify-center border border-transparent
                   text-sm font-medium bg-blue-600 text-white w-full h-[40px] hover:bg-blue-700"
                >
                  Submit
                </button>
              </div>

              <div className={`${styles.normalFlex} w-full`}>
                <h4>Have an account? </h4>
                <Link to="/login" className="text-blue-700 pl-2">
                  {" "}
                  Login{" "}
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
