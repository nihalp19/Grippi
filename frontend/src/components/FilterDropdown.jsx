import React from 'react';
import { Filter } from 'lucide-react';

function FilterDropdown({ selectedFilter, onFilterChange }) {
  return (
    <div className="relative inline-flex items-center gap-2">
      <Filter className="h-4 w-4 text-gray-400" />
      <select
        value={selectedFilter}
        onChange={(e) => onFilterChange(e.target.value)}
        className="block pl-3 pr-10 py-2 text-sm border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white shadow-sm"
      >
        <option value="All">All Campaigns</option>
        <option value="Active">Active Only</option>
        <option value="Paused">Paused Only</option>
      </select>
    </div>
  );
}

export default FilterDropdown;
