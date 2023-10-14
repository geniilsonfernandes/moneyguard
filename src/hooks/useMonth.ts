import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br'; // Importe o idioma pt-BR

dayjs.locale('pt-br'); // Configure o idioma para pt-BR

function useMonth() {
  const [currentMonth, setCurrentMonth] = useState(dayjs());
  const [changed, setChanged] = useState(false);

  const getNextMonth = () => {
    setCurrentMonth(currentMonth.add(1, 'month'));
    setChanged(true);
  };

  const getPreviousMonth = () => {
    setCurrentMonth(currentMonth.subtract(1, 'month'));
    setChanged(true);
  };

  const resetMonth = () => {
    setChanged(false);
    setCurrentMonth(dayjs());
  };

  useEffect(() => {
    // This effect will run when the component using the hook mounts
    // and when the currentMonth value changes.
    console.log('Current Month:', currentMonth.format('MMMM YYYY'));
  }, [currentMonth]);

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
