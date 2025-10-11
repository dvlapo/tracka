import prisma from '@/lib/prisma';
import bcrypt from 'bcrypt';

export async function POST(req: Request) {
  try {
    const {email, password} = await req.json();
    if (!email || !password) {
      return Response.json(
        {error: 'Email and password are required'},
        {status: 400}
      );
    }

    const user = await prisma.user.findUnique({
      where: {email},
    });
    if (!user) {
      return Response.json({error: 'Invalid credentials'}, {status: 401});
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return Response.json({error: 'Invalid credentials'}, {status: 401});
    }

    // ✅ Successful login — exclude password from response
    const {password: _, ...userData} = user;

    return Response.json(
      {message: 'Sign-in successful', data: {user: userData}},
      {status: 200}
    );
  } catch (error) {
    return Response.json({error: 'Internal server error'}, {status: 500});
  }
}
