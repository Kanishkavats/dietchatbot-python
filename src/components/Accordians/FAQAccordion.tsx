import { FAQAccordionItemProps } from "@/types/faq";
import { Icon } from "@iconify/react/dist/iconify.js";
import { motion } from "framer-motion";

const FAQAccordion = ({ item, isOpen, onClick }: FAQAccordionItemProps) => {
  return (
    <motion.div
      layout
      className={` ${isOpen ? "rounded-b-3xl" : "rounded-3xl"} overflow-hidden`}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <button
        onClick={onClick}
        className={`w-full border-b border-palate-white-gray cursor-pointer text-left px-6 py-6 flex justify-between items-center bg-palate-quaternary-green text-white transition-all duration-300 ${
          isOpen ? "rounded-t-3xl" : "rounded-3xl"
        }`}
      >
        <span className="font-medium">{item.question}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <Icon icon="mdi:chevron-down" width={24} height={24} />
        </motion.span>
      </button>

      {isOpen && (
        <motion.div
          layout
          className="px-6 py-4 bg-gray-50 text-gray-700 border border-palate-white-gray"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {item.answer}
        </motion.div>
      )}
    </motion.div>
  );
};

export default FAQAccordion;
