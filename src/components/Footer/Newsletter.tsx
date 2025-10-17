


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
import {
  NewsletterEmailSchema,
  NewsletterEmailValues,
} from "@/src/utils/validations/FormValidation";
import toast from "react-hot-toast";
import ButtonLoader from "../common/Loader/ButtonLoader";

const Newsletter = () => {
  const { t } = useTranslation();
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
    mutation.mutate(values.email, {
      onSuccess: () => resetForm(),
      onError: () => resetForm(),
    });
  };

  return (
    <section className="text-white font-nunito py-16 xl:py-20">
      <div className="container w-full max-w-screen-2xl mx-auto pb-20 flex flex-col lg:flex-row lg:items-center justify-start gap-8  sm:px-10 md:flex-row md:items-center md:justify-between 2xl:px-0 border-b-[1px] border-white/10">
        {/* Text Section */}
        <SlideinFromLeft>
          <div>
            <h2 className="text-[30px] sm:text-[24px] md:text-[30px] xl:text-[40px]  2xl:text-[40px] flex font-nunito font-extrabold sm:my-[-8px] ">
              {t("Subscribe To Our Newsletter")}
            </h2>
            <p className="text-[18px] sm:text-[18px] xl:text-[18px] md:text-[18px] 2xl:text-[18px] mt-2 xl:leading-8 2xl:mt-8px">
              {t("Regular Inspections And Feedback Mechanisms")}
            </p>
          </div>
        </SlideinFromLeft>

        {/* Newsletter Form */}
        <Formik
          initialValues={{ email: "" }}
          validationSchema={NewsletterEmailSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="flex items-center gap-3 md:gap-4 lg:gap-5 w-full lg:w-2/5 lg:ml-auto">
              <InputField
                name="email"
                placeholder={t("Enter Email")}
                placeholderClassName="xl:placeholder:text-lg placeholder:text-sm placeholder:text-gray-green"
                textSize="text-lg"
                errorTextSize="text-lg"
                className="flex-1 px-5 py-3 xl:px-6 xl:py-5 rounded md:rounded-full bg-white focus:outline-none text-gray-700"
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
                  {isSubmitting || mutation.isPending ? (
                    <ButtonLoader />
                  ) : (
                    <Icon
                      icon="bitcoin-icons:share-filled"
                      height={28}
                      width={28}
                    />
                  )}
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


