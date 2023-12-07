type AmounBadgeProps = {
  amount: number | string;
  type?: 'INCOME' | 'EXPENSE' | 'VIEW';
};
const AmountBadge = ({ amount, type = 'VIEW' }: AmounBadgeProps) => {
  return (
    <div
      className={[
        'text-sm text-green-400 font-semibold',
        type === 'VIEW' ? 'text-zinc-500' : type === 'INCOME' ? 'text-green-400' : 'text-red-400'
      ].join(' ')}>
      {amount}
    </div>
  );
};

export default AmountBadge;
