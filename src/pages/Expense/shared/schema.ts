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
  };
};

export type FrequencyFields = {
  mode: 'onlyMode' | 'monthMode';
  date?: Date;
  duration?: number;
  customDuration?: number;
  durationMode?: 'fixed' | 'custom';
};

export type ExpenseFields = ExpenseInfoFields & BudgetFields & FrequencyFields;

export const defaultValues: ExpenseFields = {
  type: 'expense',
  value: 0,
  name: '',
  note: '',
  budget: {} as BudgetFields['budget'],
  mode: 'onlyMode',
  date: dayjs().toDate(),
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
  mode: z.string(),
  name: z
    .string({
      required_error: 'Nome obrigatório',
      invalid_type_error: 'O nome deve ser uma string'
    })
    .refine((value) => value.trim().length > 0, {
      message: 'O nome não pode ser vazio'
    }),
  note: z.string().trim(),
  budget: z.nullable(
    z.object({
      name: z
        .string({
          required_error: 'O orçamento deve ser informado'
        })
        .refine((value) => value.trim().length > 0, {
          message: 'O orçamento não pode ser vazio'
        })
    })
  ),
  date: z
    .date({
      required_error: 'Data de inicio deve ser informada',
      invalid_type_error: 'O valor deve ser uma data'
    })
    .refine((value) => value !== null, {
      message: 'Data de inicio deve ser informada'
    })
    .transform((value) => {
      return dayjs(value).toDate();
    }),
  duration: z.optional(z.number()),
  durationMode: z.optional(z.string()),
  customDuration: z.optional(z.number())
});
