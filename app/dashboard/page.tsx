'use client';

import {FaChartSimple} from 'react-icons/fa6';
import TabNav, {Tab} from '../components/TabNav';
import {useState} from 'react';
import {FiPlus} from 'react-icons/fi';
import ToggleDarkModeButton from '../components/ToggleDarkModeButton';
import {BiCoinStack} from 'react-icons/bi';
import Dashboard from './_components/dashboard/Dashboard';
import AddExpenseForm from './_components/add-expense-form/AddExpenseForm';
import {useUser} from '../hooks/auth/useUser';

const TABS: Tab[] = [
  {
    name: 'Dashboard',
    icon: <FaChartSimple />,
  },
  {
    name: 'Add Expense',
    icon: <FiPlus />,
  },
  {
    name: 'All Expenses',
    icon: <BiCoinStack />,
  },
];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<string>(TABS[0].name);
  const {data: user} = useUser();

  return (
    <main>
      <div className="w-[min(900px,90%)] mx-auto py-10 md:py:20">
        <header className="flex justify-between items-center mb-8">
          <h1 className="flex items-center gap-1">
            <FaChartSimple />
            Tracka
          </h1>

          <div className="flex items-center gap-5">
            <ToggleDarkModeButton />
            <span className="grid place-content-center w-4 h-4 p-4 aspect-square rounded-full bg-gray-300 text-foreground capitalize">
              {user?.name?.charAt(0)}
            </span>
          </div>
        </header>

        <TabNav tabs={TABS} activeTab={activeTab} setActiveTab={setActiveTab} />

        {activeTab === 'Dashboard' && <Dashboard setActiveTab={setActiveTab} />}
        {activeTab === 'Add Expense' && (
          <AddExpenseForm setActiveTab={setActiveTab} />
        )}
      </div>
    </main>
  );
}
