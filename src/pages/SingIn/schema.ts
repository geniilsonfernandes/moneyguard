import { z } from 'zod';

const createUserSchema = z.object({
  email: z
    .string({
      required_error: 'O e-mail deve ser informado'
    })
    .email({
      message: 'O e-mail deve ser informado'
    }),
  password: z.string({
    required_error: 'A senha deve ser informada'
  })
});

export { createUserSchema };
