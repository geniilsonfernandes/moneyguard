import { cn } from '@/utils';
import { ArrowLeft } from 'lucide-react';
import React from 'react';

type SubHeaderProps = {
  children?: React.ReactNode;
  className?: string;
  goBack?: () => void;
  title?: string;
  subTitle?: string;
};
const SubHeader = ({ children, className, goBack, title, subTitle }: SubHeaderProps) => {
  return (
    <div className="w-full bg-slate-50 border-b border-slate-100">
      {goBack && (
        <div className="container py-4 pt-8">
          <button
            onClick={goBack}
            className="flex items-center gap-2 text-base  text-zinc-950 font-semibold">
            <div className="flex items-center justify-center h-[48px] rounded-lg">
              <ArrowLeft size={18} />
            </div>
            Voltar
          </button>
        </div>
      )}
      <div className={cn('container py-4 pb-8', className)}>
        {title && (
          <div className="h-full col-span-6 sm:col-span-4 ">
            <div>
              <h1 className="font-semibold text-zinc-950 text-2xl">{title}</h1>
              {subTitle && <p className="text-zinc-500 text-sm mt-1">{subTitle}</p>}
            </div>
          </div>
        )}
        {children}
      </div>
    </div>
  );
};
export default SubHeader;
