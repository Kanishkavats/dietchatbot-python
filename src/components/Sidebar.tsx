import SearchSection from './SearchSection';
import RecentPosts from './RecentPosts';
import TagsSection from './TagsSection';
import CallToAction from './CallToAction';

export default function Sidebar() {
  return (
    <div className="space-y-6">
      <SearchSection />
      <RecentPosts />
      <TagsSection />
      <CallToAction />
    </div>
  );
}