import Image from "next/image"
import Button from "../common/Buttons/Button"


const ChildrenNeed = () => {
  return (
    <div>
        <section className="relative min-h-[60vh] sm:min-h-[70vh] md:min-h-[80vh] lg:min-h-[90vh] ">
        <div className="relative flex items-center justify-center bg-cover bg-center bg-[url('/assets/banner-bg.png')] min-h-[60vh] sm:min-h-[70vh] md:min-h-[80vh] lg:min-h-[90vh] w-full">
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 to-transparent w-1/3"></div>
          <div className="absolute left-0 top-0 bottom-0 h-180 w-80 md:w-130  animate-[updown_0.5s_ease-in-out_infinite] ease-in-out infinite overflow-hidden">
            <Image
              src="/assets/shape-left.png"
              alt="shape left"
              fill
              className="object-cover animate-float pointer-events-none select-none"
            />
          </div>

          <div className="w-full  px-4 py-32 text-center text-white">
            <i className="text-xl mr-2 text-[#ffc107] hand-icon"></i>
            <span className="text-yellow-400 font-caveat text-xl md:text-2xl font-semibold">
              Start Donating Poor People
            </span>
            <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 font-nunito leading-snug">
              Children Need Your Help By <br /> Donating Today
            </p>

            <div className="flex justify-center items-center gap-4 mt-6">
              <div className="flex items-center justify-center flex-wrap gap-3 mt-6">
                <div className="text-white bg-black/25  rounded-full">
                  <Button
                    text="Discover More"
                    bgColor="bg-transparent"
                    textColor="text-white"
                    hoverTextColor="text-white"
                    hoverBg="before:bg-[#FFC107]"
                  />
                </div>

                <div className="">
                  <Button
                    text="Get A Quote"
                    bgColor="bg-[#FFC107]"
                    textColor="text-black"
                    hoverTextColor="text-white"
                    hoverBg="before:bg-[#046b59]"
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
  )
}

export default ChildrenNeed