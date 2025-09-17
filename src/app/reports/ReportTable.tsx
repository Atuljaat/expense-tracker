"use client"
import React, { useState } from 'react'
import { ColumnDef, getCoreRowModel, useReactTable, flexRender } from '@tanstack/react-table'
import { UserStore } from '@/store/userStore'
import type { Expense } from '@/types/app'

// {id: '7783919e-7bac-44d2-a65b-21c527a7a44c', amount: 600, date: '9/17/2025', description: 'college one', category: 'travel', …}
// amount
// : 
// 600
// category
// : 
// "travel"
// date
// : 
// "9/17/2025"
// description
// : 
// "college one"
// id
// : 
// "7783919e-7bac-44d2-a65b-21c527a7a44c"
// paymentMethod
// : 
// "cash"


function ReportTable() {
    const [userExpenses] = useState(UserStore().user.expenses || []);

    const columns: ColumnDef<Expense>[] = [
        {
            accessorKey: "date",
            header: "Date",
            cell: ({ getValue }) => {
                const value = getValue() as string;
                return value.slice(0,10);
            }
        },
        {
            accessorKey: "category",
            header: "Category",
        },
        {
            accessorKey: "amount",
            header: "Amount",
        },
        {
            accessorKey: "description",
            header: "Description",
            cell: ({ getValue }) => getValue() || 'no description'
        },
        {
            accessorKey: "paymentMethod",
            header: "Payment Method",
            cell: ({ getValue }) => (getValue())
        }
    ];

    const table = useReactTable({
        data : userExpenses,
        columns,
        getCoreRowModel: getCoreRowModel()
    })


    return (
        <div className="rounded-md border px-30">
            <table className="w-full min-w-[600px] table-auto ">
                <thead className="bg-muted text-muted-foreground">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <th
                                    key={header.id}
                                    className="px-4 py-2 text-left text-sm font-medium"
                                >
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(header.column.columnDef.header, header.getContext())}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map((row) => (
                        <tr
                            key={row.id}
                            className="border-t hover:bg-muted/50"
                        >
                            {row.getVisibleCells().map((cell) => (
                                <td
                                    key={cell.id}
                                    className="px-4 py-2 text-sm"
                                >
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ReportTable