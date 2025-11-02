import prisma from '@/lib/prisma';
import {NextResponse} from 'next/server';

export async function DELETE(req: Request) {
  try {
    const {searchParams} = new URL(req.url);
    const transactionId = searchParams.get('transactionId') || undefined;

    const deletedTransaction = await prisma.transaction.delete({
      where: {
        id: transactionId,
      },
    });

    return NextResponse.json(
      {
        message: 'Expense added successfully',
        deletedTransaction,
      },
      {status: 200}
    );
  } catch (error: any) {
    return NextResponse.json(
      {error: 'Failed to delete expense'},
      {status: 500}
    );
  }
}
