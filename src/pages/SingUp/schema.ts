import { z } from 'zod';

const createUserSchema = z
  .object({
    name: z
      .string()
      .min(1, 'O nome deve ser informado')
      .refine(
        (value) => {
          const words = value.trim().split(/\s+/);
          return words.length > 1;
        },
        {
          message: 'O sobrenome deve ser informado'
        }
      ),
    email: z
      .string({
        required_error: 'O e-mail deve ser informado'
      })
      .email({
        message: 'O e-mail deve ser informado'
      }),
    password: z
      .string()
      .min(6, 'A senha deve ter pelo menos 6 caracteres')
      .refine((value) => /[A-Z]/.test(value), {
        message: 'A senha deve conter pelo menos uma letra maiúscula'
      })
      .refine((value) => /[\W_]/.test(value), {
        message: 'A senha deve conter pelo menos um caractere especial'
      })
      .refine((value) => /[0-9]/.test(value), {
        message: 'A senha deve conter pelo menos um número'
      }),
    confirmPassword: z
      .string()
      .min(6, 'A senha deve ter pelo menos 6 caracteres')
      .refine((value) => /[A-Z]/.test(value), {
        message: 'A senha deve conter pelo menos uma letra maiúscula'
      })
      .refine((value) => /[\W_]/.test(value), {
        message: 'A senha deve conter pelo menos um caractere especial'
      })
      .refine((value) => /[0-9]/.test(value), {
        message: 'A senha deve conter pelo menos um número'
      }),
    monthlyBudget: z.number().refine((value) => value > 0, {
      message: 'O limite deve ser maior que 0'
    })
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas devem ser iguais',
    path: ['confirmPassword']
  });

export { createUserSchema };
