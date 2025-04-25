import React from 'react';
import { motion } from 'framer-motion';
import { LineChart, LayoutDashboard } from 'lucide-react';

function DashboardHeader() {
  return (
    <motion.div 
      className="bg-white shadow-sm px-6 py-4 mb-6 rounded-lg"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <LayoutDashboard className="h-7 w-7 text-primary-600" />
          <h1 className="text-2xl font-bold text-gray-900">Marketing Campaigns</h1>
        </div>
        <div className="flex items-center">
          <motion.button
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <LineChart className="h-4 w-4 mr-2" />
            View Analytics
          </motion.button>
        </div>
      </div>
      <p className="mt-1 text-sm text-gray-600">
        Monitor and optimize your marketing campaign performance
      </p>
    </motion.div>
  );
}

export default DashboardHeader;
