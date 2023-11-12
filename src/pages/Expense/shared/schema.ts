import dayjs from 'dayjs';
import { z } from 'zod';

export type ExpenseInfoFields = {
  type: 'income' | 'expense';
  value: number;
  name: string;
  note: string;
};

export type BudgetFields = {
  budget: {
    name: string;
    id: string;
    value: number;
  } | null;
};

export type FrequencyFields = {
  mode: 'onlyMode' | 'monthMode';
  startDate?: string;
  duration?: number;
  customDuration?: number;
  durationMode?: 'fixed' | 'custom';
};

export type ExpenseFields = ExpenseInfoFields & BudgetFields & FrequencyFields;

export const defaultValues: ExpenseFields = {
  type: 'expense',
  value: 300,
  name: 'conta de luz',
  note: 'nenhuma',
  budget: null,
  mode: 'onlyMode',
  startDate: dayjs().format('YYYY-MM-DD'),
  duration: 3,
  customDuration: 1,
  durationMode: 'fixed'
};

export const createSchema = z.object({
  type: z.string(),
  value: z
    .number({
      invalid_type_error: 'O valor deve ser um número'
    })
    .refine((value) => value > 0, {
      message: 'O valor deve ser maior que 0'
    }),
  name: z
    .string({
      required_error: 'Nome obrigatório',
      invalid_type_error: 'O nome deve ser uma string'
    })
    .refine((value) => value.trim().length > 0, {
      message: 'O nome não pode ser vazio'
    }),
  note: z.string().trim(),
  startDate: z
    .date({
      required_error: 'Data de inicio deve ser informada'
    })
    .refine((value) => value !== null, {
      message: 'Data de inicio deve ser informada'
    })
    .transform((value) => {
      return dayjs(value).format('YYYY-MM-DD');
    }),
  duration: z
    .number({
      required_error: 'Duração deve ser informada'
    })
    .refine((value) => value > 0, {
      message: 'Duração deve ser informada'
    })
});
