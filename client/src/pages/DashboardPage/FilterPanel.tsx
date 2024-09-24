import clsx from 'clsx';
import React, { HTMLAttributes, memo } from 'react';
import { useToggle } from 'src/hooks';

interface IFilterPanelProps extends HTMLAttributes<HTMLDivElement> {}

const FilterPanel: React.FC<IFilterPanelProps> = memo(({ className, ...rest }) => {
  const [show, { toggle: toggleShow }] = useToggle(false);

  return (
    <div className={clsx('relative h-full w-64', className)} {...rest}>
      <button className={clsx('h-10 w-10 rounded-full')} onClick={toggleShow}>
        {show ? `<<` : `>>`}
      </button>
      <div
        className={clsx(
          'relative h-full w-64 transition-all duration-1000',
          show ? 'left-0 shadow-lg' : '-left-64 shadow-none',
        )}>
        <span>FILTER PANEL HERE</span>
      </div>
    </div>
  );
});

export default FilterPanel;
