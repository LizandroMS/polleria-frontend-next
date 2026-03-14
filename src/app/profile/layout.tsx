import { RequireCustomer } from '@/components/auth/require-customer';
import { Footer } from '@/components/shared/footer';
import { Navbar } from '@/components/shared/navbar';

export default function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <RequireCustomer>
      <div
        className="min-h-screen"
        style={{
          background:
            'radial-gradient(circle at top left, #fff6eb 0%, #fffaf5 40%, #fffaf5 100%)',
        }}
      >
        <Navbar />
        <main className="app-container py-8">{children}</main>
        <Footer />
      </div>
    </RequireCustomer>
  );
}