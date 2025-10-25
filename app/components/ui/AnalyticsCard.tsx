import {formatCurrency} from '@/app/utils';

interface AnalyticsCardProps {
  icon: any;
  title: string;
  value: number;
  type?: 'currency' | 'unitless';
}

export default function AnalyticsCard({
  icon,
  title,
  value,
  type = 'currency',
}: AnalyticsCardProps) {
  return (
    <div
      style={{
        // @ts-expect-error
        '--rad': '30px',
      }}
      className="squircle p-4 rounded-2xl border border-gray-300"
    >
      <div className="flex items-center gap-2 mb-8 text-gray-400">
        {icon}
        <p className=" text-xs">{title}</p>
      </div>

      <strong className="text-2xl text-foreground dark:text-background">
        {type === 'currency' ? formatCurrency(value) : value}
      </strong>
    </div>
  );
}
