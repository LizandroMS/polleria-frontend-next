type Column<T> = {
  key: string;
  title: string;
  render: (row: T) => React.ReactNode;
};

type Props<T> = {
  columns: Column<T>[];
  rows: T[];
};

export function SimpleAdminTable<T>({ columns, rows }: Props<T>) {
  return (
    <div className="admin-table-card">
      <div className="flex items-center justify-between gap-4 border-b px-5 py-4" style={{ borderColor: 'var(--border-soft)' }}>
        <div>
          <p className="text-sm font-bold" style={{ color: 'var(--dark)' }}>
            Registros
          </p>
          <p className="text-xs" style={{ color: 'var(--text-soft)' }}>
            {rows.length} elemento{rows.length === 1 ? '' : 's'} encontrado{rows.length === 1 ? '' : 's'}
          </p>
        </div>
        <span className="status-pill">Panel admin</span>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead style={{ background: 'linear-gradient(135deg, #fff4e9, #fffaf5)' }}>
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="px-5 py-4 text-left text-xs font-extrabold uppercase tracking-wide"
                  style={{ color: 'var(--dark)' }}
                >
                  {column.title}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {rows.length ? (
              rows.map((row, index) => (
                <tr
                  key={index}
                  className="border-t transition hover:bg-[#fffaf5]"
                  style={{ borderColor: 'var(--border-soft)' }}
                >
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className="px-5 py-4 text-sm align-middle"
                      style={{ color: 'var(--text-main)' }}
                    >
                      {column.render(row)}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="px-5 py-12">
                  <div className="text-center">
                    <div
                      className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full"
                      style={{ background: 'var(--primary-soft)', color: 'var(--primary)' }}
                    >
                      ∅
                    </div>
                    <p className="text-sm font-semibold" style={{ color: 'var(--dark)' }}>
                      No hay registros para mostrar
                    </p>
                    <p className="mt-1 text-xs" style={{ color: 'var(--text-soft)' }}>
                      Cuando registres información aparecerá en esta tabla.
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
