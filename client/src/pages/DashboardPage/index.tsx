import React from 'react';
import clsx from 'clsx';
import { useToggle } from 'src/hooks';

import FilterPanel from './FilterPanel';

export const DashboardPage = () => {
  const [showFilterPanel, { toggle: toggleShowFilterPanel }] = useToggle(false);

  return (
    <div className="h-full w-full">
      <button className={clsx('h-10 w-10 rounded-full')} onClick={toggleShowFilterPanel}>
        {showFilterPanel ? `<<` : `>>`}
      </button>
      <FilterPanel show={showFilterPanel} toggleShow={toggleShowFilterPanel} />
    </div>
  );
};
