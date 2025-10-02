import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="text-6xl font-bold tracking-tight text-foreground">
          Hello, world!
        </h1>
        <div className="flex flex-col items-center justify-center">
        <Link
          href="/test-math"
          className="text-xl text-blue-500 hover:underline"
        >
          Go to Test Math Page
        </Link>
        <Link
          href="/test-common"
          className="text-xl text-blue-500 hover:underline"
        >
          Go to Test Common Page
        </Link>
        </div>
      </div>
    </main>
  );
}
