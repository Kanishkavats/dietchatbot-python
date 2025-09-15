import Image from 'next/image';

export default function CallToAction() {
  return (
    <div className="relative h-[400px]  rounded-lg shadow-md overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/assets/charity_with_difference/overview.png"
          alt="Children in need"
          fill
          className="object-cover"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 "></div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center p-6">
        {/* Heart logo */}
        <div className="w-16 h-16 flex items-center justify-center shadow-lg mb-6">
          <Image
            src="/assets/charity_with_difference/logo heart bottom banner.png"
            alt="Heart logo"
            width={64}
            height={64}
            className="object-contain"
          />
        </div>

        {/* Subtitle */}
        <p className="text-white text-lg font-medium mb-4">
          Small Donations Bigger Impact
        </p>

        {/* Main Title */}
        <h3 className="text-white text-2xl font-bold mb-8 drop-shadow-lg leading-tight">
          Education Health<br />For Every Child
        </h3>

        {/* Get A Quote Button */}
        <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 px-8 rounded-lg flex items-center gap-2 transition-all duration-300 shadow-lg hover:shadow-xl">
          <span>Get A Quote</span>
          <svg 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className="transform rotate-45"
          >
            <path d="M7 17L17 7"></path>
            <path d="M7 7h10v10"></path>
          </svg>
        </button>
      </div>
    </div>
  );
}
