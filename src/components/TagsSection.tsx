const tags = [
  "T-Shirt",
  "Banner Design",
  "Brochures",
  "Landing",
  "Print",
  "Business Card"
];

export default function TagsSection() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-4">Tags</h3>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <button
            key={index}
            className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 transition-colors"
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
}