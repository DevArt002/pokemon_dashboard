import clsx from 'clsx';
import React, { HTMLAttributes, memo, useCallback, useMemo, useState } from 'react';
import { Dropdown, PanelDrawer } from 'src/components';
import { IFilterOptions } from 'src/types';
import { TextInput } from 'src/components/TextInput';
import { useAppContext } from 'src/contexts';
import { useToggle } from 'src/hooks';

interface IFilterPanelProps extends HTMLAttributes<HTMLDivElement> {}

const FilterPanel: React.FC<IFilterPanelProps> = memo(({ className, ...rest }) => {
  const { summary, filterOptions, setFilterOptions } = useAppContext();
  const [filterOpt, setFilterOpt] = useState<IFilterOptions>(filterOptions); // Local state to store filter options before submit
  const [show, { toggleOn: toggleOnShow, toggleOff: toggleOffShow }] = useToggle(false);

  // Filter inputs
  const filterInputs: {
    name: keyof IFilterOptions;
    label: string;
    type: 'text' | 'number' | 'dropdown';
    value: string | number;
    options?: string[];
  }[] = useMemo(() => {
    return [
      { name: 'number', label: 'Number', type: 'text', value: filterOpt.number ?? '' },
      { name: 'name', label: 'Name', type: 'text', value: filterOpt.name ?? '' },
      {
        name: 'movesCount',
        label: 'Moves Count',
        type: 'number',
        value: filterOpt.movesCount ?? '',
      },
      {
        name: 'type1',
        label: 'Type 1',
        type: 'dropdown',
        value: filterOpt.type1 ?? '',
        options: summary.types,
      },
      {
        name: 'type2',
        label: 'Type 2',
        type: 'dropdown',
        value: filterOpt.type2 ?? '',
        options: summary.types,
      },
      {
        name: 'generation',
        label: 'Generation',
        type: 'dropdown',
        value: filterOpt.generation ?? '',
        options: summary.generations,
      },
    ];
  }, [filterOpt, summary]);

  // Handle filter change
  const handleFilterChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
      const param = e.currentTarget.name;
      const value = e.currentTarget.value;
      setFilterOpt((prev) => ({ ...prev, [param]: value }));
    },
    [],
  );

  // Handle filter submit
  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      toggleOffShow();
      setFilterOptions(filterOpt); // Update global state with local state
    },
    [filterOpt, setFilterOptions, toggleOffShow],
  );

  return (
    <PanelDrawer
      className={clsx('left-0 w-64', className)}
      showBtnClassName="left-1"
      contentClassName="-translate-x-full"
      openerLabel="Filter >>"
      show={show}
      toggleOnShow={toggleOnShow}
      toggleOffShow={toggleOffShow}
      {...rest}>
      <form className="flex h-full w-full flex-col gap-4 p-2" onSubmit={handleSubmit}>
        <p className="text-lg font-bold">Filters</p>
        {filterInputs.map(({ name, label, type, value, options }) => {
          return type === 'dropdown' ? (
            <Dropdown
              key={`filter-${name}`}
              label={label}
              name={name}
              value={value as string}
              options={options as string[]}
              onChange={handleFilterChange}
            />
          ) : (
            <TextInput
              key={`filter-${name}`}
              label={label}
              type={type}
              name={name}
              value={value}
              onChange={handleFilterChange}
            />
          );
        })}
        {/* Submit button */}
        <button type="submit" className="rounded-md bg-blue-700 px-2 py-1 text-xs text-white">
          Submit
        </button>
      </form>
    </PanelDrawer>
  );
});

export default FilterPanel;
