import { cn } from '@/utils';

type StepsProps = {
  step: number;
  stepQuantity: number;
  onClick?: () => void;
};
const Steps = ({ step, stepQuantity, onClick }: StepsProps) => {
  return (
    <div className="flex gap-2 ">
      {Array(stepQuantity)
        .fill(0)
        .map((_, index) => (
          <div
            onClick={onClick}
            key={index}
            className={cn(
              'w-[38px] h-[3px] cursor-pointer hover:bg-slate-800',
              step >= index + 1 ? 'bg-slate-800' : 'bg-slate-200'
            )}
          />
        ))}
    </div>
  );
};

export default Steps;
