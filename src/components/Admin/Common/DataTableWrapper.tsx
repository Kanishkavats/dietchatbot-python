"use client";

import React from "react";
import DataTable, { TableColumn } from "react-data-table-component";

interface DataTableWrapperProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  loading?: boolean;
  pagination?: boolean;
}

const DataTableWrapper = <T,>({
  columns,
  data,
  loading = false,
  pagination = true,
}: DataTableWrapperProps<T>) => {
  return (
    <DataTable
      columns={columns}
      data={data}
      progressPending={loading}
      progressComponent={<p className="p-4">Loading...</p>}
      highlightOnHover
      striped
      // pagination={pagination}
      customStyles={{
        headCells: {
          style: {
            fontWeight: 600,
            fontSize: "13px",
            backgroundColor: "var(--color-primaryColor)",
            color: "var(--color-foreground)",
          },
        },
        cells: {
          style: {
            fontSize: "12px",
            fontWeight: 500,
          },
        },
        rows: {
          style: {
            minHeight: "40px",
          },
        },
      }}
    />
  );
};

export default DataTableWrapper;
