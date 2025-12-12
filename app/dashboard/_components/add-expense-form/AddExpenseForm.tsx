import {Button} from '@/app/components/ui/Button';
import {FormInput} from '@/app/components/ui/FormInput';
import {Select} from '@/app/components/ui/Select';
import {useUser} from '@/app/hooks/auth/useUser';
import {AddExpensePayload, useExpense} from '@/app/hooks/expense/useExpense';
import {addExpenseSchema} from '@/validations/addExpense';
import {zodResolver} from '@hookform/resolvers/zod';
import {Dispatch, SetStateAction} from 'react';
import {useForm} from 'react-hook-form';
import {toast} from 'sonner';

const CATEGORY_OPTIONS = [
  {
    label: 'Food & Dining',
    value: 'Food & Dining',
  },
  {
    label: 'Transportation',
    value: 'Transportation',
  },
  {
    label: 'Shopping',
    value: 'Shopping',
  },
  {
    label: 'Entertainment',
    value: 'Entertainment',
  },
  {
    label: 'Bills & Utilities',
    value: 'Bills & Utilities',
  },
  {
    label: 'Healthcare',
    value: 'Healthcare',
  },
  {
    label: 'Travel',
    value: 'Travel',
  },
  {
    label: 'Education',
    value: 'Education',
  },
  {
    label: 'Other',
    value: 'Other',
  },
];

export default function AddExpenseForm({
  setActiveTab,
}: {
  setActiveTab: Dispatch<SetStateAction<string>>;
}) {
  const {data: user} = useUser();
  const {addExpense, isLoadingAddExpense} = useExpense();

  const {
    register,
    formState: {errors},
    handleSubmit,
    setValue,
  } = useForm({
    defaultValues: {
      amount: null,
      category: CATEGORY_OPTIONS[0].value,
      date: new Date().toISOString().split('T')[0],
      description: '',
      userId: user.id,
    },
    resolver: zodResolver(addExpenseSchema),
  });

  const onSubmit = (data: AddExpensePayload) => {
    addExpense({
      payload: {...data, date: new Date(data.date).toISOString()},
      options: {
        onSuccess(data) {
          toast.success(data.message);
          setActiveTab('Dashboard');
        },
        onError(error) {
          toast.error(error.message);
        },
      },
    });
  };

  return (
    <div>
      <h1 className="text-base my-7">Add Expense</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid md:grid-cols-2 gap-5 mb-5">
          <FormInput
            label="Amount"
            type="number"
            placeholder="0.00"
            inputMode="numeric"
            {...register('amount', {valueAsNumber: true})}
            error={errors.amount?.message?.toString()}
          />
          <Select
            label="Category"
            placeholder="Select category"
            options={CATEGORY_OPTIONS}
            onChange={(event) => {
              setValue('category', event.target.value);
            }}
            error={errors.category?.message?.toString()}
          />
        </div>

        <div className="mb-5">
          <FormInput
            label="Date"
            type="date"
            {...register('date')}
            error={errors.date?.message?.toString()}
          />
        </div>

        <div className="mb-5 text-xs md:text-sm">
          <label
            htmlFor="description"
            className="font-semibold text-foreground dark:text-background block mb-1"
          >
            Description
          </label>
          <textarea
            spellCheck
            id="description"
            placeholder="Enter expense description"
            {...register('description')}
            className={`squircle w-full bg-gray-100 dark:bg-transparent border border-gray-300 rounded-lg px-4 py-2 md:py-3 focus-within:outline-solid focus-within:outline-2 focus-within:outline-gray-300 grid gap-2 items-center text-xs md:text-sm max-h-[200px] ${
              errors.description ? 'shake' : ''
            }`}
          ></textarea>
          {errors.description && (
            <small className="text-red-500 text-xs">
              {errors.description?.message?.toString()}
            </small>
          )}
        </div>

        <div className="mt-8 grid sm:grid-cols-[85%_1fr] gap-4">
          <Button
            label="Add Expense"
            type="submit"
            className="!text-sm !font-normal"
            loading={isLoadingAddExpense}
          />
          <Button
            label="Cancel"
            variant="secondary"
            type="button"
            className="!text-sm !font-normal"
            onClick={() => setActiveTab('Dashboard')}
          />
        </div>
      </form>
    </div>
  );
}
