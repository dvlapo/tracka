import {useMutation, useQueryClient} from '@tanstack/react-query';

export interface AddExpensePayload {
  amount: number | null;
  category: string;
  date: string;
  description: string;
  userId: string;
}

export const useExpense = () => {
  const queryClient = useQueryClient();

  const addExpenseMutation = useMutation({
    mutationFn: async (payload: AddExpensePayload) => {
      try {
        const res = await fetch('/api/expense/add', {
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

  const addExpense = ({
    payload,
    options,
  }: {
    payload: AddExpensePayload;
    options?: {
      onSuccess: (data: any) => void;
      onError?: (error: any) => void;
    };
  }) => {
    addExpenseMutation.mutate(payload, {
      onSuccess(data) {
        options?.onSuccess && options?.onSuccess(data);
        queryClient.invalidateQueries({
          queryKey: ['dashboard-analytics', data.transaction.user.id],
        });
      },
      onError(error) {
        options?.onError && options?.onError(error);
      },
    });
  };

  return {
    addExpense,
    isLoading: addExpenseMutation.isPending,
  };
};
