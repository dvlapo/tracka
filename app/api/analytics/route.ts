import {NextResponse} from 'next/server';
import prisma from '@/lib/prisma';
import {startOfMonth, endOfMonth, subDays} from 'date-fns';

export async function GET(req: Request) {
  try {
    const {searchParams} = new URL(req.url);
    const userId = searchParams.get('userId');
    if (!userId)
      return NextResponse.json({error: 'Missing userId'}, {status: 400});

    // All user transactions
    const transactions = await prisma.transaction.findMany({
      where: {userId},
    });

    if (!transactions.length) {
      return NextResponse.json({
        totalExpenses: 0,
        thisMonthExpenses: 0,
        totalCategories: 0,
        spendingByCategory: [],
        dailySpending: [],
      });
    }

    // Total expenses
    const totalExpenses = transactions.reduce((sum, t) => sum + t.amount, 0);

    // This month’s expenses
    const now = new Date();
    const monthStart = startOfMonth(now);
    const monthEnd = endOfMonth(now);
    const thisMonthExpenses = transactions
      .filter((t) => t.date >= monthStart && t.date <= monthEnd)
      .reduce((sum, t) => sum + t.amount, 0);

    // Unique category count
    const uniqueCategories = new Set(
      transactions.map((t) => t.category || 'Other')
    );
    const totalCategories = uniqueCategories.size;

    // Spending by category
    const spendingByCategoryMap: Record<string, number> = {};
    for (const t of transactions) {
      const name = t.category || 'Other';
      spendingByCategoryMap[name] =
        (spendingByCategoryMap[name] || 0) + t.amount;
    }
    const spendingByCategory = Object.entries(spendingByCategoryMap).map(
      ([category, total]) => ({
        category,
        total,
        percentage: (total / totalExpenses) * 100,
      })
    );

    // Spending in last 7 days
    const last7Days = subDays(now, 6);
    const dailyMap: Record<string, number> = {};
    for (let i = 0; i < 7; i++) {
      const d = subDays(now, i);
      dailyMap[d.toISOString().slice(0, 10)] = 0;
    }

    for (const t of transactions) {
      const dateKey = t.date.toISOString().slice(0, 10);
      if (t.date >= last7Days) {
        dailyMap[dateKey] = (dailyMap[dateKey] || 0) + t.amount;
      }
    }

    const dailySpending = Object.entries(dailyMap)
      .sort(([a], [b]) => new Date(a).getTime() - new Date(b).getTime())
      .map(([date, total]) => ({date, total}));

    return NextResponse.json({
      totalExpenses,
      thisMonthExpenses,
      totalCategories,
      spendingByCategory,
      dailySpending,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({error: 'Internal Server Error'}, {status: 500});
  }
}
