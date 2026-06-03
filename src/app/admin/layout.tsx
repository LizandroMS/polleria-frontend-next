import { AdminHeader } from '@/components/admin/admin-header';
import { AdminSidebar } from '@/components/admin/admin-sidebar';
import { RequireAdmin } from '@/components/auth/require-admin';

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <RequireAdmin>
      <div className="page-shell">
        <AdminHeader />
        <div className="app-container grid gap-6 py-6 lg:grid-cols-[280px_1fr]">
          <AdminSidebar />
          <main className="min-w-0">{children}</main>
        </div>
      </div>
    </RequireAdmin>
  );
}
