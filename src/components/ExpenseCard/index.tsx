import ExpenseItem, { ExpenseItemProps } from '../ExpenseItem';

const ExpenseCard = (props: ExpenseItemProps) => {
  return (
    <div className="bg-slate-50 rounded-lg grid grid-cols-1" aria-label="expense card">
      <ExpenseItem {...props} />
    </div>
  );
};

export default ExpenseCard;
