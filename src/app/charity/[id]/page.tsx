import PageBanner from '../../../components/common/PageBanner';
import { bannerBg } from '@/public/assets';
import { CharityContent } from '../../../components/Charity_with_Difference';
import Sidebar from '@/src/components/common/sideBar';

interface Props {
  params: Promise<{
    id: string;
  }>;
}

// Content mapping for different card types
const getContentForId = (id: number) => {
  const contentMap = {
    1: {
      title: "Healthy Food",
      tagline: "Nutrition for Every Child",
      smallIcon: "mdi:food",
      blogId: "52511bdd-a3f7-48e3-94da-de8667170871" // Using same blog ID for now
    },
    2: {
      title: "Medical Care", 
      tagline: "Healthcare for Every Child",
      smallIcon: "mdi:medical-bag",
      blogId: "52511bdd-a3f7-48e3-94da-de8667170871" // Using same blog ID for now
    },
    3: {
      title: "Child Education",
      tagline: "Supporting Education for Every Child", 
      smallIcon: "mdi:school",
      blogId: "52511bdd-a3f7-48e3-94da-de8667170871" // Using same blog ID for now
    }
  };
  
  return contentMap[id as keyof typeof contentMap] || contentMap[3]; // Default to education
};

export default async function DynamicCharityPage({ params }: Props) {
  const { id } = await params;
  const content = getContentForId(parseInt(id));
  
  return (
    <div>
      <PageBanner
        bgImage={bannerBg}
        title={content.title}
        tagline={content.tagline}
        smallIcon={content.smallIcon}
      />
     
      {/* Main Content */}
      <div className="py-8">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-8 xl:max-w-screen-xl xl:mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content Area - Takes 2/3 of the space */}
            <div className="lg:col-span-2">
              <CharityContent charityId={parseInt(id)} blogId={content.blogId}/>
            </div>
            
            {/* Sidebar - Takes 1/3 of the space */} 
            <div className="lg:col-span-1">
              <Sidebar as='Recent Post' bgColor='bg-white' pathName='charity'/>
             </div> 
          </div>
        </div>
      </div>
    </div>
  );
}
