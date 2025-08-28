

 const TopBar = () => {
  return (
    <div className="w-full bg-[#262626] flex items-center justify-between px-6 py-2">
      {/* Left Logo */}
      <div className="flex items-center space-x-2">
        <span className="text-green-500 font-bold text-lg">envato</span>
        <span className="text-white font-medium text-lg">market</span>
      </div>

      {/* Buy Now Button */}
      <button className="bg-[#82b440] hover:bg-[#6c9736] text-white px-4 py-1 rounded font-semibold text-sm">
        Buy now
      </button>
    </div>
  );
}


export default TopBar;