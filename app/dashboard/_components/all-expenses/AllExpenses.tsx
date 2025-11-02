import {Button} from '@/app/components/ui/Button';
import {useExpense} from '@/app/hooks/expense/useExpense';
import {Dispatch, SetStateAction} from 'react';
import {FiPlus} from 'react-icons/fi';

export default function AllExpenses({
  setActiveTab,
}: {
  setActiveTab: Dispatch<SetStateAction<string>>;
}) {
  const {allExpenses} = useExpense();
  console.log(allExpenses);
  return (
    <section className="my-7">
      <header className="flex justify-between items-start">
        <h2 className="tex-base">All Expenses</h2>

        <Button
          label="Add Expense"
          icon={<FiPlus />}
          className="!text-sm !font-normal !px-2 !py-1 !w-fit"
          onClick={() => setActiveTab('Add Expense')}
        />
      </header>
    </section>
  );
}
