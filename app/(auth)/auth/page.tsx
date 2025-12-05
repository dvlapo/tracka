'use client';
import TabNav, {Tab} from '@/app/components/TabNav';
import {motion} from 'motion/react';
import {useState} from 'react';
import {FaChartSimple} from 'react-icons/fa6';
import SignInForm from './components/SignInForm';
import SignUpForm from './components/SignUpForm';
import useDarkMode from '@/app/hooks/useDarkMode';

const TABS: Tab[] = [
  {
    name: 'Sign In',
  },
  {
    name: 'Sign Up',
  },
];

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState<string>(TABS[0].name);
  useDarkMode();
  return (
    <div className="my-[15vh] w-[min(90%,450px)] mx-auto">
      <h1 className="flex justify-center items-center mb-3 gap-2 text-2xl">
        <FaChartSimple />
        Tracka
      </h1>
      <p className="text-center mb-5 text-gray-500">
        {activeTab === 'Sign In' && (
          <motion.span
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
          >
            Welcome back! Sign in to your account
          </motion.span>
        )}

        {activeTab === 'Sign Up' && (
          <motion.span
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
          >
            Create an account to get started
          </motion.span>
        )}
      </p>
      <section className="squircle bg-background dark:bg-foreground px-4 py-6 inset-shadow-2xs shadow-lg rounded-lg">
        <TabNav tabs={TABS} activeTab={activeTab} setActiveTab={setActiveTab} />

        {activeTab === 'Sign In' && <SignInForm />}
        {activeTab === 'Sign Up' && <SignUpForm setActiveTab={setActiveTab} />}
      </section>
    </div>
  );
}
