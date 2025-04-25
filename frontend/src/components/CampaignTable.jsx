import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown, ArrowUp, TrendingUp, TrendingDown } from 'lucide-react';
import StatusBadge from './StatusBadge';
import { campaignStore } from '../store/campaignStore';

function CampaignTable() {
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const {filteredCampaigns } = campaignStore();
  const [sortedCampaigns, setSortedCampaigns] = useState([]);

  useEffect(() => {
    if (filteredCampaigns) {
      const sorted = [...filteredCampaigns].sort((a, b) => {
        const aValue = a[sortField];
        const bValue = b[sortField];

        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return sortDirection === 'asc'
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        } else {
          return sortDirection === 'asc'
            ? Number(aValue) - Number(bValue)
            : Number(bValue) - Number(aValue);
        }
      });
      setSortedCampaigns(sorted);
    }
  }, [sortField, sortDirection, filteredCampaigns]);

  const handleSort = (field) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  };

  const formatNumber = (value) => {
    return new Intl.NumberFormat('en-US').format(value);
  };

  function SortIcon({ field }) {
    if (field !== sortField) return null;
    return sortDirection === 'asc' ? (
      <ArrowUp className="ml-1 h-4 w-4 inline text-primary-600" />
    ) : (
      <ArrowDown className="ml-1 h-4 w-4 inline text-primary-600" />
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th
              onClick={() => handleSort('name')}
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-50"
            >
              <span className="flex items-center">
                Campaign Name
                <SortIcon field="name" />
              </span>
            </th>
            <th
              onClick={() => handleSort('status')}
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-50"
            >
              <span className="flex items-center">
                Status
                <SortIcon field="status" />
              </span>
            </th>
            <th
              onClick={() => handleSort('clicks')}
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-50"
            >
              <span className="flex items-center">
                Clicks
                <SortIcon field="clicks" />
              </span>
            </th>
            <th
              onClick={() => handleSort('cost')}
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-50"
            >
              <span className="flex items-center">
                Cost
                <SortIcon field="cost" />
              </span>
            </th>
            <th
              onClick={() => handleSort('impressions')}
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-50"
            >
              <span className="flex items-center">
                Impressions
                <SortIcon field="impressions" />
              </span>
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Trend
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          <AnimatePresence>
            {sortedCampaigns?.length > 0 && sortedCampaigns.map((campaign) => (
              <motion.tr
                key={campaign.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="hover:bg-gray-50"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{campaign.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <StatusBadge status={campaign.status} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatNumber(campaign.clicks)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatCurrency(campaign.cost)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatNumber(campaign.impressions)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {campaign.clicks > 200 ? (
                    <TrendingUp className="h-5 w-5 text-success-500" />
                  ) : (
                    <TrendingDown className="h-5 w-5 text-warning-500" />
                  )}
                </td>
              </motion.tr>
            ))}
          </AnimatePresence>
        </tbody>
      </table>
    </div>
  );
}

export default CampaignTable;
