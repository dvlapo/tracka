import prisma from '@/lib/prisma';
import bcrypt from 'bcrypt';

export async function POST(request: Request) {
  const {name, email, password} = await request.json();
  if (!name || !email || !password) {
    return Response.json(
      {error: 'Name, email, and password are required'},
      {status: 400}
    );
  }

  // Check if user with the same email already exists
  const existingUser = await prisma.user.findUnique({
    where: {email},
  });
  if (existingUser) {
    return Response.json(
      {error: 'User with this email already exists'},
      {status: 409}
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await prisma.user.create({
    data: {name, email, password: hashedPassword},
  });
  return Response.json(
    {
      message: 'User registered successfully',
      data: {
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
        },
      },
    },
    {status: 201}
  );
}
