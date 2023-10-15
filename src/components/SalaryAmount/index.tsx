import { cn } from '@/utils';
import formatNumber from '@/utils/formatNumber';
import AmountBadge from '../AmounBadge';

type AmoutProps = {
  className?: string;
};

const SalaryAmount = ({ className }: AmoutProps) => {
  const amountPlus = 324;
  const salary = 5324;

  const amount = formatNumber(salary + amountPlus, {
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
      {amountPlus && <AmountBadge amount={amount} type="expense" />}
    </div>
  );
};

export default SalaryAmount;
