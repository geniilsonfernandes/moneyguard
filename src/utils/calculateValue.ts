import { PaymentMode, PeriodicityMode } from '@/http/api/DTO/ExpenseDTO';
import formatNumber from './formatNumber';

const calculateValue = (
  duration: number,
  paymentMode: keyof typeof PaymentMode = 'ALL',
  periodicityEnum: keyof typeof PeriodicityMode = 'ONCE',
  amount: number
) => {
  if (periodicityEnum === 'FIXED') {
    return `
    Em ${duration}x de
     ${paymentMode === 'ALL' ? formatNumber(amount) : formatNumber(amount / (duration || 0))}
    `;
  }

  if (periodicityEnum === 'ONCE') {
    return `Sem recorrência ${formatNumber(amount)}`;
  }

  return `Fixo mensal ${formatNumber(amount)}`;
};

export default calculateValue;
