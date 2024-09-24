import React from 'react';

import FilterPanel from './FilterPanel';
import TableView from './TableView';

export const DashboardPage = () => {
  return (
    <div className="flex h-full w-full flex-col items-center">
      <p className="m-6 text-xl font-bold">Pokemon Dashboard</p>
      <TableView className="h-0 flex-grow" />
      <FilterPanel />
    </div>
  );
};
