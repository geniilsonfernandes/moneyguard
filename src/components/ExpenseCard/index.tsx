import ExpenseItem from '../ExpenseItem';

const ExpenseCard = () => {
  return (
    <div className=" bg-slate-50 rounded-lg grid grid-cols-1 " aria-label="expense card">
      <ExpenseItem type="expense" />
    </div>
  );
};

export default ExpenseCard;
