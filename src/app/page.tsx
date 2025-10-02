import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="text-6xl font-bold tracking-tight text-foreground">
          Hello, world!
        </h1>
        <Link href="/test-math">
          <a className="text-xl text-blue-500 hover:underline">
            Go to Test Math Page
          </a>
        </Link>
      </div>
    </main>
  );
}
