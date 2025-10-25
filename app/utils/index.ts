export function formatCurrency(value: number) {
  const num = Number(value);
  if (Number.isNaN(num)) return value;

  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}
