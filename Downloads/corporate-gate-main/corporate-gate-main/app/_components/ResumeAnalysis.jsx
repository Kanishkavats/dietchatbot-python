import Image from "next/image";

export default function ResumeAnalysis() {
    return (
        <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center">
                <div className="space-y-4 sm:space-y-6 order-1 mb-14">
                    <div className="inline-flex items-center px-3 sm:px-4 py-2 text-[#345773] rounded-full text-sm sm:text-base font-medium">
                        Resume Analysis
                    </div>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-black leading-tight">
                        Unlock success with smart resume analysis
                    </h2>
                    <p className="text-base sm:text-lg text-[#00000063] max-w-lg tracking-wide leading-relaxed">
                        Getting that dream job can seem impossible — until you know what's
                        holding you back. Our smart resume analysis gives you a real advantage,
                        with data-driven insights trusted by millions of professionals worldwide.
                    </p>
                    <div>
                        <button className="bg-[#345773] text-white font-semibold py-2.5 sm:py-3 px-4 sm:px-6 rounded-full shadow-lg cursor-pointer hover:bg-[#2a4560] transition-colors text-sm sm:text-base">
                            Start Now
                        </button>
                    </div>
                </div>

                {/* Mobile Layout */}
                <div className="order-2 lg:hidden flex relative justify-center mb-56">
                    <div className="relative w-full max-w-xs">
                        <div className="absolute left-1/2 -translate-x-1/2 -top-4 w-[240px]">
                            <div className="bg-white rounded-lg w-full absolute left-3 max-w-xs px-3 py-4"
                            style={{ boxShadow: '5px 20px 20px 20px #0000000D' }}                    
                            >
                                <div className="w-full bg-[#0000000D] rounded-full h-2 my-2"></div>
                                <div className="w-3/4 bg-[#0000000D] rounded-full h-2 my-2"></div>
                                <div className="w-full bg-[#0000000D] rounded-full h-2 my-2"></div>
                                <div className="w-1/4 bg-[#0000000D] rounded-full h-2 my-2"></div>
                                <div className="w-full bg-[#0000000D] rounded-full h-2 my-2"></div>
                                <div className="w-full bg-[#0000000D] rounded-full h-2 my-2"></div>
                                <div className="flex gap-2">
                                    <div className="w-3/4 bg-[#0000000D] rounded-full h-2 my-1"></div>
                                    <div className="w-1/4 bg-[#0000000D] rounded-full h-2 my-1"></div>
                                </div>
                                <div className="w-full bg-[#0000000D] rounded-full h-2 my-2"></div>
                                <div className="w-full bg-[#0000000D] rounded-full h-2 my-2"></div>
                                <div className="w-1/3 bg-[#0000000D] rounded-full h-2 my-2"></div>
                                <div className="w-full bg-[#0000000D] rounded-full h-2 my-2"></div>
                                <div className="w-full bg-[#0000000D] rounded-full h-2 my-2"></div>
                                <div className="w-1/2 bg-[#0000000D] rounded-full h-2 my-2"></div>
                                <div className="w-full bg-[#0000000D] rounded-full h-2 my-2"></div>
                            </div>
                        </div>

                        {/* Main illustration - Mobile */}
                        <div className="relative w-full max-w-xs">
                            <div className="absolute -top-4 left-10">
                                <Image
                                    src="/63d81f68b48441808e90fe94bbad00d5 1.svg"
                                    alt="Resume analysis illustration"
                                    width={240}
                                    height={240}
                                    className="h-auto"
                                    priority
                                />
                            </div>
                            <div className="absolute top-3 left-18">
                                <Image
                                    src="/Vector 1.svg"
                                    width={120}
                                    height={120}
                                    alt="Picture"
                                    className="z-1 w-22 h-auto"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Desktop Layout */}
                <div className="order-2 hidden lg:flex relative justify-center">
                    <div className="bg-white rounded-xl sm:rounded-2xl w-full absolute -top-32 sm:-top-40 md:-top-48 lg:-top-56 left-6 sm:left-8 md:left-10 lg:left-12 max-w-sm sm:max-w-md lg:max-w-lg px-4 sm:px-6"
                    style={{ boxShadow: '10px 40px 40px 40px  #0000000D' }}                    
                    >
                        <div className="w-full bg-[#0000000D] rounded-full h-3 sm:h-4 md:h-5 my-3 sm:my-4"></div>
                        <div className="w-3/4 bg-[#0000000D] rounded-full h-3 sm:h-4 md:h-5 my-3 sm:my-4"></div>
                        <div className="w-full bg-[#0000000D] rounded-full h-3 sm:h-4 md:h-5 my-3 sm:my-4"></div>
                        <div className="w-1/4 bg-[#0000000D] rounded-full h-3 sm:h-4 md:h-5 my-3 sm:my-4"></div>
                        <div className="w-full bg-[#0000000D] rounded-full h-3 sm:h-4 md:h-5 my-3 sm:my-4"></div>
                        <div className="w-full bg-[#0000000D] rounded-full h-3 sm:h-4 md:h-5 my-3 sm:my-4"></div>
                        <div className="flex gap-3 sm:gap-4">
                            <div className="w-3/4 bg-[#0000000D] rounded-full h-3 sm:h-4 md:h-5 my-2"></div>
                            <div className="w-1/4 bg-[#0000000D] rounded-full h-3 sm:h-4 md:h-5 my-2"></div>
                        </div>
                        <div className="w-full bg-[#0000000D] rounded-full h-3 sm:h-4 md:h-5 my-3 sm:my-4"></div>
                        <div className="w-full bg-[#0000000D] rounded-full h-3 sm:h-4 md:h-5 my-3 sm:my-4"></div>
                        <div className="w-1/3 bg-[#0000000D] rounded-full h-3 sm:h-4 md:h-5 my-3 sm:my-4"></div>
                        <div className="w-full bg-[#0000000D] rounded-full h-3 sm:h-4 md:h-5 my-3 sm:my-4"></div>
                        <div className="w-full bg-[#0000000D] rounded-full h-3 sm:h-4 md:h-5 my-3 sm:my-4"></div>
                        <div className="w-1/2 bg-[#0000000D] rounded-full h-3 sm:h-4 md:h-5 my-3 sm:my-4"></div>
                        <div className="w-full bg-[#0000000D] rounded-full h-3 sm:h-4 md:h-5 my-3 sm:my-4"></div>
                    </div>

                    <div className="relative w-full max-w-sm sm:max-w-md">
                        <div className="absolute -top-32 sm:-top-40 md:-top-48 lg:-top-57">
                            <Image
                                src="/63d81f68b48441808e90fe94bbad00d5 1.svg"
                                alt="Resume analysis illustration"
                                width={360}
                                height={360}
                                className="h-auto"
                                priority
                            />
                        </div>
                        <div className="absolute -top-24 sm:-top-32 md:-top-40 lg:-top-46 left-8 sm:left-10 md:left-12 lg:left-13">
                            <Image
                                src="/Vector 1.svg"
                                width={134}
                                height={134}
                                alt="Picture"
                                className="z-1 w-20 sm:w-24 md:w-28 lg:w-32 h-auto"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}


