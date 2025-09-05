"use client";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import { useState } from "react";
import Notice from "../../common/Notice";
import DonationInput from "../../DonateUs/DonationInput";
import RadioGroup from "../../common/radio/RadioGroup";
import Button from "../../common/Buttons/Button";
import { Donationmethods } from "@/src/staticResource";
import { homeCommunity } from "@/public/assets";

const Community = () => {
    const [amount, setAmount] = useState<string>("50");
    const [method, setMethod] = useState("test");
    const presetAmounts = [20, 50, 100, 200];

    return (
        <section className="relative bg-[var(--green)] text-[var(--white)] flex justify-center items-center">
            <section className="  py-20 w-11/12 xl:w-10/12 font-nunito">

                <p className="text-[var(--yellow)] font-medium flex items-center gap-2 font-caveat text-2xl">
                    <Icon icon="mdi:hand-heart" className=" cursor-pointer" />
                    Start Donating Poor People
                </p>

                <h1 className="text-4xl md:text-5xl font-extrabold text-[var(--white)] leading-tight mt-5 mb-9 font-nunito">
                    Join The <span className="text-[var(--yellow)]">Community</span>  To Give <br /> Education For Children
                </h1>
                <div className="absolute left-0 bottom-0 -translate-x-1/2">
                    <div className="w-24 h-24">
                        {/* Example heart balloon illustration */}
                        <div className="bg-red-500 w-16 h-16 rounded-full flex items-center justify-center">
                            ❤️
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl bg-[var(--white)] rounded-2xl overflow-hidden mx-auto grid grid-cols-5">

                    <div className="bg-[var(--white)] text-[var(--foreground)] rounded-xl shadow-lg p-8 lg:p-12 w-full col-span-3 relative z-10">
                        <h2 className="text-3xl font-bold  mb-10">Support Where It Counts.</h2>

                        <div className="mb-8">
                            <Notice message="Test Mode Is Enabled. While In Test Mode No Live Donations Are Processed." />
                        </div>

                        {/* Donation Input */}
                        <DonationInput
                            presetAmounts={presetAmounts}
                            value={amount}
                            onAmountChange={(val) => setAmount(val)}
                        />

                        {/* Payment Methods */}
                        <div className="space-y-3 mt-10">
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
                    </div>

                    <div className="w-full  relative col-span-2 ">
                        <div className="overflow-hidden rounded-r-xl">
                            <Image
                                src={homeCommunity}
                                alt="Donation"
                                fill
                                className="object-cover w-full h-full"
                            />
                        </div>
                    </div>
                </div>
            </section>

        </section>
    );
};

export default Community;
