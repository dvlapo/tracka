import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {useUser} from '../auth/useUser';

export interface AddExpensePayload {
  amount: number | null;
  category: string;
  date: string;
  description: string;
  userId: string;
}

interface Expense {
  id: string;
  description: string;
  amount: number;
  date: string;
  category: string;
  userId: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}
const BASE_URL = process.env.NEXT_PUBLIC_DATABASE_URL;

export const useExpense = () => {
  const queryClient = useQueryClient();
  const {data: user} = useUser();
  const userId = user?.id;

  const getAllExpensesQuery = useQuery({
    queryKey: ['all-expenses', userId],
    queryFn: async () => {
      try {
        const res = await fetch(`/${BASE_URL}/api/expenses?userId=${userId}`);

        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(errorText || 'Failed to fetch expenses');
        }

        const data = await res.json();
        return data as Expense[];
      } catch (error: any) {
        throw new Error(
          error?.message || 'An unexpected network error occurred'
        );
      }
    },
  });

  const addExpenseMutation = useMutation({
    mutationFn: async (payload: AddExpensePayload) => {
      try {
        const res = await fetch(`/${BASE_URL}/api/expenses/add`, {
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

  const deleteExpenseMutation = useMutation({
    mutationFn: async (id: string) => {
      try {
        const res = await fetch(
          `/${BASE_URL}/api/expenses/delete?transactionId=${id}`,
          {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || 'Failed to delete expense');
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
        queryClient.invalidateQueries({
          queryKey: ['all-expenses', data.transaction.user.id],
        });
      },
      onError(error) {
        options?.onError && options?.onError(error);
      },
    });
  };

  const deleteExpense = ({
    id,
    options,
  }: {
    id: string;
    options?: {
      onSuccess: (data: any) => void;
      onError?: (error: any) => void;
    };
  }) => {
    deleteExpenseMutation.mutate(id, {
      onSuccess(data) {
        options?.onSuccess && options?.onSuccess(data);
        queryClient.invalidateQueries({
          queryKey: ['dashboard-analytics', userId],
        });
        queryClient.invalidateQueries({
          queryKey: ['all-expenses', userId],
        });
      },
      onError(error) {
        options?.onError && options?.onError(error);
      },
    });
  };

  return {
    addExpense,
    isLoadingAddExpense: addExpenseMutation.isPending,
    allExpenses: getAllExpensesQuery.data,
    isLoadingExpenses: getAllExpensesQuery.isLoading,
    deleteExpense,
  };
};
