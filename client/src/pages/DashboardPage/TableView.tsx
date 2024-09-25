import clsx from 'clsx';
import React, { HTMLAttributes, memo, useCallback, useMemo } from 'react';
import { SORT_SYMBOLS } from 'src/constants';
import { useAppContext } from 'src/contexts';
import { useHistory } from 'react-router-dom';

interface ITableViewProps extends HTMLAttributes<HTMLDivElement> {}

const TableView: React.FC<ITableViewProps> = memo(({ className, ...rest }) => {
  const history = useHistory();
  const { pokemons, filterOptions, maxPage, setFilterOptions } = useAppContext();

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

  // TODO: When filtering, this quickPages should be dynamic. Currently it's not changing due to maxPage depends on static total species(1025)
  // Quick pages(up to 5 pages)
  const quickPages = useMemo(() => {
    const currentPage = filterOptions.page;
    const pages: number[] = [];
    for (let i = currentPage - 2; i <= currentPage + 2; i++) {
      if (i > 0 && i <= maxPage) {
        pages.push(i);
      }
    }
    return pages;
  }, [maxPage, filterOptions]);

  // Handle header click
  const handleHeaderClick = useCallback(
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

  // Handle pagination to next page
  const handleGoToNextPage = useCallback(() => {
    setFilterOptions({ ...filterOptions, page: Math.min(maxPage, filterOptions.page + 1) });
  }, [filterOptions, setFilterOptions, maxPage]);

  // Handle pagination to previous page
  const handleGoToPrevPage = useCallback(() => {
    setFilterOptions({ ...filterOptions, page: Math.max(1, filterOptions.page - 1) });
  }, [filterOptions, setFilterOptions]);

  // Handle pagination to specific page
  const handleGoToSpecificPage = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const pageNumber = Number(e.currentTarget.value);
      setFilterOptions({ ...filterOptions, page: pageNumber });
    },
    [filterOptions, setFilterOptions],
  );

  // Handle go to pokemon details page
  const handleGoToPokemonDetails = useCallback(
    (e: React.MouseEvent<HTMLTableRowElement>) => {
      const pokemonNumber = e.currentTarget.getAttribute('data-number');

      history.push(`/pokemon/${pokemonNumber}`);
    },
    [history],
  );

  return (
    <div
      className={clsx(
        'relative h-full w-full overflow-auto px-4 pb-8 shadow-md sm:rounded-lg',
        className,
      )}
      {...rest}>
      {/* Pagination */}
      <div className="z-10 mb-2 flex justify-center gap-2">
        <button
          className="rounded-md bg-blue-500 px-2 py-1 text-xs text-white"
          onClick={handleGoToPrevPage}>
          Prev
        </button>
        {/* Quick pages (up to 5 pages) */}
        {quickPages.map((page, i) => (
          <button
            key={`dashboard-pagination-${i}`}
            className={clsx(
              'rounded-md px-2 py-1 text-xs text-white',
              page === filterOptions.page ? 'bg-blue-500' : 'bg-gray-500',
            )}
            value={page}
            onClick={handleGoToSpecificPage}>
            {page}
          </button>
        ))}
        <button
          className="rounded-md bg-blue-500 px-2 py-1 text-xs text-white"
          onClick={handleGoToNextPage}>
          Next
        </button>
      </div>
      {/* Table */}
      <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
        <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
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
                  onClick={handleHeaderClick}>
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
              className="cursor-pointer border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
              data-number={number}
              onClick={handleGoToPokemonDetails}>
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
