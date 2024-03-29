import dayjs from 'dayjs';
import { z } from 'zod';

export type ExpenseInfoFields = {
  type: 'INCOME' | 'EXPENSE';
  amount: number;
  name: string;
  note: string;
};

export type BudgetFields = {
  budget: {
    name: string;
    id: string;
  };
};

export enum PeriodicityEnum {
  ONCE = 'ONCE',
  MONTHLY = 'MONTHLY',
  FIXED = 'FIXED'
}

export enum PaymentEnum {
  ALL = 'ALL',
  PARCEL = 'PARCEL'
}

export type FrequencyFields = {
  periodicity_mode: keyof typeof PeriodicityEnum;
  payment_mode: keyof typeof PaymentEnum;
  due_date: Date;
  duration?: number;
  period_date?: Date[];
};

export type ExpenseFields = ExpenseInfoFields & BudgetFields & FrequencyFields;

export const defaultValues: ExpenseFields = {
  type: 'EXPENSE',
  amount: 0,
  payment_mode: PaymentEnum.PARCEL,
  periodicity_mode: PeriodicityEnum.ONCE,
  name: '',
  note: '',
  due_date: dayjs().toDate(),
  budget: {} as BudgetFields['budget'],
  duration: 1,
  period_date: []
};

export const createSchema = z.object({
  type: z.string(),
  amount: z
    .number({
      invalid_type_error: 'O valor deve ser um número'
    })
    .refine((value) => value > 0, {
      message: 'O valor deve ser maior que 0'
    }),
  payment_mode: z.string(),
  periodicity_mode: z.string(),
  name: z
    .string({
      required_error: 'Nome obrigatório',
      invalid_type_error: 'O nome deve ser uma string'
    })
    .refine((value) => value.trim().length > 0, {
      message: 'O nome não pode ser vazio'
    }),
  note: z.string().trim(),
  due_date: z
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
  budget: z.nullable(
    z.object({
      name: z
        .string({
          required_error: 'O orçamento deve ser informado'
        })
        .refine((value) => value.trim().length > 0, {
          message: 'O orçamento não pode ser vazio'
        }),
      id: z.string()
    })
  ),
  duration: z.optional(z.number())
});
