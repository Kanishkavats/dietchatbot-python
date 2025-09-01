import React from 'react'
import { motion, useAnimationControls } from "framer-motion";
import { Icon } from '@iconify/react/dist/iconify.js';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

const DonateButton = () => {
  const iconControls = useAnimationControls();
  const { primaryColor } = useSelector((state: RootState) => state.theme);

  return (
    <motion.button
      onHoverStart={() => iconControls.start({ rotate: 45 })}
      onHoverEnd={() => iconControls.start({ rotate: 0 })}
      initial="rest"
      whileHover="hover"
      animate="rest"
      variants={{
        rest: { backgroundSize: "0% 100%", backgroundPosition: "center" },
        hover: {
          backgroundSize: "100% 100%",
          transition: { duration: 0.4, ease: "easeInOut" },
        },
      }}
      className={` relative px-10 py-4 cursor-pointer rounded-full font-semibold bg-${primaryColor} text-black overflow-hidden group 
        before:content-[''] before:absolute before:inset-0 before:bg-palate-quaternary-green before:transition-transform before:duration-500 
        before:origin-center before:scale-x-0 hover:before:scale-x-100 before:z-0`}
      // style={{ backgroundColor: `var(${primaryColor})` }}

    >
      <div className="flex items-center gap-2 relative z-10 text-black group-hover:text-white font-bold transition-colors duration-300">
        <span>Donate Now</span>
        <motion.div
          animate={iconControls}
          transition={{ duration: 0.4, ease: "easeInOut" }}

        >
          <Icon icon="mdi:arrow-top-right"  width={18} height={18} />
        </motion.div>
      </div>
    </motion.button>

  )
}

export default DonateButton
