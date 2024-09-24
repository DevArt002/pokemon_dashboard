import clsx from 'clsx';
import React, { HTMLAttributes, memo } from 'react';
import { useToggle } from 'src/hooks';

interface IFilterPanelProps extends HTMLAttributes<HTMLDivElement> {}

const FilterPanel: React.FC<IFilterPanelProps> = memo(({ className, ...rest }) => {
  const [show, { toggleOn: toggleOnShow, toggleOff: toggleOffShow }] = useToggle(false);

  return (
    <div className={clsx('pointer-events-none absolute h-full w-full', className)} {...rest}>
      {/* Show button */}
      <button
        className={clsx(
          'pointer-events-auto fixed top-1 left-1 z-10 h-10 w-10 rounded-full bg-blue-700 text-white opacity-100 transition-all duration-150',
          show && 'pointer-events-none opacity-0',
        )}
        onClick={toggleOnShow}>
        {`>>`}
      </button>
      {/* Underlay button */}
      <button
        className={clsx(
          'fixed left-0 top-0 h-full w-full transition-all duration-700',
          show && 'pointer-events-auto bg-black/30',
        )}
        onClick={toggleOffShow}
      />
      {/* Filter content */}
      <div
        className={clsx(
          'relative h-full w-64 bg-white transition-all duration-700',
          show ? 'left-0 shadow-lg' : '-left-64 shadow-none',
        )}>
        <span>Filter Panel</span>
      </div>
    </div>
  );
});

export default FilterPanel;
