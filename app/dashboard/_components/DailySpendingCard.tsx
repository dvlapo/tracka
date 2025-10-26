export default function DailySpendingCard() {
  return (
    <div
      style={{
        // @ts-expect-error
        '--rad': '20px',
      }}
      className="squircle border border-gray-300 rounded-2xl"
    >
      <strong>Daily Spending (last 7 days)</strong>
    </div>
  );
}
