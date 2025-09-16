"use client";
import { Icon } from "@iconify/react/dist/iconify.js";
import { motion } from "framer-motion";
import Button from "../common/Buttons/Button";

const Newsletter = () => {

  const bgBase = `relative inline-flex items-center gap-2 before:content-[''] before:absolute before:inset-0 before:bg-quaternary-green before:scale-x-0 before:origin-center before:transition-transform before:duration-300`;

  const bgOnHover = `${bgBase} cursor-pointer hover:text-white hover:before:scale-x-100`;

  return (
    <section className="text-white font-nunito">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b-[1px] border-white/10 py-20">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="text-left"
        >
          <h2 className="text-[27px] xl:text-[40px] font-bold">
            Subscribe To Our Newsletter
          </h2>
          <p className="text-white/50 text-[18px] leading-8 mt-0 ">
            Regular Inspections And Feedback Mechanisms
          </p>
        </motion.div>

        <form className="flex xl:justify-end xl:w-1/2 gap-5 xl:ps-18 mt-2 xl:mt-10">
          <input
            type="email"
            placeholder="Enter Email"
            className="w-full flex-1 xl:max-w-[450px] rounded md:rounded-full px-6 py-2  text-gray-700 bg-white focus:outline-none"
          />

          <div className="w-fit">
            <Button rounded="rounded-[10px] md:rounded-full" paddingx="px-3 md:px-6" paddingy="py-2 md:py-3">
              <Icon icon="bitcoin-icons:share-filled" height={28} width={28} />
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;
