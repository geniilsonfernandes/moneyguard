type AmounBadgeProps = {
  amount: number | string;
  type?: 'income' | 'expense' | 'view';
};
const AmountBadge = ({ amount, type = 'view' }: AmounBadgeProps) => {
  return (
    <div
      className={[
        'text-sm text-green-400 font-semibold',
        type === 'view' ? 'text-zinc-500' : type === 'income' ? 'text-green-400' : 'text-red-400'
      ].join(' ')}>
      {type === 'view' ? '' : type === 'income' ? '+ ' : '- '}
      {amount}
    </div>
  );
};

export default AmountBadge;
