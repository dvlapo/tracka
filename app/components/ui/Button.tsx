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
          className={`squircle bg-foreground hover:opacity-90 transition-opacity text-background py-2.5 rounded-lg w-full font-bold text-sm md:text-base focus:outline-2 focus:outline-gray-300 ${className}`}
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
          className={`bg-[#F7F7FC] hover:opacity-90 transition-opacity text-foreground py-2.5 rounded-lg w-full font-bold text-sm md:text-base focus:outline-2 focus:outline-foreground ${className}`}
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
