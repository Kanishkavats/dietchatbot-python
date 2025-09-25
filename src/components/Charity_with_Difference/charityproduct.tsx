

import PageBanner from '../common/PageBanner';
import { bannerBg } from '@/public/assets';
import { BlogPost, Sidebar } from '../Charity_with_Difference';

export default function CharityProduct() {
  return (
    <div className="w-full">
      <PageBanner
        bgImage={bannerBg}
        title="Child "
        tagline="Supporting Education for Every Child"
        smallIcon="mdi:school"
      />

      {/* Main Content */}
      <div className="py-3 sm:py-4 md:py-6 lg:py-8 w-full">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-8 xl:max-w-screen-xl xl:mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {/* BlogPost Area - full width on mobile/tablet, 2/3 on desktop */}
            <div className="w-full lg:col-span-2 order-1">
              <BlogPost blogId="52511bdd-a3f7-48e3-94da-de8667170871" />
            </div>

            {/* Sidebar - full width on mobile/tablet, 1/3 on desktop */}
            <div className="w-full lg:col-span-1 order-2 mt-4 sm:mt-6 lg:mt-0">
              <Sidebar />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
