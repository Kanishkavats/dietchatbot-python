"use client";
import { RootState } from "@/store";
import { Icon } from "@iconify/react/dist/iconify.js";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";

const Newsletter = () => {
  const { primaryColor } = useSelector((state: RootState) => state.theme);

  const bgBase = `relative inline-flex items-center gap-2 before:content-[''] before:absolute before:inset-0 before:bg-palate-quaternary-green before:scale-x-0 before:origin-center before:transition-transform before:duration-300` ;

  const bgOnHover = `${bgBase} cursor-pointer hover:text-palate-white hover:before:scale-x-100`;

  return (
    <section className="text-white">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b-[1px] border-palate-black2/30 py-20">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="text-left"
        >
          <h2 className="text-[27px] xl:text-[40px] font-bold">
            Subscribe To Our Newsletter
          </h2>
          <p className="text-palate-white2 text-[18px] leading-8 mt-5">
            Regular Inspections And Feedback Mechanisms
          </p>
        </motion.div>

        <form className="flex justify-end xl:w-1/2 gap-5 xl:ps-18 mt-2 xl:mt-10">
          <input
            type="email"
            placeholder="Enter Email"
            className="w-full max-w-[450px] rounded md:rounded-full px-6 py-4 text-gray-700 bg-palate-white focus:outline-none"
          />
          <button
            className={`bg-${primaryColor} text-black px-3 lg:px-10 rounded md:rounded-full overflow-hidden flex items-center justify-center ${bgOnHover}`}
          >
            {/* 👇 Keep icon/text above pseudo background */}
            <span className="relative z-10 flex items-center">
              <Icon icon="bitcoin-icons:share-filled" height={28} width={28} />
            </span>
          </button>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;
