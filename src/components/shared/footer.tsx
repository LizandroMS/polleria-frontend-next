export function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="text-lg font-bold text-gray-900">Pollería App</h3>
            <p className="mt-3 text-sm leading-6 text-gray-600">
              Pedidos rápidos, promociones activas y una experiencia moderna para tus clientes.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-gray-900">
              Navegación
            </h4>
            <div className="mt-3 space-y-2 text-sm text-gray-600">
              <p>Inicio</p>
              <p>Carta</p>
              <p>Promociones</p>
              <p>Carrito</p>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-gray-900">
              Atención
            </h4>
            <div className="mt-3 space-y-2 text-sm text-gray-600">
              <p>Pedidos por delivery</p>
              <p>Recojo en tienda</p>
              <p>Promociones por sucursal</p>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t pt-6 text-sm text-gray-500">
          © 2026 Pollería App. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}