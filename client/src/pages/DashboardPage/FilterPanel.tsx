import clsx from 'clsx';
import React, { HTMLAttributes, memo } from 'react';
import { PanelDrawer } from 'src/components';
import { useAppContext } from 'src/contexts';
import { useToggle } from 'src/hooks';

interface IFilterPanelProps extends HTMLAttributes<HTMLDivElement> {}

const FilterPanel: React.FC<IFilterPanelProps> = memo(({ className, ...rest }) => {
  const { summary } = useAppContext();
  const [show, { toggleOn: toggleOnShow, toggleOff: toggleOffShow }] = useToggle(false);

  return (
    <PanelDrawer
      className={clsx('left-0 w-64', className)}
      showBtnClassName="left-1"
      contentClassName="-translate-x-full"
      openerLabel="Filter >>"
      show={show}
      toggleOnShow={toggleOnShow}
      toggleOffShow={toggleOffShow}
      {...rest}></PanelDrawer>
  );
});

export default FilterPanel;
