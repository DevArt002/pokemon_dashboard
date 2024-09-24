import clsx from 'clsx';
import React, { HTMLAttributes, memo } from 'react';
import { useAppContext } from 'src/contexts';

interface ITableViewProps extends HTMLAttributes<HTMLDivElement> {}

const TableView: React.FC<ITableViewProps> = memo(({ className, ...rest }) => {
  const { pokemons } = useAppContext();

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
            <th scope="col" className="px-6 py-3">
              Number
            </th>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Generation
            </th>
            <th scope="col" className="px-6 py-3">
              Height
            </th>
            <th scope="col" className="px-6 py-3">
              Weight
            </th>
            <th scope="col" className="px-6 py-3">
              Type 1
            </th>
            <th scope="col" className="px-6 py-3">
              Type 2
            </th>
            <th scope="col" className="px-6 py-3">
              Moves count
            </th>
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
