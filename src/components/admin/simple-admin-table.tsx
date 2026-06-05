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
    <div
      className="overflow-hidden rounded-[28px] border shadow-sm"
      style={{
        background: 'rgba(255,255,255,0.92)',
        borderColor: 'var(--border-soft)',
      }}
    >
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead style={{ background: '#fcf4ea' }}>
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="px-5 py-4 text-left text-sm font-bold"
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
                  className="border-t"
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
                <td
                  colSpan={columns.length}
                  className="px-5 py-10 text-center text-sm"
                  style={{ color: 'var(--text-soft)' }}
                >
                  No hay registros para mostrar.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}