import useMonth from '@/hooks/useMonth';
import { ChevronRight, ChevronLeft, RotateCw } from 'lucide-react';
import { ButtonSmall } from '../ui/Button';


type MonthControlProps = {
  onChangeMonth: (month: string) => void
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
    <div className="flex gap-4 items-center">
      <div className="flex justify-between items-center ">
        <ButtonSmall onClick={prev}>
          <ChevronLeft />
        </ButtonSmall>
        <span className="min-w-[200px] text-center text-zinc-50 capitalize">{monthFormatted}</span>
        <ButtonSmall onClick={next}>
          <ChevronRight />
        </ButtonSmall>
      </div>
      {changed && (
        <ButtonSmall onClick={reset}>
          <RotateCw />
        </ButtonSmall>
      )}
    </div>
  );
};

export default MonthControl;
