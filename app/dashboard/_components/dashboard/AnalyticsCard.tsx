import {formatCurrency} from '@/app/utils';

interface AnalyticsCardProps {
  icon: any;
  title: string;
  value: number | undefined;
  type?: 'currency' | 'unitless';
}

export default function AnalyticsCard({
  icon,
  title,
  value,
  type = 'currency',
}: AnalyticsCardProps) {
  return (
    <div className="squircle p-4 rounded-2xl border border-gray-300">
      <div className="flex items-center gap-2 mb-8 text-gray-400">
        {icon}
        <p className=" text-xs">{title}</p>
      </div>

      <strong className="font-bold text-2xl text-foreground dark:text-background">
        {type === 'currency' ? formatCurrency(value ? value : 0) : value}
      </strong>
    </div>
  );
}
