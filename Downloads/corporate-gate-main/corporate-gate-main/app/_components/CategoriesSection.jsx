export default function CategoriesSection() {
  const categories = [
    "Arts,culture & Media",
    "Banking & Finance",
    "Business",
    "Education",
    "Student",
    "Sales ,Support  & Marketing",
    "Infrastructure & Engineering",
    "Public Sector",
    "Science & Research",
    "Service Industry",
    "Technology",
  ];

  return (
    <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto text-center">
        <div className="inline-flex items-center px-3 sm:px-4 py-2 text-[#345773] rounded-full text-sm sm:text-base font-medium">
          Categories
        </div>
        <h2 className="mt-4 text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight tracking-wide">
          Get Inspired by Resume
          <div>Samples from various Industry</div>
        </h2>

        <div className="mt-6 flex max-w-4xl mx-auto flex-wrap gap-2 sm:gap-5 md:gap-7 justify-center px-4 sm:px-6">
          {categories.map((cat) => (
            <span
              key={cat}
              className="px-3 sm:px-4 py-2 rounded-full border border-2 border-gray-200 bg-white text-gray-700 text-[12px] sm:text-sm hover:border-[#345773] hover:text-[#345773] transition-colors cursor-pointer"
            >
              {cat}
            </span>
          ))}
        </div>

        <div className="mt-8 sm:mt-10 md:mt-12">
          <button className="px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 bg-[#345773] text-white rounded-full text-sm sm:text-base md:text-lg font-semibold cursor-pointer hover:bg-[#2a4560] transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
            Explore All Samples
          </button>
        </div>
      </div>
    </section>
  );
}


