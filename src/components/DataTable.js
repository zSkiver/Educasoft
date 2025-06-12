import React from 'react';
import { useTable, usePagination, useSortBy } from 'react-table';
import './DataTable.css';

const DataTable = ({ columns, data, onEdit, onDelete, onView, onReactivate }) => {
  const showActions = onView || onEdit || onDelete || onReactivate;

  const tableColumns = React.useMemo(() => {
    if (!showActions) return columns;
    return [
      ...columns,
      {
        Header: 'Ações',
        id: 'actions',
        Cell: ({ row }) => (
          <div className="table-actions">
            {onView && (
              <button onClick={() => onView(row.original)} className="btn btn-view">
                Visualizar
              </button>
            )}
            {onEdit && (
              <button onClick={() => onEdit(row.original)} className="btn btn-edit">
                Editar
              </button>
            )}
            {onDelete && (
              <button onClick={() => onDelete(row.original)} className="btn btn-delete">
                Desativar
              </button>
            )}
            {onReactivate && (
              <button onClick={() => onReactivate(row.original)} className="btn btn-reactivate">
                Reativar
              </button>
            )}
          </div>
        ),
      },
    ];
  }, [columns, onEdit, onDelete, onView, onReactivate]);

  const {
    getTableProps, getTableBodyProps,
    headerGroups, prepareRow,
    page, nextPage, previousPage, gotoPage,
    canNextPage, canPreviousPage, pageOptions, pageCount,
    setPageSize, state: { pageIndex, pageSize }
  } = useTable(
    {
      columns: tableColumns,
      data,
      initialState: {
        pageIndex: 0,
        pageSize: 10,
        sortBy: [
          { id: 'nome', desc: false },
          { id: 'codigo', desc: false }
        ]
      }
    },
    useSortBy,
    usePagination
  );

  return (
    <>
      <table {...getTableProps()} className="data-table">
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())} className="sortable-header">
                  {column.render('Header')}
                  <span className="sort-icon">
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' ⇊'
                        : ' ⇈'
                      : ' ↕'}
                  </span>
                </th>

              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => (
                  <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="pagination-container">
        <div className="pagination-controls">
          <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>{'<<'}</button>
          <button onClick={() => previousPage()} disabled={!canPreviousPage}>{'< Anterior'}</button>
          <button onClick={() => nextPage()} disabled={!canNextPage}>{'Próximo >'}</button>
          <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>{'>>'}</button>
        </div>
        <div className="page-info">
          Página <strong>{pageIndex + 1} de {pageOptions.length}</strong>
        </div>
        <select
          value={pageSize}
          onChange={e => setPageSize(Number(e.target.value))}
          className="page-size-select"
        >
          {[10, 20, 30, 40, 50].map(size => (
            <option key={size} value={size}>Mostrar {size}</option>
          ))}
        </select>
      </div>
    </>
  );
};

export default DataTable;
