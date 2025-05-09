import React from "react";
import {
  useTable,
  Column,
  TableInstance,
  Row,
  Cell,
} from "react-table";

type DataType = {
  // Replace with your actual data shape
  name: string;
  description: string;
  price: number;
};

const TableComponent: React.FC<{ data: DataType[] }> = ({ data }) => {
  const columns: Column<DataType>[] = React.useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Description",
        accessor: "description",
      },
      {
        Header: "Price",
        accessor: "price",
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  }: TableInstance<DataType> = useTable({ columns, data });

  return (
    <table {...getTableProps()} className="min-w-full table-auto border border-gray-300">
      <thead className="bg-gray-100">
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
            {headerGroup.headers.map(column => (
              <th
                {...column.getHeaderProps()}
                key={column.id}
                className="px-4 py-2 text-left font-semibold border-b"
              >
                {column.render("Header")}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()} key={row.id} className="hover:bg-gray-50">
              {row.cells.map(cell => (
                <td
                  {...cell.getCellProps()}
                  key={cell.column.id}
                  className="px-4 py-2 border-b"
                >
                  {cell.render("Cell")}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default TableComponent;
