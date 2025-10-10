import prisma from '@/lib/prisma';

export default async function Home() {
  const users = await prisma.user.findMany();
  console.log(users);
  return (
    <div>
      <h1 className="text-4xl font-bold tracking-tighter">Tracka</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}
