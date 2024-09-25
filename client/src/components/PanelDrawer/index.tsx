import clsx from 'clsx';
import React, { HTMLAttributes, memo } from 'react';

interface IPanelDrawerProps extends HTMLAttributes<HTMLDivElement> {
  showBtnClassName?: string;
  underlayBtnClassName?: string;
  contentClassName?: string;
  openerLabel: string;
  show: boolean;
  toggleOnShow: () => void;
  toggleOffShow: () => void;
  children?: React.ReactNode;
}

export const PanelDrawer: React.FC<IPanelDrawerProps> = memo(
  ({
    className,
    children,
    showBtnClassName,
    underlayBtnClassName,
    contentClassName,
    openerLabel,
    show,
    toggleOnShow,
    toggleOffShow,
    ...rest
  }) => {
    return (
      <div className={clsx('pointer-events-none absolute h-full w-64', className)} {...rest}>
        {/* Show button */}
        <button
          className={clsx(
            'pointer-events-auto fixed top-1 z-10 rounded-md bg-blue-700 px-2 py-1 text-xs text-white opacity-100 transition-all duration-150',
            show && 'pointer-events-none opacity-0',
            showBtnClassName,
          )}
          onClick={toggleOnShow}>
          {openerLabel}
        </button>
        {/* Underlay button */}
        <button
          className={clsx(
            'fixed left-0 top-0 z-20 h-full w-full cursor-default transition-all duration-700',
            show && 'pointer-events-auto bg-black/30',
            underlayBtnClassName,
          )}
          onClick={toggleOffShow}
        />
        {/* Content */}
        <div
          className={clsx(
            'pointer-events-auto absolute z-30 flex h-full w-full flex-col bg-white transition-all duration-700',
            show && '!translate-x-0',
            contentClassName,
          )}>
          {children}
        </div>
      </div>
    );
  },
);
