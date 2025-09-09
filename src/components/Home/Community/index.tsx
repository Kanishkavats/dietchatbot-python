"use client";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import { useState } from "react";
import Notice from "../../common/Notice";
import DonationInput from "../../DonateUs/DonationInput";
import RadioGroup from "../../common/radio/RadioGroup";
import Button from "../../common/Buttons/Button";
import { Donationmethods } from "@/src/staticResource";
import { galleryImageTwo, yellowspade } from "@/public/assets";
import { pageBannerBackgourndColor } from "../../common/PageBanner";
import { motion } from 'framer-motion'
import SideImage from "./SideImage";
import AnimatedReveal from "@/src/animations/AnimatedReveal";

const Community = () => {
    const [amount, setAmount] = useState<string>("50");
    const [method, setMethod] = useState("test");
    const presetAmounts = [20, 50, 100, 200];

    return (
        <section
            className="relative h-[800px]  text-[var(--white)] flex justify-center items-cente overflow-hidde"
        >
            <div className="absolute  z-0 inset-0">
                <Image src={galleryImageTwo.src} alt="bg image" fill className="object-cover" />
            </div>

            <motion.div
                animate={{
                    scale: [1.5, 2.5, 1.5],
                    opacity: [0.6, 1, 0.6],
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="hidden md:block absolute top-[37%] xl:top-[32%] right-20 xl:right-58 transform -translate-y-1/2 text-palate-yellow  z-2"
            >
                <img src={yellowspade.src} alt="decoration" className="size-20 xl:size-40" />
            </motion.div>

            <div className="inset-0 z-1 absolute"
                style={pageBannerBackgourndColor}>

            </div>

            <section className="z-3 py-20 w-11/12 xl:w-10/12 font-nunito  shadow-5xl">

                <AnimatedReveal
                >

                    <p className="text-[var(--yellow)] font-medium flex items-center gap-2 font-caveat text-2xl">
                        <Icon icon="mdi:hand-heart" className=" cursor-pointer" />
                        Start Donating Poor People
                    </p>

                    <h1 className="text-2xl md:text-5xl font-extrabold text-[var(--white)] leading-tight mt-5 font-nunito max-w-xl lg:max-w-2xl">
                        Join The <span className="text-[var(--yellow)]">Community</span>  To Give  Education For Children
                    </h1>

                </AnimatedReveal>
                <AnimatedReveal className="max-w-7xl h-[650px] bg-[var(--white)] rounded-2xl overflow-hidden mx-auto grid xl:grid-cols-5 relative bottom-[-50px] z-5 mb-15">

                    <div className="bg-[var(--white)] text-[var(--foreground)] rounded-xl  py-4 px-4 md:p-12 w-full col-span-3  relative z-10">
                        <h2 className="md:text-3xl font-bold mb-3  md:mb-10">Support Where It Counts.</h2>

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
                        <div className="w-fit">

                            <Button text="Donate Now" />
                        </div>
                    </div>
                    <AnimatedReveal direction="right">
                        <SideImage />
                    </AnimatedReveal>

                </AnimatedReveal>
            </section>

        </section>
    );
};

export default Community;
