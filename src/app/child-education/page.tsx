import BlogPost from '../../components/BlogPost';
import Sidebar from '../../components/Sidebar';
import ChildEducationBanner from '../../components/ChildEducationBanner';

export default function ChildEducationPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Banner Section */}
      <ChildEducationBanner />
      
      {/* Main Content */}
      <div className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content Area - Takes 2/3 of the space */}
            <div className="lg:col-span-2">
              <BlogPost />
            </div>
            
            {/* Sidebar - Takes 1/3 of the space */}
            <div className="lg:col-span-1">
              <Sidebar />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}