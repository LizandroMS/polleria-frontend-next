import Link from 'next/link';

export function CheckoutAuthRequired() {
  return (
    <div className="rounded-2xl border bg-white p-5">
      <h3 className="text-lg font-semibold">Debes ingresar para continuar</h3>
      <p className="mt-2 text-sm text-gray-600">
        Tu carrito no se perderá. Luego del login o registro continuaremos con tu compra.
      </p>

      <div className="mt-4 flex gap-3">
        <Link href="/login" className="rounded-xl bg-black px-4 py-2 text-white">
          Iniciar sesión
        </Link>
        <Link href="/registro" className="rounded-xl border px-4 py-2">
          Registrarme
        </Link>
      </div>
    </div>
  );
}