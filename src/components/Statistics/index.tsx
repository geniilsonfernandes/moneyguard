import { cn } from '@/utils';
import formatNumber from '@/utils/formatNumber';
import { TrendingUp, Wallet, TrendingDown } from 'lucide-react';

type StatisticsProps = {
  title: string;
  value: number;
  icon?: 'up' | 'down';
};
const Statistics = ({ title, value, icon }: StatisticsProps) => {
  const iconType = icon ? icon : value >= 0 ? 'up' : 'down';

  return (
    <div className="text-neutral-500 border border-salte-200 bg-white rounded-lg">
      <div className="p-4">
        <h3 className="font-bold text-zinc-800 gap-2 flex items-center">
          <span className="w-[38px] h-[38px] bg-slate-100 rounded-lg flex-center">
            <Wallet size={20} />
          </span>
          {title}
        </h3>
        <div
          className={cn(
            'flex items-center justify-between pt-8 text-zinc-950',
            iconType === 'up' ? 'text-green-500' : 'text-red-500'
          )}>
          <h1 className=" text-3xl font-normal ">{formatNumber(value)}</h1>
          <div
            className={cn(
              'w-[48px] h-[48px] border border-slate-800 rounded-full flex-center',
              iconType === 'up' ? 'text-green-500 border-green-500' : 'text-red-500  border-red-500'
            )}>
            {iconType === 'up' ? (
              <TrendingUp className="text-green-500" />
            ) : (
              <TrendingDown className="text-red-500" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
