"use client";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import Image from "next/image";
import React from "react";
import { FaEnvelope } from "react-icons/fa";
import { FaLocationDot, FaPhone } from "react-icons/fa6";
import Button from "../common/Buttons/Button";
import { useInView } from "react-intersection-observer";
import FadeInUp from "@/src/animations/FadeInUp";
import { contactbg, shapeleft } from "../../../public/assets";
import { Form, Formik } from "formik";import { Trans, useTranslation } from "react-i18next";
import { FormValues, SendMsgformSchema, SendMsgFormValues } from "@/src/utils/validations/FormValidation";
import InputField from "../common/inputs/InputField";

const initialValues: SendMsgFormValues = {
    email: "",
    phone: "",
    address: "",
    message: "",
};
const SendMsg: React.FC = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  const{t}=useTranslation();
  const handleSubmit = (values: SendMsgFormValues, { resetForm }: { resetForm: () => void }) => {
      console.log("Form Submitted:", values);
      resetForm(); 
    };
  return (
    <section className="relative flex items-center justify-center min-h-screen w-full overflow-hidden">
      {/* Container for the zoomed-in background image and its gradient overlay */}
      <div 
        className="absolute inset-0 bg-center bg-no-repeat 
                   transform scale-[1.6] origin-bottom transition-transform duration-500 ease-in-out"
        style={{ backgroundImage: `url(${contactbg.src})` }}></div>
        <div className="absolute inset-0  bg-gradient-to-r from-dark-green to-black/10"></div>

     <FadeInUp initialYExis={-60} delay={0.2} className="absolute top-[-40] left-0 w-1/3 md:w-1/4 h-1/2 md:h-2/3 overflow-hidden z-20"> 
      <motion.div
        className="h-full w-full relative"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <Image
          src={shapeleft}
          alt="Decorative shape"
          fill
          priority
          className="object-cover"
        />
      </motion.div>
      </FadeInUp>

      <div className="relative ml-[0%] md:ml-[35%] z-10 w-[50%] min-w-[400px] min-h-screen  bg-[#00715d] p-6 sm:p-8 md:p-10 shadow-lg  overflow-y-auto py-8 ">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-6 sm:mt-6 md:mt-0 lg:md-8 xl:md-10 text-start px-6"
        >
          <div className="flex gap-2">
            <i className="text-2xl text-yellow hand-icon"></i>
            <span className=" text-yellow font-caveat font-extrabold block text-2xl ">
              {t("Start Donating Poor People")}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-extrabold text-white mt-2 font-nunito leading-tight ">
            {/* {t("Send Us")} <span className="text-yellow">{t("Message")}</span> {t("For")} <br />
            {t("Donation!")} */}
            <Trans
    i18nKey="sendMessageForDonation_title"
    components={{
      1: <span className="text-yellow" />, // This maps to <1>संदेश</1>
      2: <br />, // This maps to <2></2>
    }}
  />
          </h2>
        </motion.div>
       <Formik
           initialValues={initialValues}
            validationSchema={SendMsgformSchema}   
            onSubmit={handleSubmit}
                  >
                      {() => (
        <Form className="space-y-10 px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="relative">
              <InputField
                name='email'
                placeholder={t("your email...")}
                icon={"mdi:send"}
                iconClassName="text-yellow text-lg font-bold size-5 mt-[2px]"
                className="w-full rounded-md flex border border-gray-green bg-black/18 px-4 py-4 
                 text-white  focus:outline-none "
              />
              {/* <Send className="absolute right-3 top-1/2 -translate-y-1/2 text-yellow w-5 h-5" /> */}
            </div>
            <div className="relative">
              <InputField
                name="phone"
                placeholder={t("your phone...")}
                icon="mdi:phone"
                iconClassName="text-yellow text-lg font-bold size-5 mt-[2px]"
                className="w-full rounded-md border flex border-gray-green bg-black/18 px-4 py-4 text-white  focus:outline-none"
              />
            </div>
          </div>

          <div className="relative">
            <InputField
              name="address"
              placeholder={t("your address...")}
              icon={"mdi:location"}
              iconClassName="text-yellow text-lg font-bold size-5 mt-[2px]"
              className="w-full rounded-md border border-gray-green flex bg-black/18 px-4 py-4 text-white  focus:outline-none"
            />
          </div>

          <div className="relative text-white">
            <InputField
            as="textarea"
            name="message"
              placeholder={t("your message...")}
              icon={"mdi:envelope"}
              iconClassName="text-yellow text-lg font-bold size-5 mt-[2px]"
              className="w-full rounded-md border border-gray-green flex bg-black/18 px-4 py-4  focus:outline-none resize-none"
            />
          </div>

          <div className="w-55  text-black">
            <Button
              text={t("Get A Quote")}
              bgColor="bg-[#FFC107]"
              textColor="text-black"
              hoverTextColor="group-hover:text-white"
              hoverBg="before:bg-black"
              
            />
          </div>
        </Form>
        )}
        </Formik>
      </div>
    </section>
  );
};

export default SendMsg;
