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
      <div
        className="min-h-screen"
        style={{
          background:
            'radial-gradient(circle at top left, #fff6eb 0%, #fffaf5 40%, #fffaf5 100%)',
        }}
      >
        <AdminHeader />

        <div className="app-container grid gap-6 py-6 lg:grid-cols-[280px_1fr]">
          <AdminSidebar />
          <main>{children}</main>
        </div>
      </div>
    </RequireAdmin>
  );
}