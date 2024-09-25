import clsx from 'clsx';
import React, { HTMLAttributes, memo } from 'react';
import { LoadingIcon } from 'src/components';

interface ILoadingSpinnerProps extends HTMLAttributes<HTMLDivElement> {}

export const LoadingSpinner: React.FC<ILoadingSpinnerProps> = memo(({ className, ...rest }) => {
  return (
    <div className={clsx('flex h-full w-full items-center justify-center', className)} {...rest}>
      <LoadingIcon className="animate-spin text-black" width={100} height={100} />
    </div>
  );
});
