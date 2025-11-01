import {DetailedHTMLProps, InputHTMLAttributes} from 'react';

type Props = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  label?: string;
  leftIcon?: any;
  rightIcon?: any;
  error?: string;
};

export function FormInput({
  label,
  type = 'text',
  leftIcon,
  rightIcon,
  error,
  ...props
}: Props) {
  return (
    <div className="text-xs md:text-sm">
      <label
        htmlFor={props.id}
        aria-label={label}
        className="font-semibold text-foreground dark:text-background block mb-1"
      >
        {label}
      </label>
      <div
        style={{
          // @ts-expect-error
          '--rad': '20px',
        }}
        className={`squircle w-full bg-gray-100 dark:bg-transparent border border-gray-300 rounded-lg px-4 focus-within:outline-solid focus-within:outline-2 focus-within:outline-gray-300 grid gap-2 items-center ${
          rightIcon ? 'grid-cols-[1fr,20px]' : 'grid-cols-1'
        } ${error ? 'shake' : ''}`}
      >
        <div className="flex gap-2 items-center">
          {leftIcon}
          <input
            type={type}
            className="w-full border-none text-foreground dark:text-background bg-transparent outline-none placeholer-gray-1 py-2 md:py-3"
            onWheel={(e) => {
              if (type === 'number') {
                e.currentTarget.blur();
              }
            }}
            style={{
              // @ts-expect-error
              '--shadow-color': '#fff',
            }}
            {...props}
          />
          {rightIcon}
        </div>
      </div>
      {error && <small className="text-red-500 text-xs">{error}</small>}
    </div>
  );
}
