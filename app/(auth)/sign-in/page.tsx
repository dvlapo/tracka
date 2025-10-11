'use client';

export default function SignInPage() {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto mt-10 p-6 border rounded"
      >
        <h1 className="text-2xl font-bold mb-4">Sign In</h1>
      </form>
    </div>
  );
}
