"use client"
import Image from 'next/image'
import React from 'react'
import LoginImg from "@/images/tori.jpg"
import { toast } from 'sonner'
import { signIn } from 'next-auth/react'

const Login = () => {
  const [userInfo, setUserInfo] = React.useState({
    email: "",
    password: ""
  })
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log(userInfo);

    try {
      if (!userInfo.email || !userInfo.password) {
        toast.warning("Please fill in all fields");
        return;
      }
      signIn("credentials", {
        email: userInfo.email,
        password: userInfo.password,
      });
    } catch (error: unknown) {
      throw new Error(error as string);
    }
  }
  return (
    <div className="flex flex-row-reverse items-center w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg lg:max-w-5xl mt-16">
      <div className="hidden lg:block lg:w-1/2 h-full">
        <Image src={LoginImg} width={500} height={800} alt='Banner' className='h-full' />
      </div>

      <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
        <div className="flex justify-center mx-auto">
          <Image width={20} height={20} className="w-auto h-7 sm:h-8"
            src="https://merakiui.com/images/logo.svg" alt="Logo" />
        </div>
        <p className="mt-3 text-xl text-center text-gray-600">Please Login Here!</p>
        <form onSubmit={handleSubmit}>
          <div className="mt-4">
            <label className="block mb-2 text-sm font-medium text-gray-600 ">Email Address</label>
            <input name='name' onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
              className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg 
              focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300" type="text" />
          </div>

          <div className="mt-4">
            <div className="flex justify-between">
              <label className="block mb-2 text-sm font-medium text-gray-600 ">Password</label>
              <a href="#" className="text-xs text-gray-500 hover:underline">Forget Password?</a>
            </div>
            <input name='password' onChange={(e) => setUserInfo({ ...userInfo, password: e.target.value })}
              className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg  focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300" type="password" />
          </div>

          <div className="mt-6">
            <input type='submit' value={'Sign In'}
              className="btn w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50" />
          </div>
        </form>

        <div className="flex items-center justify-between mt-4">
          <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
          <a href="#" className="text-xs text-gray-500 uppercase dark:text-gray-400 hover:underline">
            or Sign In</a>
          <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
        </div>

      </div>
    </div>
  )
}

export default Login
