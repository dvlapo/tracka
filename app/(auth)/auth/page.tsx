'use client';
import TabNav from '@/app/components/TabNav';
import {motion} from 'motion/react';
import {useState} from 'react';
import {FaChartSimple} from 'react-icons/fa6';
import SignInForm from './components/SignInForm';
import SignUpForm from './components/SignUpForm';

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState(TABS[0].name);

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
      <section className="bg-background px-4 py-6 border-[0.5px] border-gray-300 rounded-lg ">
        <TabNav tabs={TABS} activeTab={activeTab} setActiveTab={setActiveTab} />

        {activeTab === 'Sign In' && <SignInForm />}
        {activeTab === 'Sign Up' && <SignUpForm />}
      </section>
    </div>
  );
}

const TABS: {
  name: string;
  icon?: any;
}[] = [
  {
    name: 'Sign In',
    // icon: (
    //   <svg
    //     data-testid="primary-nav-item-icon"
    //     aria-hidden="true"
    //     width="16"
    //     height="16"
    //     viewBox="0 0 16 16"
    //     fill="none"
    //     xmlns="http://www.w3.org/2000/svg"
    //   >
    //     <path
    //       fill="currentColor"
    //       d="M1 2a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 1 2Zm0 8a.75.75 0 0 1 .75-.75h5a.75.75 0 0 1 0 1.5h-5A.75.75 0 0 1 1 10Zm2.25-4.75a.75.75 0 0 0 0 1.5h7.5a.75.75 0 0 0 0-1.5h-7.5ZM2.5 14a.75.75 0 0 1 .75-.75h4a.75.75 0 0 1 0 1.5h-4A.75.75 0 0 1 2.5 14Z"
    //     ></path>
    //     <path
    //       fillRule="evenodd"
    //       clipRule="evenodd"
    //       fill="currentColor"
    //       d="M16 11.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Zm-1.5 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"
    //     ></path>
    //   </svg>
    // ),
  },
  {
    name: 'Sign Up',
    // icon: (
    //   <svg
    //     aria-hidden="true"
    //     width="16"
    //     height="16"
    //     viewBox="0 0 16 16"
    //     fill="none"
    //     xmlns="http://www.w3.org/2000/svg"
    //   >
    //     <path
    //       fillRule="evenodd"
    //       clipRule="evenodd"
    //       fill="currentColor"
    //       d="M2.5 14.4h11a.4.4 0 0 0 .4-.4 3.4 3.4 0 0 0-3.4-3.4h-5A3.4 3.4 0 0 0 2.1 14c0 .22.18.4.4.4Zm0 1.6h11a2 2 0 0 0 2-2 5 5 0 0 0-5-5h-5a5 5 0 0 0-5 5 2 2 0 0 0 2 2ZM8 6.4a2.4 2.4 0 1 0 0-4.8 2.4 2.4 0 0 0 0 4.8ZM8 8a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
    //     ></path>
    //   </svg>
    // ),
  },
];
