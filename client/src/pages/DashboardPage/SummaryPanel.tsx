import clsx from 'clsx';
import React, { HTMLAttributes, memo, useMemo } from 'react';
import { PanelDrawer } from 'src/components';
import { useAppContext } from 'src/contexts';
import { useToggle } from 'src/hooks';

interface ISummaryPanelProps extends HTMLAttributes<HTMLDivElement> {}

const SummaryPanel: React.FC<ISummaryPanelProps> = memo(({ className, ...rest }) => {
  const { summary } = useAppContext();
  const [show, { toggleOn: toggleOnShow, toggleOff: toggleOffShow }] = useToggle(false);

  // Counts per type and generation
  const summaryCountPerX = useMemo(
    () => [
      { label: 'Counts per Pokemon Type', value: summary.countsPerType },
      { label: 'Counts per Pokemon Generation', value: summary.countsPerGeneration },
    ],
    [summary],
  );

  return (
    <PanelDrawer
      className={clsx('right-0 w-96', className)}
      showBtnClassName="right-1"
      contentClassName="translate-x-full"
      openerLabel="<< Summary"
      show={show}
      toggleOnShow={toggleOnShow}
      toggleOffShow={toggleOffShow}
      {...rest}>
      {/* Total species */}
      <p className="my-2 px-4 font-bold">Total Species: {summary.totalSpecies}</p>
      {/* Counts per type and generation */}
      {summaryCountPerX.map(({ label, value }) => (
        <div key={`summary-${label}`} className="flex h-full w-full flex-col">
          <p className="my-2 px-4 text-sm font-bold">{label}</p>
          <div className="relative h-0 w-full flex-grow overflow-auto px-4 pb-8">
            <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
              <thead className="sticky top-0 bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                {/* thead is sticky */}
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Type
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Count
                  </th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(value).map(([type, count]) => (
                  <tr
                    key={`type-summary-${type}`}
                    className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600">
                    <th
                      scope="row"
                      className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white">
                      {type}
                    </th>
                    <td className="px-6 py-4">{count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </PanelDrawer>
  );
});

export default SummaryPanel;
