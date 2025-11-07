'use client';

import {FaChartSimple} from 'react-icons/fa6';
import TabNav, {Tab} from '../components/TabNav';
import {useState} from 'react';
import {FiPlus} from 'react-icons/fi';
import ToggleDarkModeButton from '../components/ToggleDarkModeButton';
import {BiCoinStack} from 'react-icons/bi';
import Dashboard from './_components/dashboard/Dashboard';
import AddExpenseForm from './_components/add-expense-form/AddExpenseForm';
import AllExpenses from './_components/all-expenses/AllExpenses';
import ProfileDropdown from './_components/dashboard/ProfileDropdown';

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

  return (
    <main>
      <div className="w-[min(900px,90%)] mx-auto py-10 lg:py-20">
        <header className="flex justify-between items-center mb-8">
          <h1 className="flex items-center gap-1">
            <FaChartSimple />
            Tracka
          </h1>

          <div className="flex items-center gap-5 relative">
            <ToggleDarkModeButton />
            <ProfileDropdown />
          </div>
        </header>

        <TabNav tabs={TABS} activeTab={activeTab} setActiveTab={setActiveTab} />

        {activeTab === 'Dashboard' && <Dashboard setActiveTab={setActiveTab} />}
        {activeTab === 'Add Expense' && (
          <AddExpenseForm setActiveTab={setActiveTab} />
        )}
        {activeTab === 'All Expenses' && (
          <AllExpenses setActiveTab={setActiveTab} />
        )}
      </div>
    </main>
  );
}
