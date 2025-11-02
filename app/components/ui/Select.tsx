import {ChangeEvent, DetailedHTMLProps, SelectHTMLAttributes} from 'react';
import {PiCaretDownBold} from 'react-icons/pi';

type Props = DetailedHTMLProps<
  SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
> & {
  label?: string;
  options: {label: string; value: string}[];
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  placeholder?: string;
  className?: string;
  error?: string;
  icon?: any;
};

export function Select({
  label,
  options,
  onChange,
  placeholder,
  className,
  error,
  icon,
  ...props
}: Props) {
  return (
    <div>
      <label
        htmlFor={props.id}
        aria-label={label}
        className="mb-2 font-semibold text-foreground dark:text-background text-xs md:text-sm"
      >
        {label}
      </label>

      <div className="relative">
        <div
          className={`squircle w-full bg-gray-100 dark:bg-foreground border border-gray-300 rounded-lg px-4 py-2 md:py-3 focus-within:outline-solid focus-within:outline-2 focus-within:outline-gray-300 grid gap-2 items-center font-sans text-xs md:text-sm ${className}`}
        >
          <span className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
            {icon}
          </span>
          <select
            onChange={onChange}
            {...props}
            className={`appearance-none bg-gray-100 dark:bg-foreground text-foreground dark:text-background ${
              icon ? 'mx-5' : ''
            }`}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <PiCaretDownBold className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
      </div>
      {error && <small className="text-red-500">{error}</small>}
    </div>
  );
}
