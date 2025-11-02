import {NextResponse} from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: Request) {
  try {
    const {searchParams} = new URL(req.url);
    const userId = searchParams.get('userId');

    if (!userId)
      return NextResponse.json({error: 'Missing userId'}, {status: 400});

    const transactions = await prisma.transaction.findMany({
      where: {userId},
      orderBy: {date: 'desc'},
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

    return NextResponse.json(transactions, {status: 200});
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {error: 'Failed to fetch expenses'},
      {status: 500}
    );
  }
}
