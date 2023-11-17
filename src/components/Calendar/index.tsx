import useCalendar from '@/hooks/useCalendar';
import { cn } from '@/utils';
import { cva } from 'class-variance-authority';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useCallback, useState } from 'react';
import Button from '../ui/Button';

const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];

type DayButtonProps = {
  day: number | string;
  isToday?: boolean;
  isActive?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const DayButtonVariants = cva(
  'text-center text-neutral-500 font-medium py-1 hover:bg-slate-200 rounded-md disabled:cursor-not-allowed disabled:opacity-20',
  {
    variants: {
      isToday: {
        true: 'bg-slate-200 hover:bg-slate-800',
        false: 'text-slate-500'
      },
      isActive: {
        true: 'bg-slate-950 text-white hover:bg-slate-800',
        false: 'text-slate-500'
      }
    }
  }
);

const DayButton = ({ day, isActive, isToday, ...props }: DayButtonProps) => {
  return (
    <button
      className={cn(
        DayButtonVariants({
          isActive,
          isToday
        })
      )}
      {...props}>
      {day}
    </button>
  );
};

type CalendarProps = {
  width?: 'full' | 'md' | 'sm';
  onClose?: () => void;
  onChange?: (date: Date) => void;
  value?: Date;
};

const Calendar = ({ width, onClose, onChange, value = new Date() }: CalendarProps) => {
  const { month, nextMonth, previousMonth, currentDate } = useCalendar(); // Certifique-se de ter acesso aos dados corretos do useCalendar

  const [selectedDay, setSelectedDay] = useState<Date>(value);

  const prev = () => {
    previousMonth();
  };

  const next = () => {
    nextMonth();
  };

  const handleSelectDay = useCallback(
    (date: Date) => {
      setSelectedDay(date);
      onChange?.(date);
    },
    [onChange]
  );

  console.log({ selectedDay, value });

  return (
    <div
      className={[
        'bg-slate-100 rounded-lg',
        width === 'full' && 'w-full',
        width === 'md' && 'w-1/2',
        width === 'sm' && 'w-1/3'
      ].join(' ')}>
      <div className="flex justify-between mb-4 bg-slate-200 px-6 py-4 rounded-t-lg">
        <div>
          <span className="text-zinc-400 text-xs">{currentDate.format('YYYY')}</span>
          <h3 className="text-2xl capitalize font-medium min-w-[150px]">
            {currentDate.format('ddd, DD [de] MMM')}
          </h3>
        </div>
        <div className="flex gap-4">
          <div className="flex gap-2">
            <button onClick={prev}>
              <ChevronLeft />
            </button>
            <button onClick={next}>
              <ChevronRight />
            </button>
          </div>
          <button onClick={onClose}>
            <X />
          </button>
        </div>
      </div>
      <div className="py-4">
        <div className="grid grid-cols-7 gap-2">
          {weekDays.map((day) => (
            <div key={day} className="text-center font-medium">
              {day}
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-7 gap-1 pb-4">
        {month.map(({ day, disabled, isToday, date, id }) => (
          <DayButton
            key={id}
            day={day}
            isToday={isToday}
            disabled={disabled}
            isActive={date.toDateString() === selectedDay?.toDateString()}
            onClick={() => {
              handleSelectDay(date);
            }}>
            {day}
          </DayButton>
        ))}
      </div>
      <div className="flex justify-end p-6">
        <Button variant="ghost" onClick={onClose}>
          Cancelar
        </Button>
        <Button onClick={onClose}>Confirmar</Button>
      </div>
    </div>
  );
};

export default Calendar;
