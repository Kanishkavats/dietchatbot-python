import { manWithChildren, verticalShape, womenWithOneChild } from "@/public/assets";
import FadeInUp from "@/src/animations/FadeInUp";
import SlideInRight from "@/src/animations/SlideInRight";
import { RootState } from "@/src/store";
import Image from "next/image";
import { useSelector } from "react-redux";

const FAQSideImages = () => {
  const { primaryColor } = useSelector((state: RootState) => state.theme);

  return (
    <div className="hidden lg:flex lg:w-1/2 mt-12 xl:mt-0 h-screen relative ps-[5%] items-center bg-[var(--green)]">
      {/* Vertical Shape */}
      <div className="absolute top-0 left-0 w-10 h-full z-10">
        <Image src={verticalShape.src} fill alt="shape" />
      </div>

      {/* Man with Children */}
      <FadeInUp className="w-full md:w-3/5 h-[80%] relative rounded-2xl border-10 border-[var(--white)] shadow-lg">
        <div className="relative w-full h-full">
          <Image
            src={manWithChildren.src}
            alt="Happy family"
            fill
            className="object-cover"
          />
          <div
            className={`w-4 h-30 xl:h-40 rounded-xl absolute bottom-0 right-[-50px] bg-${primaryColor}`}
          />
        </div>
      </FadeInUp>

      {/* Woman with Child */}
      <SlideInRight className="w-2/4 mt-6 h-68 absolute right-0 top-[30%] xl:top-[30%] rounded-lg overflow-hidden shadow-lg border-4 border-white -translate-y-16 z-10">
        <Image
          src={womenWithOneChild.src}
          alt="Mother with child"
          fill
          className="object-cover"
        />
      </SlideInRight>
    </div>
  );
};

export default  FAQSideImages