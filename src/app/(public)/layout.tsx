import { Footer } from '@/components/shared/footer';
import { Navbar } from '@/components/shared/navbar';

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50">{children}</main>
      <Footer />
    </>
  );
}