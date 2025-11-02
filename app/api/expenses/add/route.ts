import prisma from '@/lib/prisma';
import {NextResponse} from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {amount, category, date, description, userId} = body;

    if (!amount || !category || !date) {
      return NextResponse.json(
        {error: 'Amount, category, and date are required'},
        {status: 400}
      );
    }

    const transaction = await prisma.transaction.create({
      data: {
        amount: parseFloat(amount),
        description,
        date: date ? new Date(date) : new Date(),
        category,
        userId,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    return NextResponse.json(
      {
        message: 'Expense added successfully',
        transaction,
      },
      {status: 201}
    );
  } catch (error: any) {
    return NextResponse.json({error: 'Failed to add expense'}, {status: 500});
  }
}
