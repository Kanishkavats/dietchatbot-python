'use client'
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Button from "../components/common/Buttons/Button";


const NotFound = () => {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] bg-white px-4 text-center py-10 sm:py-16">
      <div className="w-[250px] sm:w-[350px] md:w-[500px] mx-auto">
        <Image
          src="/assets/PageNotFound.png"
          alt="404 Error"
          width={500}
          height={400}
          className="w-full h-auto"
        />
      </div>
      <h1 className="mt-6 text-xl sm:text-3xl md:text-5xl font-extrabold text-black font-nunito">
        Page Not Found
      </h1>


      <p className="mt-4 sm:mt-8  mx-auto text-[#000000] font-nunito text-center text-base sm:text-lg  whitespace-normal md:whitespace-nowrap">
        It could have been removed, renamed, or temporarily unavailable. <br />
        Try searching for what you're looking for.
      </p>

      <div className="mt-6 sm:mt-8">
        <Link href="/" passHref>
          <Button text="Back To Home" bgColor="bg-[#FFC107]" />
        </Link>
      </div>

      <motion.div
        className="absolute top-[5%] right-[5%] z-0"
        animate={{
          scale: [1, 1.2, 1],
          filter: [
            "brightness(0.8)",
            "brightness(1.4)",
            "brightness(0.8)",
          ],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Image
          src="/assets/greenspade.png"
          alt="green spade"
          width={120}
          height={120}
          className="opacity-90"
        />
      </motion.div>


      <motion.div
        className="absolute bottom-[8%] left-[3%] z-0"
        animate={{
          scale: [1, 1.2, 1],
          filter: [
            "brightness(0.8)",
            "brightness(1.4)",
            "brightness(0.8)",
          ],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",

        }}
      >
        <Image
          src="/assets/yellowspade.png"
          alt="yellow spade"
          width={150}
          height={150}
          className="opacity-90 w-[100px] sm:w-[150px] md:w-[200px] h-auto"
        />
      </motion.div>
    </div>
  )
}

export default NotFound