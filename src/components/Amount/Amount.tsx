import { cn } from '@/utils';
import formatNumber from '@/utils/formatNumber';

type AmoutProps = {
  className?: string;
};

type AmounBadgeProps = {
  amount: number;
  type: 'in' | 'out';
};
const AmounBadge = ({ amount, type }: AmounBadgeProps) => {
  return (
    <div
      className={[
        'text-base text-green-400 font-bold',
        type === 'in' ? 'text-green-400' : 'text-red-400'
      ].join(' ')}>
      {type ? (type === 'in' ? '+ ' : '- ') : null}
      {amount}
    </div>
  );
};

const Amount = ({ className }: AmoutProps) => {
  const amountPlus = 300;
  const amount = formatNumber(1000 + amountPlus, {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2
  });

  return (
    <div className={cn(className, 'flex items-end gap-4')}>
      <div className="flex flex-col">
        <span className="text-base text-slate-400">Meu Salário</span>
        <h1 className="text-5xl font-bold mt-2 text-slate-950">{amount}</h1>
      </div>
      {amountPlus && <AmounBadge amount={amountPlus} type="in" />}
    </div>
  );
};

export default Amount;
