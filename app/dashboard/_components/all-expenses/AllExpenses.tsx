import {Button} from '@/app/components/ui/Button';
import {Select} from '@/app/components/ui/Select';
import {CATEGORY_COLORS} from '@/app/constants';
import {useExpense} from '@/app/hooks/expense/useExpense';
import {formatCurrency} from '@/app/utils';
import {format} from 'date-fns';
import {Dispatch, SetStateAction, useMemo, useState} from 'react';
import {FiFilter, FiPlus, FiSearch} from 'react-icons/fi';
import {IoTrashOutline} from 'react-icons/io5';

const SORT_OPTIONS = [
  {
    label: 'Date',
    value: 'date',
  },
  {
    label: 'Amount',
    value: 'amount',
  },
  {
    label: 'Category',
    value: 'category',
  },
];

export default function AllExpenses({
  setActiveTab,
}: {
  setActiveTab: Dispatch<SetStateAction<string>>;
}) {
  const [sortOption, setSortOption] = useState(SORT_OPTIONS[0].value);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const {allExpenses} = useExpense();
  const [searchInput, setSearchInput] = useState('');

  const categories = useMemo(() => {
    if (!allExpenses || allExpenses.length === 0)
      return [{label: 'All', value: 'all'}];

    const unique = new Set(
      allExpenses.map((expense: any) => expense.category).filter(Boolean)
    );

    const formatted = Array.from(unique).map((cat: any) => ({
      label: cat,
      value: cat.toLowerCase().replace(/\s+/g, '-'),
    }));

    return [{label: 'All categories', value: 'all'}, ...formatted];
  }, [allExpenses]);

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

      <div className="grid md:flex gap-4 my-6">
        <div className="squircle flex-1 w-full border border-gray-300 rounded-lg px-4 py-2 md:py-3 flex items-center gap-3 focus-visible:outline-1 focus-within:outline-gray-300">
          <FiSearch />
          <input
            type="text"
            placeholder="Search expenses"
            defaultValue={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
            className="text-sm w-full border-none outline-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Select
            icon={<FiFilter />}
            options={categories}
            onChange={(event) => setSelectedCategory(event.target.value)}
          />
          <Select
            options={SORT_OPTIONS}
            onChange={(event) => setSortOption(event.target.value)}
          />
        </div>
      </div>

      <ul>
        {allExpenses
          ?.filter((expense) => {
            if (!searchInput) return true;
            return expense.description
              ?.toLowerCase()
              .includes(searchInput.toLowerCase());
          })
          ?.map((expense) => (
            <li key={expense.id} className="mb-3">
              <div className="p-3 squircle flex justify-between items-center border border-gray-300 rounded-lg">
                <div>
                  <div className="flex gap-2 items-center">
                    <p className="text-sm">{expense.description}</p>
                    <span
                      style={{
                        color: CATEGORY_COLORS[expense.category],
                        backgroundColor: `${
                          CATEGORY_COLORS[expense.category]
                        }30`,
                      }}
                      className={`squircle rounded-full text-[10px] px-2 py-0.5`}
                    >
                      {expense.category}
                    </span>
                  </div>
                  <span className="text-xs text-gray-400">
                    {format(expense.date, 'MMM dd, yyyy')}
                  </span>
                </div>

                <div className="flex gap-4 items-center">
                  <strong>{formatCurrency(expense.amount)}</strong>
                  <button type="button">
                    <IoTrashOutline className="text-red-500" />
                  </button>
                </div>
              </div>
            </li>
          ))}
      </ul>
    </section>
  );
}
