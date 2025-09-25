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
import { Icon } from "@iconify/react";
import FadeUpCard from "@/src/animations/FadeButtomUp";

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
      if(initialValues){
      resetForm(); 
    }
    };
  return (
    <section className="relative flex items-center justify-center  w-full overflow-hidden">
      <div 
        className="absolute inset-0 bg-center bg-cover bg-no-repeat 
                   transform scale-[1.6] origin-bottom transition-transform duration-500 ease-in-out"
        style={{ backgroundImage: `url(${contactbg.src})` }}></div>
        <div className="absolute inset-0  bg-gradient-to-r from-dark-green via-foreground/2 to-foreground/5"></div>

     <FadeInUp initialYExis={-60} delay={0.2} className="absolute top-[-40] md:top-[-90] left-0 w-1/4 md:w-2/5 lg:w-2/7 h-1/2 md:h-2/3 overflow-hidden z-20"> 
      <motion.div
        className="h-full w-full relative"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut"}}
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

      <div className="relative ml-[0%] md:ml-[25%] xl:ml-[35%] md:mr-[10%] xl:mr-[0%] z-10 w-[50%] min-w-[400px] xs:w-[450px] md:w-[550px] lg:w-[650%] xl:w-[50%] font-nunito bg-green p-6 xs:p-4 sm:p-8 md:p-8 xl:p-15 shadow-lg  overflow-y-auto py-8 ">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-6 sm:mt-6 md:mt-0 lg:md-8 xl:md-10 text-start px-6"
        >
          <FadeUpCard delay={0.3}>
          <div className="flex gap-2 mt-10 xs:mt-15 p-1 xl:mt-20 ">
            <Icon icon={'mdi:hand-heart'} className="text-lg xs:text-xl md:text-2xl xl:text-3xl text-yellow" />
            <span className=" text-yellow font-caveat font-extrabold block text-xl md:text-2xl xl:text-3xl ">
              {t("Start Donating Poor People")}
            </span>
          </div>
          <h2 className="text-2xl p-2 xl:p-0 xs:p-0 font-nunito sm:text-3xl md:text-4xl xl:text-6xl font-extrabold text-white lg:mt-4 leading-8 md:leading-12 xl:leading-16 tracking-wide ">
            <Trans
             i18nKey="sendMessageForDonation_title"
             components={{
             1: <span className="text-yellow ml-1" />, 
              }}
            />
          </h2>
          </FadeUpCard>
        </motion.div>
       <FadeUpCard>
       <Formik
           initialValues={initialValues}
            validationSchema={SendMsgformSchema}   
            onSubmit={handleSubmit}
                  >
                      {({values,handleChange,isSubmitting,errors,touched,setFieldValue}) => (
        <Form className="space-y-10 px-8 xs:px-2 xs:py-2 xl:px-6 xl:py-2 xl:mt-13 ">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 xs:gap-8 lg:gap-4">
            <div className="relative">
              <InputField
                name='email'
                placeholder={t("your email...")}
                icon={"mdi:send"}
                placeholderClassName="xl:placeholder:text-lg"
                textSize="text-lg"
                errorTextSize="text-lg"
                iconClassName="text-yellow text-lg font-bold size-5 xl:size-7 mt-[2px]"
                className="w-full  rounded-md flex border border-gray-green text-lg bg-foreground/18 xs:h-[50px] xl:h-[60px] px-4 py-4 
                 text-white  focus:outline-none "
              />
            </div>
            <div className="relative">
              <InputField
                name="phone"
                textSize="text-lg"
                errorTextSize="text-lg"
                placeholder={t("your phone...")}
                icon="mdi:phone"
                placeholderClassName="xl:placeholder:text-lg"
                iconClassName="text-yellow text-lg font-bold size-5 xl:size-7 mt-[2px]"
                className="w-full rounded-md border flex border-gray-green xs:h-[50px] xl:h-[60px] bg-foreground/18 px-4 py-4 text-white  focus:outline-none"
              />
            </div>
          </div>

          <div className="relative">
            <InputField
              name="address"
              textSize="text-lg"
                errorTextSize="text-lg"
              placeholder={t("your address...")}
              icon={"mdi:location"}
              placeholderClassName="xl:placeholder:text-lg"
              iconClassName="text-yellow text-lg font-bold size-5 xl:size-7 mt-[2px]"
              className="w-full rounded-md border border-gray-green flex xs:h-[50px] xl:h-[60px] bg-foreground/18 px-4 py-4 text-white  focus:outline-none"
            />
          </div>

          <div className="relative text-white">
            <InputField
            as="textarea"
            name="message"
            textSize="text-lg"
                errorTextSize="text-lg"
            placeholderClassName="xl:placeholder:text-lg"
              placeholder={t("your message...")}
              icon={"mdi:envelope"}
              iconClassName="text-yellow text-lg font-bold size-5 xl:size-7 mt-[2px]"
              className="w-full rounded-md border border-gray-green flex xs:h-[150px] xl:h-[160px] bg-foreground/18 px-4 py-4  focus:outline-none resize-none"
            />
          </div>

          <div className="w-50 xl:w-55 mb-7 xl:mb-10 py-3 px-2 text-foreground">
            <Button
              text={t("Get A Quote")}
              type="submit"
              bgColor="bg-yellow"
              textColor="text-black"
              hoverTextColor="group-hover:text-white"
              hoverBg="before:bg-foreground"
              paddingx="px-10 xl:px-12"
              paddingy="py-4 xl:py-5"
            />
          </div>
        </Form>
        )}
        </Formik>
        </FadeUpCard>
      </div>
    </section>
  );
};

export default SendMsg;
