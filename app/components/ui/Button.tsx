import {ButtonHTMLAttributes, DetailedHTMLProps} from 'react';
import {FcGoogle} from 'react-icons/fc';
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

type AddToCartButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> &
  MotionProps & {
    price: number;
    loading?: boolean;
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
          whileTap={btnWhileTap}
          className={`bg-black hover:opacity-90 transition-all text-white py-2 md:py-3 rounded-lg w-full font-bold text-sm md:text-base focus:outline-2 focus:outline-gray-300 ${className}`}
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
          className={`bg-[#F7F7FC] hover:opacity-90 transition-all text-black py-2 md:py-3 rounded-lg w-full font-bold text-sm md:text-base focus:outline-2 focus:outline-black ${className}`}
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
      <div className="w-[1.5em] h-[1.5em] border-[3.5px] border-white border-t-primary rounded-full animate-spin"></div>
    </div>
  );
}
