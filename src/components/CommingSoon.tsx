"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

const ComingSoon = () => {
  const targetDate = new Date("2025-12-31T23:59:59");

  const [timeLeft, setTimeLeft] = useState(getTimeRemaining());
  const [clock, setClock] = useState(getClockAngles());

  function getTimeRemaining() {
    const total = targetDate - new Date();
    const days = Math.max(0, Math.floor(total / (1000 * 60 * 60 * 24)));
    const hours = Math.max(0, Math.floor((total / (1000 * 60 * 60)) % 24));
    const minutes = Math.max(0, Math.floor((total / 1000 / 60) % 60));
    const seconds = Math.max(0, Math.floor((total / 1000) % 60));
    return { days, hours, minutes, seconds };
  }

  function getClockAngles() {
    const now = new Date();
    const h = now.getHours() % 12;
    const m = now.getMinutes();
    const s = now.getSeconds();
    return {
      hour: 30 * h + m / 2,
      minute: 6 * m,
      second: 6 * s,
    };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeRemaining());
      setClock(getClockAngles());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-[url('/assets/banner-one-bg.png')] bg-cover bg-center text-white flex flex-col items-center">
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative z-10 flex flex-col items-center py-25">
        <div className="bg-transparent text-white py-5">
            <Image
            src="/assets/aboutsection/logocoming.png"
            alt="logo"
            height={200}
            width={200}
            className="text-white"
            />
        </div>

        <div className="relative w-[250px] h-[20px] md:w-[500px] md:h-[500px] flex items-center justify-center mb-10">
          <div className="absolute rounded-full w-full h-full bg-black/30 shadow-[0_8px_32px_rgba(0,0,0,0.9)]"></div>

          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute flex items-center justify-center w-12 h-12 text-white/80 text-xl rounded-full"
              style={{
                transform: `rotate(${i * 30}deg) translateY(-215px) rotate(-${
                  i * 30
                }deg)`,
              }}
            >
              {i === 0 ? 12 : i}
            </div>
          ))}

          <div
            className="absolute w-3 bg-white rounded-md origin-bottom left-1/2"
            style={{
              height: "120px",
              top: "50%",
              transform: `translate(-50%,-100%) rotate(${clock.hour}deg)`,
            }}
          ></div>
          <div
            className="absolute w-2 bg-white rounded-md origin-bottom left-1/2"
            style={{
              height: "130px",
              top: "50%",
              transform: `translate(-50%,-100%) rotate(${clock.minute}deg)`,
            }}
          ></div>
          <div
            className="absolute w-[6px] bg-white rounded-md origin-bottom left-1/2 transition-transform duration-[900ms] ease-linear"
            style={{
              height: "170px",
              top: "50%",
              transform: `translate(-50%,-100%) rotate(${clock.second}deg)`,
            }}
          ></div>

          <div className="absolute flex flex-wrap md:flex-nowrap gap-6 justify-center">
            <TimeBox label="DAYS" value={timeLeft.days} />
            <TimeBox label="HOURS" value={timeLeft.hours} />
            <TimeBox label="MINUTES" value={timeLeft.minutes} />
            <TimeBox label="SECONDS" value={timeLeft.seconds} />
          </div>
        </div>

        <h2 className="text-3xl font-bold mb-2 font-nunito">
          Something Exciting Is Coming!
        </h2>
        <p className="text-lg text-white/80 mb-6 text-center max-w-xl">
          Exciting Updates Are On The Way. <br /> Stay With Us!
        </p>

        <div className="flex justify-center items-center w-full ">
          <div className="bg-[#ffffff] ">
            <input
              type="email"
              placeholder="Your Email"
              className="flex-1 px-4 py-5  outline-none text-black"
            />
          </div>
          <button className="bg-[#FFC107] py-5 text-black font-bold px-8   hover:bg-[#046b59] transition-colors duration-500 ease-in-out">
            SUBSCRIBE
          </button>
        </div>
      </div>
    </div>
  );
};

const TimeBox = ({ label, value }) => (
  <div className="backdrop-blur-md bg-white/10 rounded-xl h-40 w-40 sm:h-36 sm:w-36 flex flex-col  items-center justify-center text-white shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
    <div className="text-5xl font-bold">{value < 10 ? `0${value}` : value}</div>
    <div className="text-lg">{label}</div>
  </div>
);

export default ComingSoon;
