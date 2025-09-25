"use client";

import AnimatedReveal from "@/src/animations/AnimatedReveal";
import { AdminDataTableWrapperProps } from "@/src/types/adminCommon";
import React from "react";
import DataTable, { TableColumn } from "react-data-table-component";



const DataTableWrapper = <T,>({
  columns,
  data,
  loading = false,
}: AdminDataTableWrapperProps<T>) => {
  return (
    <AnimatedReveal>
      <DataTable
        columns={columns}
        data={data}
        progressPending={loading}
        progressComponent={<p className="p-4">Loading...</p>}
        highlightOnHover
        striped
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
    </AnimatedReveal>
  );
};

export default DataTableWrapper;
