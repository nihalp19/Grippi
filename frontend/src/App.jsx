import React, { useEffect } from 'react';
import CampaignDashboard from './components/CampaignDashboard';
import { campaignStore } from './store/campaignStore';

function App() {

  const { fetchCampaigns } = campaignStore()

  useEffect(() => {
    fetchCampaigns()
  },[])


  return (
    <div className="min-h-screen bg-gray-50">
      <CampaignDashboard />
    </div>
  );
}

export default App;