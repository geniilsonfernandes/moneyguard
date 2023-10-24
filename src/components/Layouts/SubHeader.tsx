import { cn } from '@/utils';
import React from 'react';

type SubHeaderProps = {
  children: React.ReactNode;
  className?: string;
};
const SubHeader = ({ children, className }: SubHeaderProps) => {
  return (
    <div className={cn('bg-slate-100 w-full  h-[200px]')}>
      <div className={cn('container', className)}>{children}</div>
    </div>
  );
};

export default SubHeader;
