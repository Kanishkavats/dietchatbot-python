import { charityTags } from '../../staticResource';

export default function TagsSection() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-4">Tags</h3>
      <div className="flex flex-wrap gap-2">
        {charityTags.map((tag, index) => (
          <button
            key={index}
            
            className="bg-white text-gray-700 px-4 py-2 rounded shadow-sm cursor-pointer hover:bg-[#FBBF24] hover:text-white transition"
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
}