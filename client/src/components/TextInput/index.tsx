import clsx from 'clsx';
import React, { memo } from 'react';

interface ITextInputProps {
  className?: string;
  label?: string;
  name: string;
  value: string | number;
  type: 'text' | 'number';
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const TextInput: React.FC<ITextInputProps> = memo(
  ({ className, label, type, name, value, onChange }) => {
    return (
      <div className={clsx('flex w-full items-center justify-center gap-1', className)}>
        {label ? <span className="shrink text-xs">{label}</span> : null}
        <input
          className="w-0 flex-grow rounded border border-blue-700 px-2"
          type={type}
          name={name}
          value={value}
          onChange={onChange}
        />
      </div>
    );
  },
);
