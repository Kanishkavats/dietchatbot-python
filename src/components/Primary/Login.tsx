import React from "react";
import Image from "next/image";
import Link from "next/link";
import "@/src/app/globals.css";
import { logo } from "@/public/assets";

const Login = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="grid grid-cols-1 md:grid-cols-2 flex-grow">
        <div className="hidden md:flex flex-col items-center justify-center bg-primaryColor text-black p-10">
          <Image
            src={logo.src}
            alt="logo"
            width={280}
            height={120}
            className="mb-6"
          />
          <h2 className="text-3xl font-bold text-center">Welcome Back</h2>
          <p className="mt-4 text-center text-black/80 max-w-md">
            Sign in to continue managing your funds and stay connected with the
            Charifund community.
          </p>
        </div>

        <div className="flex flex-col items-center bg-primaryColor md:bg-white justify-center px-6 py-8 lg:px-12">
          <div className="flex justify-center mb-6 md:hidden">
            <Image
              src={logo.src}
              alt="logo"
              width={200}
              height={80}
              className="h-16 w-auto"
            />
          </div>

          <div className="w-full bg-white rounded-lg shadow border border-gray-200 sm:max-w-md p-6 md:p-8">
            <h1 className="text-2xl font-bold leading-tight tracking-tight text-gray-900 md:text-3xl mb-6">
              Sign In
            </h1>

            <form className="space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="abc@gmail.com"
                  required
                  className="border border-secondaryColor text-gray-900 rounded-lg block w-full p-2.5 focus:ring-primaryColor focus:border-primaryColor"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  required
                  className="border border-secondaryColor text-gray-900 rounded-lg block w-full p-2.5 focus:ring-primaryColor focus:border-primaryColor"
                />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2">
                <label className="flex items-center text-sm text-gray-600">
                  <input
                    id="remember"
                    type="checkbox"
                    className="w-4 h-4 border-gray-300 rounded mr-2 cursor-pointer"
                  />
                  Remember me
                </label>
                <div className="text-sm cursor-pointer font-medium text-primaryColor hover:underline">
                  Forgot password?
                </div>
              </div>

              <button
                type="submit"
                className="w-full cursor-pointer bg-primaryColor text-black font-bold hover:bg-primaryColor/90 
                           focus:ring-4 focus:outline-none focus:ring-primaryColor/50 
                           rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Sign in
              </button>
              <p className="text-sm text-gray-700">
                Don’t have an account yet?{" "}
                <Link
                  href="/register"
                  className="font-medium text-primaryColor hover:underline"
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
