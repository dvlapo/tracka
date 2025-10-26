export default function SpendingByCategory() {
  return (
    <div
      style={{
        // @ts-expect-error
        '--rad': '20px',
      }}
      className="squircle border border-gray-300 rounded-2xl"
    >
      <strong>Spending by Category</strong>
    </div>
  );
}
