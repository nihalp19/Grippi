import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import CampaignTable from './CampaignTable';
import FilterDropdown from './FilterDropdown';
import LoadingSpinner from './LoadingSpinner';
import InsightsModal from './InsightsModal';
import { campaignStore } from '../store/campaignStore';
import { BarChart3, TrendingUp } from 'lucide-react';

const CampaignDashboard = () => {
    const { campaigns, filteredCampaigns, setFilter, fetchCampaigns,applyFilter } = campaignStore();
    const loading = !campaigns;
    const [isInsightsOpen, setIsInsightsOpen] = React.useState(false);
    console.log("from dashboard", campaigns);


     useEffect(() => {
        fetchCampaigns()
      },[])

    const handleFilterChange = (filter) => {
        setFilter(filter);
    };

    const totalClicks = campaigns?.reduce((sum, campaign) => sum + campaign.clicks, 0) || 0;
    const totalCost = campaigns?.reduce((sum, campaign) => sum + campaign.cost, 0) || 0;
    const totalImpressions = campaigns?.reduce((sum, campaign) => sum + campaign.impressions, 0) || 0;

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-7xl mx-auto"
            >
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                            <BarChart3 className="h-6 w-6 text-primary-600" />
                            Campaign Analytics
                        </h1>
                        <p className="mt-1 text-sm text-gray-500">
                            Track and analyze your marketing campaigns
                        </p>
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setIsInsightsOpen(true)}
                        className="inline-flex items-center px-4 py-2 bg-primary-600 rounded-lg shadow hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 text-black"
                    >
                        <TrendingUp className="h-4 w-4 mr-2" />
                        View Insights
                    </motion.button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
                    >
                        <h3 className="text-sm font-medium text-gray-500">Total Clicks</h3>
                        <p className="mt-2 text-3xl font-bold text-gray-900">
                            {totalClicks?.toLocaleString()}
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
                    >
                        <h3 className="text-sm font-medium text-gray-500">Total Cost</h3>
                        <p className="mt-2 text-3xl font-bold text-gray-900">
                            ${totalCost?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
                    >
                        <h3 className="text-sm font-medium text-gray-500">Total Impressions</h3>
                        <p className="mt-2 text-3xl font-bold text-gray-900">
                            {totalImpressions?.toLocaleString()}
                        </p>
                    </motion.div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                    <div className="p-6 border-b border-gray-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-lg font-medium text-gray-900">
                                    Campaign Performance
                                </h2>
                                <p className="mt-1 text-sm text-gray-500">
                                    {filteredCampaigns?.length} campaigns
                                </p>
                            </div>
                            <FilterDropdown
                                selectedFilter={campaignStore.getState().statusFilter}
                                onFilterChange={handleFilterChange}
                            />
                        </div>
                    </div>

                    {loading ? (
                        <LoadingSpinner />
                    ) : (
                        <CampaignTable campaigns={filteredCampaigns} />
                    )}
                </div>
            </motion.div>

            <InsightsModal
                isOpen={isInsightsOpen}
                onClose={() => setIsInsightsOpen(false)}
                campaigns={campaigns}
            />
        </div>
    );
};

export default CampaignDashboard;
