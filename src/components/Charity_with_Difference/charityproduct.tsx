
import PageBanner from '../common/PageBanner';
import { bannerBg } from '@/public/assets';
import {BlogPost , Sidebar} from '../Charity_with_Difference'

export default function CharityProduct() {
  return (
    <div>
      <PageBanner
        bgImage={bannerBg}
        title="Child Education"
        tagline="Supporting Education for Every Child"
        smallIcon="mdi:school"
      />
     
      
            {/* Main Content */}
            <div className="py-4 md:py-8">
              <div className="container mx-auto px-4 md:px-8 lg:pr-4 lg:pl-32 lg:ml-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
                  {/* Main Content Area - Takes 2/3 of the space */}
                  <div className="lg:col-span-2">
                    <BlogPost blogId='52511bdd-a3f7-48e3-94da-de8667170871'/>
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
