import useMonth from '@/hooks/useMonth';
import { ChevronLeft, ChevronRight, RotateCw } from 'lucide-react';
import { ButtonSmall } from '../ui/Button';

type MonthControlProps = {
  onChangeMonth: (month: string) => void;
};
const MonthControl = ({ onChangeMonth }: MonthControlProps) => {
  const { getNextMonth, getPreviousMonth, monthFormatted, resetMonth, changed } = useMonth();

  const prev = () => {
    const month = getPreviousMonth();
    onChangeMonth(month.format('MM/YYYY'));
  };
  const next = () => {
    const month = getNextMonth();
    onChangeMonth(month.format('MM/YYYY'));
  };
  const reset = () => {
    const month = resetMonth();
    onChangeMonth(month.format('MM/YYYY'));
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-between py-4 ">
      <div>
        <div>
          <h1 className="font-semibold text-zinc-950 text-2xl flex">
            Finanças de {monthFormatted}
          </h1>
        </div>
        <p className="text-zinc-500 text-sm mt-1">controle suas despesas</p>
      </div>

      <div className="flex gap-4 items-center ">
        {changed && (
          <ButtonSmall onClick={reset}>
            <RotateCw />
          </ButtonSmall>
        )}
        <div className="flex justify-between items-center w-full sm:w-auto">
          <ButtonSmall onClick={prev}>
            <ChevronLeft />
          </ButtonSmall>
          <span className="sm:min-w-[200px] text-center text-zinc-950 capitalize">
            {monthFormatted}
          </span>
          <ButtonSmall onClick={next}>
            <ChevronRight />
          </ButtonSmall>
        </div>
      </div>
    </div>
  );
};

export default MonthControl;
