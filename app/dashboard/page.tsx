'use client';

import {FaChartSimple, FaList} from 'react-icons/fa6';
import TabNav, {Tab} from '../components/TabNav';
import {useState} from 'react';
import {FiPlus} from 'react-icons/fi';
import useDarkMode from '../hooks/useDarkMode';

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
    icon: <FaList />,
  },
];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<string>(TABS[0].name);
  const {isDarkMode, toggleDarkMode} = useDarkMode();

  return (
    <main>
      <div className="w-[min(900px,90%)] mx-auto py-10 md:py:20">
        <header className="flex justify-between items-center mb-10">
          <h1 className="flex items-center gap-1">
            <FaChartSimple />
            Tracka
          </h1>

          <div className="flex items-center gap-5">
            <button onClick={toggleDarkMode} type="button">
              {isDarkMode ? 'Light' : 'Dark'}
            </button>
            <span className="grid place-content-center w-4 h-4 p-4 aspect-square rounded-full bg-gray-300 text-foreground">
              D
            </span>
          </div>
        </header>

        <TabNav tabs={TABS} activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    </main>
  );
}
