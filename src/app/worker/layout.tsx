import { RequireWorker } from '@/components/auth/require-worker';
import { WorkerHeader } from '@/components/worker/worker-header';

export default function WorkerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <RequireWorker>
      <div
        className="min-h-screen"
        style={{
          background:
            'radial-gradient(circle at top left, #fff6eb 0%, #fffaf5 40%, #fffaf5 100%)',
        }}
      >
        <WorkerHeader />
        <main className="app-container py-8">{children}</main>
      </div>
    </RequireWorker>
  );
}