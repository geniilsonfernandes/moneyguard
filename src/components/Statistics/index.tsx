import formatNumber from '@/utils/formatNumber';
import { TrendingUp, Wallet } from 'lucide-react';

const Statistics = () => {
  return (
    <div className="text-neutral-500 border border-salte-200 bg-white rounded-lg">
      <div className="p-4">
        <h3 className="font-bold text-zinc-800 gap-2 flex items-center">
          <span className="w-[38px] h-[38px] bg-slate-100 rounded-lg flex-center">
            <Wallet size={20} />
          </span>
          Economia este mês
        </h3>
        <div className="flex items-center justify-between pt-8 text-zinc-950">
          <h1 className=" text-3xl font-normal ">{formatNumber(100 + 300 + -200)}</h1>
          <div className="w-[48px] h-[48px] border border-slate-800 rounded-full flex-center">
            <TrendingUp size={24} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
