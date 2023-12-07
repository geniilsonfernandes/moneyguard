import FadeIn from '@/components/Animations/FadeIn';
import formatNumber from '@/utils/formatNumber';
import dayjs from 'dayjs';
import { ArrowDownCircle, ArrowUpCircle } from 'lucide-react';
import { ExpenseFields } from '../shared/schema';
import calculateValue from '@/utils/calculateValue';

type ViewProps = {
  expense: ExpenseFields;
};

const View = ({ expense }: ViewProps) => {
  return (
    <div className="sticky top-[8px] w-full  hover:scale-[1.01] transition ease-in-out">
      <FadeIn animation="bounce">
        <div className="flex flex-col items-center justify-center ounded-lg mx-auto w-full">
          <div className="bg-slate-950 w-full px-8 py-4 rounded-lg relative space-y-4">
            {expense.type === 'INCOME' ? (
              <div className="text-green-400 pt-4">
                <ArrowUpCircle /> Entrada
              </div>
            ) : (
              <div className="text-red-400 pt-4">
                <ArrowDownCircle /> Saida
              </div>
            )}
            <div>
              <span className="text-zinc-500">nome:</span>
              <h1 className="text-zinc-50 text-2xl font-bold">{expense.name}</h1>
            </div>
            <div>
              <span className="text-zinc-500">Valor:</span>
              <h1 className="text-zinc-50 text-2xl font-bold">
                {formatNumber(expense.amount, {
                  style: 'currency',
                  currency: 'BRL',
                  minimumFractionDigits: 2
                })}
              </h1>
            </div>
            <span className="z-50 absolute left-[-16px] bottom-[-16px] w-[32px] h-[32px] rounded-full bg-white " />
            <span className="z-50 absolute right-[-16px] bottom-[-16px] w-[32px] h-[32px] rounded-full bg-white " />
          </div>
          <div className="bg-slate-100 w-full px-8 py-4 rounded-lg relative  space-y-4">
            <div>
              <span className="text-zinc-500">Data:</span>
              <h1 className="text-zinc-950 text-base">
                {dayjs(expense.due_date).format('DD [de] MMMM YYYY')}
              </h1>
            </div>
            <div>
              <span className="text-zinc-500">Orçamento:</span>
              <h1 className="text-zinc-950 text-base">{expense.budget.name}</h1>
            </div>
            <div>
              <span className="text-zinc-500">Recorrência:</span>
              <h1>
                {calculateValue(
                  expense.duration || 0,
                  expense.payment_mode,
                  expense.periodicity_mode,
                  expense.amount
                )}
              </h1>
            </div>
            <hr className="my-4 border-slate-200 border-dashed" />
            <div>
              <span className="text-zinc-500">Nota:</span>
              <h1 className="text-zinc-950 text-base">
                {expense.note ? expense.note : 'Sem nota'}
              </h1>
            </div>
          </div>
        </div>
      </FadeIn>
    </div>
  );
};

export default View;
