import {ButtonHTMLAttributes, DetailedHTMLProps} from 'react';
import {motion, MotionProps} from 'motion/react';

type Props = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> &
  MotionProps & {
    label?: string;
    icon?: any;
    loading?: boolean;
    variant?: 'primary' | 'secondary';
  };

const btnWhileTap = {
  scale: 0.95,
};

export function Button({
  label,
  loading,
  variant = 'primary',
  className,
  icon,
  ...props
}: Props) {
  switch (variant) {
    case 'primary':
      return (
        <motion.button
          style={{
            // @ts-expect-error
            '--rad': '20px',
          }}
          whileTap={btnWhileTap}
          className={`squircle bg-foreground dark:bg-background text-background dark:text-foreground hover:opacity-90 transition-opacity py-2.5 rounded-lg w-full font-semibold text-sm md:text-base focus-visible:outline-2 focus-visible:outline-gray-300 outline-offset-1 ${className}`}
          {...props}
        >
          {loading ? (
            <LoadingSpinner />
          ) : (
            <span className="flex justify-center items-center gap-1 text-nowrap pointer-events-none">
              {icon}
              {label}
            </span>
          )}
        </motion.button>
      );
    case 'secondary':
      return (
        <motion.button
          whileTap={btnWhileTap}
          className={`squircle bg-background dark:bg-foreground text-foreground dark:text-background hover:opacity-90 transition-opacity border border-gray-300 dark:border-gray-700 py-2.5 rounded-lg w-full font-semibold text-sm md:text-base focus-visible:outline-2 focus-visible:outline-gray-300 outline-offset-1 ${className}`}
          {...props}
        >
          {loading ? (
            <LoadingSpinner />
          ) : (
            <span className="flex justify-center items-center gap-1 text-nowrap">
              {icon}
              {label}
            </span>
          )}
        </motion.button>
      );
  }
}

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center">
      <div className="w-[1.5em] h-[1.5em] border-[3.5px] border-white border-t-black rounded-full animate-spin"></div>
    </div>
  );
}
