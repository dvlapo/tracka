import * as z from 'zod';

export const addExpenseSchema = z.object({
  amount: z.union([
    z.number('Please enter an amount'),
    z.null('Please enter an amount'),
  ]),
  category: z.string(),
  date: z.string(),
  description: z
    .string('Please describe this expense entry')
    .min(
      5,
      'Please enter a description for this expense entry with a minimum of 5 chars'
    ),
  userId: z.string(),
});

export type AddExpenseInput = z.infer<typeof addExpenseSchema>;
