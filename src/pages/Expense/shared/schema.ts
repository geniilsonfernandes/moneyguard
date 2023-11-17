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

export enum PeriodicityEnum {
  onlyMode = 'onlyMode',
  monthMode = 'monthMode',
  fixedMode = 'fixedMode',
  fixed = 'fixed',
  repeat = 'repeat',
  only = 'only'
}

export enum PaymentEnum {
  all = 'all',
  parcel = 'parcel'
}

export type FrequencyFields = {
  periodicityMode: keyof typeof PeriodicityEnum;
  paymentMode: keyof typeof PaymentEnum;
  date?: Date;
  duration?: number;
};

export type ExpenseFields = ExpenseInfoFields & BudgetFields & FrequencyFields;

export const defaultValues: ExpenseFields = {
  type: 'expense',
  value: 0,
  paymentMode: PaymentEnum.parcel,
  periodicityMode: PeriodicityEnum.only,
  name: '',
  note: '',
  date: dayjs().toDate(),
  budget: {} as BudgetFields['budget'],
  duration: 3
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
  paymentMode: z.string(),
  periodicityMode: z.string(),
  name: z
    .string({
      required_error: 'Nome obrigatório',
      invalid_type_error: 'O nome deve ser uma string'
    })
    .refine((value) => value.trim().length > 0, {
      message: 'O nome não pode ser vazio'
    }),
  note: z.string().trim(),
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
  duration: z.optional(z.number())
});
