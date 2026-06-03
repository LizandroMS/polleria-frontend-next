import { RequireWorker } from '@/components/auth/require-worker';
import { WorkerHeader } from '@/components/worker/worker-header';

export default function WorkerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <RequireWorker>
      <div className="page-shell">
        <WorkerHeader />
        <main className="app-container py-8">{children}</main>
      </div>
    </RequireWorker>
  );
}
