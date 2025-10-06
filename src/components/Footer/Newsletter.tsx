"use client";
import { Icon } from "@iconify/react/dist/iconify.js";
import { motion } from "framer-motion";
import Button from "../common/Buttons/Button";
import SlideinFromLeft from "@/src/animations/SlideInFromLeft";
import { useTranslation } from "react-i18next";
import { Form, Formik } from "formik";
import InputField from "../common/inputs/InputField";
import { useMutation } from "@tanstack/react-query";
import { NewsletterEmailForm } from "@/src/services/webForms";
import { NewsletterEmailSchema, NewsletterEmailValues } from "@/src/utils/validations/FormValidation";
import toast from "react-hot-toast";
import ButtonLoader from "../common/Loader/ButtonLoader";

const Newsletter = () => {
   const{t}=useTranslation();
  const bgBase = `relative inline-flex items-center gap-2 before:content-[''] before:absolute before:inset-0 before:bg-quaternary-green before:scale-x-0 before:origin-center before:transition-transform before:duration-300`;

  const bgOnHover = `${bgBase} cursor-pointer hover:text-white hover:before:scale-x-100`;

  const mutation = useMutation({
    mutationFn: (email: string) => NewsletterEmailForm(email),
    onSuccess: () => {
      toast.success("Email subscribed successfully!");
    },
    onError: (error: unknown) => {
      toast.error("Something went wrong. Try again.");
      console.error("Newsletter subscription error:", error);
    },
  });

  const handleSubmit = (
    values: NewsletterEmailValues,
    { resetForm }: { resetForm: () => void }
  ) => {
    console.log("Form submitted with values:", values);
    
    mutation.mutate(values.email, {
      onSuccess: () => {
        resetForm();
      },
      onError: () => {
       
        resetForm();
      },
    });
  };

  return (
    <section className="text-white font-nunito py-16 xl:py-20">
        <div className="container w-full pb-20 xl:ml-20 flex flex-col lg:flex-row lg:items-center justify-between gap-8 px-4 md:px-8 border-b-[1px] border-white/10">
        <SlideinFromLeft>
          <h2 className="text-2xl md:text-3xl xl:text-5xl flex  font-nunito font-extrabold">
            {t("Subscribe To Our Newsletter")}
          </h2>
          <p className="text-white/50 text-sm xl:text-xl mt-2 xl:leading-8 ">
            {t("Regular Inspections And Feedback Mechanisms")}
          </p>
        </SlideinFromLeft>
        <Formik
          initialValues={{ email: "" }}
          validationSchema={NewsletterEmailSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="flex items-center gap-3 md:gap-4 lg:gap-5 w-full lg:w-2/5 ">
              <InputField
                name="email"
                placeholder={t("Enter Email")}
                placeholderClassName="xl:placeholder:text-lg placeholder:text-sm placeholder:text-gray-green"
                textSize="text-lg"
                errorTextSize="text-lg"
                className="flex-1 px-5 py-3  xl:px-6 xl:py-5  rounded md:rounded-full  bg-white focus:outline-none text-gray-700 "
              />
              <div className="w-fit">
                <Button 
                  type="submit"
                  disabled={mutation.isPending}
                  rounded="rounded-[10px] md:rounded-full" 
                  paddingx="px-5 md:px-6 xl:px-8"
                  paddingy="py-3 md:py-3 xl:py-4"
                  icon=""
                >
                  {isSubmitting || mutation.isPending ? <ButtonLoader /> : <Icon icon="bitcoin-icons:share-filled" height={28} width={28} />}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
};

export default Newsletter;
