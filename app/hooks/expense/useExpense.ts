import {useMutation} from '@tanstack/react-query';

export interface AddExpensePayload {
  amount: number | null;
  category: string;
  date: string;
  description: string;
  userId: string;
}

export const useExpense = () => {
  const addExpenseMutation = useMutation({
    mutationFn: async (payload: AddExpensePayload) => {
      try {
        const res = await fetch('/api/expense/add-expense', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || 'Failed to add expense');
        }

        return data;
      } catch (error: any) {
        throw new Error(
          error?.message || 'An unexpected network error occurred'
        );
      }
    },
  });

  return {
    addExpenseMutation,
  };
};
