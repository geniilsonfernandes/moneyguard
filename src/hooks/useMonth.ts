import dayjs from 'dayjs';
import 'dayjs/locale/pt-br'; // Importe o idioma pt-BR
import { useState } from 'react';

dayjs.locale('pt-br'); // Configure o idioma para pt-BR

function useMonth() {
  const [currentMonth, setCurrentMonth] = useState(dayjs());
  const [changed, setChanged] = useState(false);

  const getNextMonth = () => {
    const newMonth = currentMonth.add(1, 'month');
    setCurrentMonth(newMonth);
    setChanged(true);
    return newMonth;
  };

  const getPreviousMonth = () => {
    const newMonth = currentMonth.subtract(1, 'month');
    setCurrentMonth(newMonth);
    setChanged(true);
    return newMonth;
  };

  const resetMonth = () => {
    setChanged(false);
    setCurrentMonth(dayjs());
    return dayjs();
  };

  return {
    currentMonth: currentMonth,
    monthFormatted: currentMonth.format('MMMM, YYYY'),
    getNextMonth,
    getPreviousMonth,
    resetMonth,
    changed
  };
}

export default useMonth;
