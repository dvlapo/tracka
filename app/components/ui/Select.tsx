import {DetailedHTMLProps, SelectHTMLAttributes} from 'react';
import {PiCaretDownBold} from 'react-icons/pi';

type Props = DetailedHTMLProps<
  SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
> & {
  label?: string;
  options: {label: string; value: string}[];
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  error?: string;
};

export function Select({
  label,
  options,
  onChange,
  placeholder,
  className,
  error,
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
        <select
          onChange={onChange}
          {...props}
          className={`squircle w-full bg-gray-100 dark:bg-foreground text-foreground dark:text-background border border-gray-300 rounded-lg px-4 py-2 md:py-3 focus-within:outline-solid focus-within:outline-2 focus-within:outline-gray-300 grid gap-2 items-center appearance-none font-sans text-xs md:text-sm ${className}`}
        >
          <option value="" disabled>
            {placeholder || 'Select an option'}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <PiCaretDownBold className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
      </div>
      {error && <small className="text-red-500">{error}</small>}
    </div>
  );
}
