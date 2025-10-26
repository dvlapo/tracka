'use client';

import {FaChartSimple, FaList} from 'react-icons/fa6';
import TabNav, {Tab} from '../components/TabNav';
import {useState} from 'react';
import {FiPlus} from 'react-icons/fi';
import {Button} from '../components/ui/Button';
import ToggleDarkModeButton from '../components/ToggleDarkModeButton';
import Analytics from './_components/Analytics';

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
            <span className="grid place-content-center w-4 h-4 p-4 aspect-square rounded-full bg-gray-300 text-foreground">
              D
            </span>
          </div>
        </header>

        <TabNav tabs={TABS} activeTab={activeTab} setActiveTab={setActiveTab} />

        <section className="my-7 md:flex justify-between items-start">
          <div className="mb-4 md:mb-0">
            <h2 className="mb-1 text-base">Tracka</h2>
            <p className="text-sm text-gray-400">
              Track your spending and stay within budget
            </p>
          </div>

          <Button
            label="Add Expense"
            icon={<FiPlus />}
            className="!text-sm !font-normal !px-2 !py-1 !w-fit"
          />
        </section>

        {activeTab === 'Dashboard' && <Analytics />}
      </div>
    </main>
  );
}
