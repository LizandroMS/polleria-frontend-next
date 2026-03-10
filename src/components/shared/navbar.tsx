import Link from 'next/link';

export function Navbar() {
  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-xl font-bold">
          Pollería App
        </Link>

        <nav className="flex gap-6 text-sm font-medium">
          <Link href="/">Inicio</Link>
          <Link href="/menu">Carta</Link>
          <Link href="/promociones">Promociones</Link>
          <Link href="/carrito">Carrito</Link>
          <Link href="/login">Ingresar</Link>
        </nav>
      </div>
    </header>
  );
}