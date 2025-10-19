import * as z from 'zod';

export const signInSchema = z.object({
  email: z.email('Please enter a valid email address'),
  password: z.string(),
});

export const signUpSchema = z
  .object({
    name: z.string().min(1, 'Name is required').max(100),
    email: z.email('Please enter a valid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords must match',
  });

export type SignInInput = z.infer<typeof signInSchema>;
export type SignUpInput = z.infer<typeof signUpSchema>;
