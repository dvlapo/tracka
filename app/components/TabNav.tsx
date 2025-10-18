'use client';
import {Dispatch, SetStateAction, useEffect, useRef} from 'react';

type Tab = {
  name: string;
  icon?: any;
};

type TabNavProps = {
  activeTab: string;
  setActiveTab: Dispatch<SetStateAction<string>>;
  tabs: Tab[];
};
// reference: https://emilkowal.ski/ui/the-magic-of-clip-path

export default function TabNav({tabs, activeTab, setActiveTab}: TabNavProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const activeTabElementRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;

    if (activeTab && container) {
      const activeTabElement = activeTabElementRef.current;

      if (activeTabElement) {
        const {offsetLeft, offsetWidth} = activeTabElement;

        const clipLeft = offsetLeft;
        const clipRight = offsetLeft + offsetWidth;
        container.style.clipPath = `inset(0 ${Number(
          100 - (clipRight / container.offsetWidth) * 100
        ).toFixed()}% 0 ${Number(
          (clipLeft / container.offsetWidth) * 100
        ).toFixed()}% round 17px)`;
      }
    }
  }, [activeTab, activeTabElementRef, containerRef]);

  return (
    <div className="relative flex flex-col items-center w-full mx-auto bg-gray-200 dark:bg-gray-800 rounded-full py-1">
      <ul className="relative flex w-full justify-center gap-2 p-1.5 rounded-full">
        {tabs.map((tab) => (
          <li key={tab.name} className="w-full">
            <button
              ref={activeTab === tab.name ? activeTabElementRef : null}
              data-tab={tab.name}
              onClick={() => {
                setActiveTab(tab.name);
              }}
              className="w-full justify-center flex items-center gap-2 rounded-full px-4 text-sm text-foreground"
            >
              {/* {tab.icon} */}
              {tab.name}
            </button>
          </li>
        ))}
      </ul>

      <div
        aria-hidden
        className="absolute z-10 w-full overflow-hidden transition-[clip-path] duration-[0.25s]"
        ref={containerRef}
      >
        <ul className="relative flex w-full justify-center gap-2 bg-background p-1.5 rounded-full">
          {tabs.map((tab) => (
            <li key={tab.name} className="w-full">
              <button
                data-tab={tab.name}
                onClick={() => {
                  setActiveTab(tab.name);
                }}
                className="w-full justify-center flex items-center gap-2 rounded-full px-4 text-sm text-foreground"
                tabIndex={-1}
              >
                {tab.icon}
                {tab.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
