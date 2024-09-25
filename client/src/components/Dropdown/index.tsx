import clsx from 'clsx';
import React, { memo } from 'react';

interface IDropdownProps {
  className?: string;
  label?: string;
  name: string;
  value: string;
  options: string[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const Dropdown: React.FC<IDropdownProps> = memo(
  ({ className, label, name, value, options, onChange }) => {
    return (
      <div className={clsx('flex w-full items-center justify-center gap-1', className)}>
        {label ? <span className="shrink text-xs">{label}</span> : null}
        <select
          className="w-0 flex-grow rounded border border-blue-700 px-2"
          name={name}
          value={value}
          onChange={onChange}>
          <option value={''}>Select an option</option>
          {options.map((option, i) => (
            <option key={`dropdown-${name}-${i}`} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    );
  },
);
