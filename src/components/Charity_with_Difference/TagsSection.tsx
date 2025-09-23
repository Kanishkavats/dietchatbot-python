import { charityTags } from '../../staticResource';

export default function TagsSection() {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Tags</h3>
      <div className="flex flex-wrap gap-2">
        {charityTags.map((tag, index) => (
          <button
            key={index}
            
            className="bg-white text-gray-700 px-3 sm:px-4 py-1.5 sm:py-2 rounded shadow-sm cursor-pointer hover:bg-[#FBBF24] hover:text-white transition text-sm sm:text-base"
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
}