import clsx from 'clsx';
import React, { HTMLAttributes, memo, useCallback, useMemo } from 'react';
import { SORT_SYMBOLS } from 'src/constants';
import { useAppContext } from 'src/contexts';

interface ITableViewProps extends HTMLAttributes<HTMLDivElement> {}

const TableView: React.FC<ITableViewProps> = memo(({ className, ...rest }) => {
  const { pokemons, filterOptions, setFilterOptions } = useAppContext();

  // TODO: It can be just constant.
  // Headers data
  const headers = useMemo(() => {
    return [
      { name: 'number', label: 'Number' },
      { name: 'name', label: 'Name' },
      { name: 'generation', label: 'Generation' },
      { name: 'height', label: 'Height' },
      { name: 'weight', label: 'Weight' },
      { name: 'type1', label: 'Type 1' },
      { name: 'type2', label: 'Type 2' },
      { name: 'movesCount', label: 'Moves Count' },
    ];
  }, []);

  // Handle header click
  const onHeaderClick = useCallback(
    (e: React.MouseEvent<HTMLTableCellElement>) => {
      const { sort, sortDirection } = filterOptions;
      const newSort = e.currentTarget.getAttribute('data-name');
      const newFilterOptions = { ...filterOptions };

      // Toggle sort direction in case of same column
      if (newSort === sort) {
        if (sortDirection === 'asc') {
          newFilterOptions.sortDirection = 'desc';
        } else {
          newFilterOptions.sortDirection = 'asc';
        }
      }
      // Reset sort params in case of different column
      else {
        newFilterOptions.sort = newSort || undefined;
        newFilterOptions.sortDirection = 'asc';
      }

      setFilterOptions(newFilterOptions);
    },
    [filterOptions, setFilterOptions],
  );

  return (
    <div
      className={clsx(
        'relative h-full w-full overflow-auto px-4 pb-8 shadow-md sm:rounded-lg',
        className,
      )}
      {...rest}>
      <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
        <thead className="sticky top-0 bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
          {/* thead is sticky */}
          <tr>
            {headers.map(({ name, label }) => {
              const { sort, sortDirection } = filterOptions;
              let sortSymbol;

              if (sort === name && sortDirection) {
                sortSymbol = SORT_SYMBOLS[sortDirection];
              }

              return (
                <th
                  key={`dashboard-header-${name}`}
                  scope="col"
                  className="cursor-pointer px-6 py-3"
                  data-name={name}
                  onClick={onHeaderClick}>
                  {label} {sortSymbol}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {pokemons.map(({ number, name, generation, height, weight, types, moves }) => (
            <tr
              key={`pokemon-${number}-${name}`}
              className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600">
              <th
                scope="row"
                className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white">
                {number}
              </th>
              <td className="px-6 py-4">{name}</td>
              <td className="px-6 py-4">{generation}</td>
              <td className="px-6 py-4">{height}</td>
              <td className="px-6 py-4">{weight}</td>
              <td className="px-6 py-4">{types[0]}</td>
              <td className="px-6 py-4">{types[1]}</td>
              <td className="px-6 py-4">{moves.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});

export default TableView;
