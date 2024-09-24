import React from 'react';

import FilterPanel from './FilterPanel';

export const DashboardPage = () => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <FilterPanel />
      <div>Dashboard</div>
    </div>
  );
};
