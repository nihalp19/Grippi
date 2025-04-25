import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, TrendingUp, TrendingDown, DollarSign, Users } from 'lucide-react';
import StatusBadge from './StatusBadge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

function InsightsModal({ isOpen, onClose, campaigns }) {
  if (!isOpen) return null;

  const totalClicks = campaigns.reduce((sum, campaign) => sum + campaign.clicks, 0);
  const totalCost = campaigns.reduce((sum, campaign) => sum + campaign.cost, 0);
  const totalImpressions = campaigns.reduce((sum, campaign) => sum + campaign.impressions, 0);
  const ctr = (totalClicks / totalImpressions) * 100;
  const cpc = totalCost / totalClicks;

  const bestPerformingCampaign = campaigns.reduce((best, current) => {
    const currentCTR = (current.clicks / current.impressions) * 100;
    const bestCTR = (best.clicks / best.impressions) * 100;
    return currentCTR > bestCTR ? current : best;
  }, campaigns[0]);

  const campaignPerformanceData = campaigns.map(campaign => ({
    name: campaign.name,
    clicks: campaign.clicks,
    cost: campaign.cost,
    ctr: ((campaign.clicks / campaign.impressions) * 100).toFixed(2),
  }));

  const statusDistributionData = [
    { name: 'Active', value: campaigns.filter(c => c.status === 'Active').length },
    { name: 'Paused', value: campaigns.filter(c => c.status === 'Paused').length },
  ];

  const COLORS = ['#059669', '#f59e0b'];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          onClick={e => e.stopPropagation()}
          className="bg-white rounded-xl shadow-xl max-w-5xl w-full max-h-[90vh] overflow-y-auto"
        >
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary-600" />
                Campaign Insights
              </h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-500 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-500 mb-2">Total Clicks</h3>
                <div className="flex items-center gap-2">
                  <p className="text-2xl font-bold text-gray-900">
                    {totalClicks.toLocaleString()}
                  </p>
                  <Users className="h-5 w-5 text-primary-600" />
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-500 mb-2">Total Cost</h3>
                <div className="flex items-center gap-2">
                  <p className="text-2xl font-bold text-gray-900">
                    ${totalCost.toFixed(2)}
                  </p>
                  <DollarSign className="h-5 w-5 text-success-500" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-500 mb-2">Overall CTR</h3>
                <div className="flex items-center gap-2">
                  <p className="text-2xl font-bold text-gray-900">
                    {ctr.toFixed(2)}%
                  </p>
                  <TrendingUp className="h-5 w-5 text-success-500" />
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-500 mb-2">Average CPC</h3>
                <div className="flex items-center gap-2">
                  <p className="text-2xl font-bold text-gray-900">
                    ${cpc.toFixed(2)}
                  </p>
                  <TrendingDown className="h-5 w-5 text-success-500" />
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Campaign Performance Overview</h3>
              <div className="bg-white rounded-lg p-4 h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={campaignPerformanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Bar yAxisId="left" dataKey="clicks" fill="#3b82f6" name="Clicks" />
                    <Bar yAxisId="right" dataKey="cost" fill="#059669" name="Cost ($)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Campaign Status Distribution</h3>
                <div className="bg-white rounded-lg p-4 h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={statusDistributionData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        fill="#8884d8"
                        paddingAngle={5}
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}`}
                      >
                        {statusDistributionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">CTR Trends</h3>
                <div className="bg-white rounded-lg p-4 h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={campaignPerformanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="ctr" stroke="#8b5cf6" name="CTR (%)" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Best Performing Campaign</h3>
              <div className="bg-primary-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-medium text-primary-900">{bestPerformingCampaign.name}</p>
                  <StatusBadge status={bestPerformingCampaign.status} />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-primary-600 mb-1">Clicks</p>
                    <p className="font-semibold">{bestPerformingCampaign.clicks.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-primary-600 mb-1">Cost</p>
                    <p className="font-semibold">${bestPerformingCampaign.cost.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-primary-600 mb-1">Impressions</p>
                    <p className="font-semibold">{bestPerformingCampaign.impressions.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default InsightsModal;
