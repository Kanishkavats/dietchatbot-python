import { FAQAccordionItemProps } from "@/src/types/faq";
import { Icon } from "@iconify/react/dist/iconify.js";
import { motion } from "framer-motion";

const FAQAccordion = ({ item, isOpen, onClick }: FAQAccordionItemProps) => {
  return (
    <motion.div
      layout
      className={`${
        isOpen ? "rounded-4xl" : "rounded-4xl"
      } overflow-hidden border border-[var(--gray-200)]`}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <button
        onClick={onClick}
        className={`w-full cursor-pointer text-left px-6 py-6 flex justify-between items-center transition-all duration-300 ${
          isOpen
            ? "bg-[var(--green)] text-[var(--white)] rounded-t-3xl"
            : "bg-[var(--white)] text-[var(--gray-green)] rounded-3xl"
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
          className="px-6 py-4 bg-[var(--white)] text-[var(--gray-green)] border-t border-[var(--gray-200)] rounded-b-4xl"
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
