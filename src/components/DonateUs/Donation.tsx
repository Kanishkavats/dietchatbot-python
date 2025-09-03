"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import RadioGroup from "../common/radio/RadioGroup";
import Button from "../common/Buttons/Button";
import DetailsForm from "./DetailsForm";
import { Donationmethods } from "@/src/staticResource";

const Donation = () => {
  const [amount, setAmount] = useState<string>("50");
  const [method, setMethod] = useState("test");

  const presetAmounts = [20, 50, 100, 200];
 
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (/^\d*$/.test(val)) setAmount(val);
  };

  return (
    <div className="max-w-2xl mx-auto xl:px-4 xl:py-8 space-y-8 ">
      <h2 className="text-xl font-semibold">Support Where It Counts.</h2>

      {/* Notice */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="xl:pl-15 max-w-[35rem] flex items-center  relative p-4 border border-[var(--gray-200)] rounded xl:rounded-full shadow-sm"
      >
        <div className="h-full w-[6px] bg-[var(--dark-green)] absolute top-0 left-10 hidden xl:flex justify-center items-center ">
          <span className="text-[var(--yellow)] text-xl">⚠️</span>
        </div>
        <p className="text-[16px] text-[var(--gray-green)] ">
          <strong className="font-semibold text-[var(--foreground)]">
            Notice:
          </strong>{" "}
          Test Mode Is Enabled. While In Test Mode No Live Donations Are
          Processed.
        </p>
      </motion.div>

      {/* Donation Input */}
      <div className="space-y-3">
        <p className="text-xl font-semibold">Your Donation:</p>
        <div className="flex items-center bg-[var(--gray-100)] rounded-full px-4 py-1 space-x-4 max-w-[35rem]">
          <div className="bg-[var(--green)] text-[var(--white)] rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold">
            $
          </div>
          <input
            type="text"
            value={amount}
            onChange={handleAmountChange}
            inputMode="numeric"
            className="bg-transparent outline-none w-full text-xl font-medium 
              [&::-webkit-outer-spin-button]:appearance-none 
              [&::-webkit-inner-spin-button]:appearance-none 
              [&::-moz-appearance]:textfield "
          />
        </div>

        {/* Preset Buttons */}
        <div className="flex flex-wrap gap-3 pt-2">
          {presetAmounts.map((preset) => (
            <button
              key={preset}
              onClick={() => setAmount(preset.toString())}
              className={`px-5 py-2 rounded-full text-sm font-semibold cursor-pointer hover:bg-[var(--green)] hover:text-[var(--white)] border ${
                amount === preset.toString()
                  ? "bg-[var(--green)] text-[var(--white)]"
                  : "bg-[var(--white)] text-[var(--green)] border-[var(--gray-200)]"
              } transition`}
            >
              {preset}
            </button>
          ))}
          <button
            onClick={() => setAmount("0")}
            className={`px-5 py-2 rounded-full text-sm font-semibold cursor-pointer hover:bg-[var(--green)] hover:text-[var(--white)] border ${
              !presetAmounts.map(String).includes(amount)
                ? "bg-[var(--green)] text-[var(--white)]"
                : "bg-[var(--white)] text-[var(--green)] border-[var(--gray-200)]"
            } transition`}
          >
            Custom
          </button>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="space-y-3">
        <p className="text-xl font-semibold">Select Payment Method</p>
        <RadioGroup
          name="payment"
          options={Donationmethods}
          value={method}
          onChange={setMethod}
          selectedColor="var(--green)"
          className="mb-6"
        />
      </div>

      <Button text="Donate Now" />
      <div className="bg-[var(--gray-200)] h-[3px]" />
      <DetailsForm />
    </div>
  );
};

export default Donation;
