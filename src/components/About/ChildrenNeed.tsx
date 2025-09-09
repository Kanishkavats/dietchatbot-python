"use client";
import Image from "next/image";
import Button from "../common/Buttons/Button";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const ChildrenNeed = () => {
  const router = useRouter();

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <div>
      <section className="relative overflow-hidden min-h-[60vh] sm:min-h-[70vh] md:min-h-[80vh] lg:min-h-[90vh] ">
        <div className="relative flex items-center justify-center bg-cover bg-center bg-[url('/assets/banner-bg.png')] min-h-[60vh] sm:min-h-[70vh] md:min-h-[80vh] lg:min-h-[90vh] w-full ">
          <div className="absolute inset-0 bg-gradient-to-r from-black/100 to-black/50 to-transparent w-full transparent overflow-hidden"></div>
          <motion.div
            className="absolute left-0 top-[-20] bottom-0 h-180 w-80 md:w-140 overflow-hidden"
            animate={{ y: [20, -60, 20] }} 
            transition={{
              duration: 5, 
              repeat: Infinity, 
              ease: "easeInOut",
            }}
          >
            <Image
              src="/assets/shape-left.png"
              alt="shape left"
              fill
              className="object-cover pointer-events-none select-none overflow-hidden"
            />
          </motion.div>

          <div className="w-full  px-4 py-32 text-center text-white relative z-20">
            <motion.div
              ref={ref}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <i className="text-xl mr-2 text-[#ffc107] hand-icon"></i>
              <span className="text-yellow-400 font-caveat text-xl md:text-2xl font-semibold">
                Start Donating Poor People
              </span>
              <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 font-nunito leading-snug">
                Children Need Your Help By <br /> Donating Today
              </p>
            </motion.div>

            <div className="flex justify-center items-center gap-4 mt-6">
              <div className="flex items-center justify-center flex-wrap gap-3 mt-6">
                <div className="text-white bg-black/30 transparent  rounded-full  ">
                  <Button
                    text="Discover More"
                    bgColor="bg-transparent"
                    textColor="text-white"
                    hoverTextColor="group-hover:text-black"
                    hoverBg="before:bg-[#FFC107]"
                    className="w-[100px] h-[60px]"
                  />
                </div>

                <div className="">
                  <Button
                    text="Get A Quote"
                    bgColor="bg-[#FFC107]"
                    textColor="text-black"
                    hoverTextColor="group-hover:text-white"
                    hoverBg="before:bg-[#046b59]"
                    className="w-[100px] h-[60px]"
                    onClick={() => router.push("/contact")}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* <div className="absolute w-full h-19 pointer-events-none select-none">
            <Image
              src="/assets/bottomsection.png"
              alt="bottom shape"
              fill
              className="object-cover"
            />
          </div> */}
        </div>
      </section>
    </div>
  );
};

export default ChildrenNeed;
