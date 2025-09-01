"use client";

const TopBar = () => {
  return (
    <div className="w-full bg-[#333333] flex items-center justify-between px-6 py-2">
      {/* Left Logo */}
      <div className="flex items-center space-x-1">
        <span className="text-[#88BB33] font-bold text-lg">envato</span>
        <span className="text-white font-medium text-lg">market</span>
      </div>

      {/* Buy Now Button */}
      <button className="bg-[#66AA33] hover:bg-[#5A9933] text-white px-4 py-2 rounded font-semibold text-sm transition-colors duration-200">
        Buy now
      </button>
    </div>
  );
}

export default TopBar;