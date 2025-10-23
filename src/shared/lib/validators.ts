import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "O e-mail é obrigatório.")
    .email("Formato de e-mail inválido."),
  password: z.string().min(1, "A senha é obrigatória."),
});

export const registerSchema = loginSchema
  .extend({
    confirmPassword: z.string().min(1, "Repita sua senha."),
    name: z.string().min(1, "O nome é obrigatório."),
  })
  .refine((data) => data.confirmPassword === data.password, {
    message: "As senhas não coincidem.",
    path: ["confirmPassword"],
  });

export type LoginFormValues = z.infer<typeof loginSchema>;
export type RegisterFormValues = z.infer<typeof registerSchema>;
