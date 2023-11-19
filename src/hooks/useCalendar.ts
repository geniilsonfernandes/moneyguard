import dayjs, { Dayjs } from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import { useMemo, useState } from 'react';

import 'dayjs/locale/pt-br';
import generateHashId from '@/utils/generateHashId';

dayjs.extend(weekOfYear);

dayjs.locale('pt-br');

export interface CalendarWeek {
  id: string;
  date: Date;
  day: string;
  disabled: boolean;
  isToday: boolean;
}

interface YearCalendar {
  nextMonth: () => void;
  previousMonth: () => void;
  month: CalendarWeek[];
  currentDate: Dayjs;
}

/**
 * Generates the calendar for a given month and year.
 *
 * @param {Object} props - The properties for generating the calendar.
 * @param {string} props.monthFormat - The format of the month to be displayed (default: 'MMMM YYYY').
 * @return {Object} The generated calendar.
 */
const useCalendar = (): YearCalendar => {
  const [currentDate, setCurrentDate] = useState(dayjs());

  const calendarWeek = useMemo(() => {
    function createDayObject(date: dayjs.Dayjs, disabled: boolean) {
      return {
        id: date.format('YYYY-MM-DD') + generateHashId(8),
        date: date.toDate(),
        day: date.format('DD'),
        disabled: disabled,
        isToday: date.isSame(dayjs(), 'day')
      };
    }

    function getDaysInMonth() {
      const daysInMonth = Array.from({ length: currentDate.daysInMonth() }, (_, index) => {
        const date = currentDate.set('date', index + 1);
        return createDayObject(date, false);
      });
      return daysInMonth;
    }

    function getFirstWeek() {
      const firstDayOfMonth = currentDate.startOf('month');
      const startOfWeek = firstDayOfMonth.startOf('week'); // Obtém o início da semana
      const daysFromPreviousMonth = firstDayOfMonth.diff(startOfWeek, 'day');

      const firstWeek = Array.from({ length: daysFromPreviousMonth }, (_, index) => {
        const date = startOfWeek.add(index, 'day');
        return createDayObject(date, true);
      });
      return firstWeek;
    }

    function getLastWeek(weekLength: number) {
      const currentDate = dayjs().endOf('month');
      const lastWeek = Array.from({ length: weekLength }, (_, index) => {
        const date = currentDate.add(index + 1, 'day');
        return createDayObject(date, true);
      });
      return lastWeek;
    }

    function generateCalendar() {
      const daysInMonth = getDaysInMonth();
      const firstWeek = getFirstWeek();

      const firstWeekLength = firstWeek.length;
      const monthLength = daysInMonth.length;

      const lastWeek = getLastWeek(
        daysInMonth[daysInMonth.length - 1].date.getDay() + (42 - monthLength - firstWeekLength)
      );

      return [...firstWeek, ...daysInMonth, ...lastWeek].slice(0, 42);
    }

    return generateCalendar().slice(0, 42);
  }, [currentDate]);

  function nextMonth() {
    setCurrentDate(currentDate.add(1, 'month'));
  }

  function previousMonth() {
    setCurrentDate(currentDate.subtract(1, 'month'));
  }

  return {
    nextMonth,
    previousMonth,
    currentDate: currentDate,
    month: calendarWeek
  };
};

export default useCalendar;
