import { PaymentEnum, PeriodicityEnum } from '@/pages/Expense/shared/schema';
import formatNumber from './formatNumber';

const calculateValue = (
  duration: number,
  paymentMode: keyof typeof PaymentEnum = 'all',
  periodicityEnum: keyof typeof PeriodicityEnum = 'only',
  value: number
) => {
  if (periodicityEnum === 'repeat') {
    return `
    Em ${duration}x de
     ${paymentMode === 'all' ? formatNumber(value) : formatNumber(value / (duration || 0))}
    `;
  }

  if (periodicityEnum === 'only') {
    return `Sem recorrência ${formatNumber(value)}`;
  }

  return `Fixo mensal ${formatNumber(value)}`;
};

export default calculateValue;
