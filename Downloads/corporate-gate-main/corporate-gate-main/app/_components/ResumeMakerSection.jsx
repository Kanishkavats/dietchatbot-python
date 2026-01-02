import Image from "next/image";

const ResumeMakerSection = () => {

  const steps = [
    {
      number: "1",
      title: "Choose a Free Resume Template",
      description: "You've got plenty of formatting and styles options",
      isActive: true,
    },
    {
      number: "2",
      title: "Customize your Design",
      description: "Make your own resume easily and customize all content",
      isActive: false,
    },
    {
      number: "3",
      title: "Share as PDF",
      description: "Download and share your professional resume",
      isActive: false,
    },
  ];

  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 mt-8 sm:mt-12 lg:mt-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 xl:gap-20 items-start mb-16 sm:mb-20 lg:mb-36">
          <div className="relative order-2 lg:order-1">
            <div className="relative z-10 right-6">
              <Image
                src="/image 21.png"
                alt="Resume Preview 1"
                width={500}
                height={600}
                priority
              />
            </div>
            <div className="absolute top-8 sm:top-28 lg:top-36 -right-12 sm:-right-4 lg:-right-6 z-0">
              <Image
                src="/image 22.png"
                alt="Resume Preview 2"
                width={500}
                height={600}
              />
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="space-y-8 lg:ml-20 sm:space-y-10 lg:space-y-12 order-1 mt-4 lg:order-2">
            <div className="space-y-4 sm:space-y-6">
              <div className="inline-flex items-center px-3 sm:px-4 py-2 text-[#345773] rounded-full text-sm sm:text-base font-medium">
                HOW IT WORK
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold text-gray-900 leading-tight">
                3 Steps,{" "}
                <div>5 Minutes</div>
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed max-w-lg">
                Getting that dream job can seem like an impossible task. We're here to change that.
                Give yourself a real advantage with the best online resume maker created by experts,
                improved by data, trusted by millions of professionals.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-[#345773] text-white font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-full shadow-lg cursor-pointer hover:bg-[#2a4560] transition-colors">
                Create Resume Now
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12 px-4 sm:px-8 lg:px-16 xl:px-32">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`rounded-2xl sm:rounded-3xl lg:rounded-4xl p-6 sm:p-8 ${step.isActive
                ? "bg-[#345773] text-white shadow-xl sm:shadow-2xl"
                : "bg-[#F5F7F9] text-gray-900 shadow-lg border border-gray-100"
                }`}
            >
              <div className="flex flex-col items-start space-y-4 sm:space-y-6 mb-4 sm:mb-6">
                <div
                  className={`w-12 sm:w-14 lg:w-16 h-12 sm:h-14 lg:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center text-2xl sm:text-3xl lg:text-4xl font-semibold ${step.isActive
                    ? "bg-white text-[#345773] shadow-lg"
                    : "bg-gray-900 text-[#F5F7F9] shadow-md"
                    }`}
                >
                  {step.number}.
                </div>
                {step.isActive && (
                  <div className="my-8 sm:my-12 lg:my-16 w-full px-4">
                    <div className="w-full bg-gray-300 rounded-full h-2 sm:h-3 overflow-hidden">
                      <div className="bg-white h-2 sm:h-3 rounded-full w-1/2"></div>
                    </div>
                  </div>
                )}
                {
                  !step.isActive && (
                    <div className="my-8 sm:my-12 lg:my-16 w-full px-4">
                      <div className="w-full bg-[#F5F7F9] rounded-full h-2 sm:h-3 overflow-hidden">
                        <div className="bg-[#F5F7F9] h-2 sm:h-3 rounded-full w-1/2"></div>
                      </div>
                    </div>
                  )
                }

                <div className="w-full">
                  <h3 className="font-bold tracking-wide leading-tight text-xl sm:text-2xl lg:text-2xl mb-4 sm:mb-6 line-clamp-2 min-h-[4rem] sm:min-h-[5rem]">
                    {step.title}
                  </h3>
                  <p
                    className={`text-base sm:text-md font-semibold ${step.isActive ? "text-gray-300" : "text-[#00000052]"
                      }`}
                  >
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResumeMakerSection;
