"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import RadioGroup from "../common/radio/RadioGroup";
import Button from "../common/Buttons/Button";
import DetailsForm from "./DetailsForm";
import { Donationmethods } from "@/src/staticResource";
import Notice from "../common/Notice";
import DonationInput from "./DonationInput";

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
      <Notice message="Test Mode Is Enabled. While In Test Mode No Live Donations Are Processed." />

      {/* Donation Input */}
      <DonationInput
        presetAmounts={presetAmounts}
        value={amount}
        onAmountChange={(val) => setAmount(val)}
      />

      {/* Payment Methods */}
      <div className="space-y-3">
        <p className="text-xl font-semibold">Select Payment Method</p>
        <RadioGroup
          name="payment"
          options={Donationmethods}
          value={method}
          onChange={setMethod}
          selectedColor="green"
          className="mb-6"
        />
      </div>
      <Button text="Donate Now" />
      <div className="bg-gray-200 h-[3px]" />
      <DetailsForm />
    </div>
  );
};

export default Donation;
