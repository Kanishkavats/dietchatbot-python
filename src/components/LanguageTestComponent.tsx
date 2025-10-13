'use client';

import React from 'react';
import { useFetchAllCampaigns } from '@/src/hooks/useCampaigns';
import { useLanguage } from '@/src/contexts/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';

/**
 * Test component to demonstrate language-aware data fetching
 * This component shows how backend data changes when language is switched
 */
const LanguageTestComponent: React.FC = () => {
  const { currentLanguage, isLoading: languageLoading } = useLanguage();
  const { data: campaignsData, isLoading: campaignsLoading, error } = useFetchAllCampaigns(1, 4);

  if (languageLoading) {
    return <div className="p-4">Switching language...</div>;
  }

  if (campaignsLoading) {
    return <div className="p-4">Loading campaigns...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">Error loading campaigns: {error.message}</div>;
  }

  return (
    <div className="p-6 bg-gray-50 rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Language Test Component</h2>
        <LanguageSwitcher />
      </div>
      
      <div className="mb-4">
        <p className="text-sm text-gray-600">
          Current Language: <span className="font-semibold">{currentLanguage}</span>
        </p>
        <p className="text-xs text-gray-500">
          Backend data will be fetched with language header: {currentLanguage}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {campaignsData?.campaigns?.map((campaign: any) => (
          <div key={campaign._id || campaign.id} className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-semibold text-lg mb-2">{campaign.title}</h3>
            <p className="text-gray-600 text-sm mb-2">{campaign.description}</p>
            <div className="text-xs text-gray-500">
              <p>Category: {campaign.category}</p>
              <p>Goal: ${campaign.goalAmount}</p>
              <p>Raised: ${campaign.raisedAmount}</p>
            </div>
          </div>
        )) || (
          <div className="col-span-2 text-center text-gray-500">
            No campaigns found
          </div>
        )}
      </div>

      <div className="mt-4 p-3 bg-blue-50 rounded">
        <p className="text-sm text-blue-800">
          <strong>How it works:</strong> When you switch the language using the dropdown above, 
          the API requests will include the new language in the headers, and the backend should 
          return data in the selected language. The component will automatically refetch data 
          when the language changes.
        </p>
      </div>
    </div>
  );
};

export default LanguageTestComponent;
