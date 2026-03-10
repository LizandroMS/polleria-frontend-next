type Props = {
  data: {
    order: any;
    items: any[];
    history: any[];
  };
};

export function OrderDetail({ data }: Props) {
  return (
    <div className="space-y-6">
      <section className="rounded-2xl border bg-white p-5">
        <h2 className="text-xl font-semibold">{data.order.order_number}</h2>
        <p className="mt-2 text-sm text-gray-600">Estado: {data.order.status}</p>
        <p className="mt-1 text-sm text-gray-600">Total: S/ {data.order.total}</p>
        <p className="mt-1 text-sm text-gray-600">Cliente: {data.order.customer_name_snapshot}</p>
      </section>

      <section className="rounded-2xl border bg-white p-5">
        <h3 className="text-lg font-semibold">Productos</h3>
        <div className="mt-4 space-y-3">
          {data.items.map((item) => (
            <div key={item.id} className="flex justify-between border-b pb-3">
              <div>
                <p className="font-medium">{item.product_name_snapshot}</p>
                <p className="text-sm text-gray-600">Cantidad: {item.quantity}</p>
              </div>
              <div className="text-sm">S/ {item.subtotal}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border bg-white p-5">
        <h3 className="text-lg font-semibold">Historial</h3>
        <div className="mt-4 space-y-3">
          {data.history.map((row) => (
            <div key={row.id} className="border-b pb-3">
              <p className="font-medium">{row.status}</p>
              {row.comment ? <p className="text-sm text-gray-600">{row.comment}</p> : null}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}