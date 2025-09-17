"use client"
import React, { useState, useEffect } from 'react'
import { ColumnDef, getCoreRowModel, useReactTable, flexRender } from '@tanstack/react-table'
import { UserStore } from '@/store/userStore'
import type { Expense } from '@/types/app'
import { Button } from '@/components/ui/button'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

function ReportTable() {
    const [userExpenses, setUserExpenses] = useState<Expense[]>(UserStore().user.expenses || [])
    const { removeExpense } = UserStore()

    function removeExpenseFromTable(expenseId: string) {
        const updatedExpenses = userExpenses.filter((expense) => expense.id !== expenseId)
        setUserExpenses(updatedExpenses)
        localStorage.setItem('expenses', JSON.stringify(updatedExpenses))
        removeExpense(expenseId)
    }

    const columns: ColumnDef<Expense>[] = [
        { accessorKey: "date", header: "Date" },
        { accessorKey: "category", header: "Category" },
        { accessorKey: "amount", header: "Amount" },
        { accessorKey: "description", header: "Description", cell: ({ getValue }) => getValue() || 'No description' },
        { accessorKey: "paymentMethod", header: "Payment Method" },
        {
            accessorKey: "id",
            header: "Actions",
            cell: ({ getValue }) => (
                <Button size="sm" variant="destructive" onClick={() => removeExpenseFromTable(getValue() as string)}>
                    Remove
                </Button>
            ),
        },
    ]

    const table = useReactTable({
        data: userExpenses,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    useEffect(() => {
        const myExpenses = localStorage.getItem('expenses')
        const storedExpenses = myExpenses ? JSON.parse(myExpenses) : []
        if (storedExpenses && storedExpenses.length > 0) {
            setUserExpenses(storedExpenses)
        }
    }, [])

    return (
        <div className="rounded-md border shadow-sm p-4 bg-background overflow-x-auto">
            <Table className="min-w-[700px]">
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <TableHead key={header.id} className="text-sm font-semibold">
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(header.column.columnDef.header, header.getContext())}
                                </TableHead>
                            ))}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows.length > 0 ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow key={row.id} className="hover:bg-muted/50">
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id} className="text-sm">
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="text-center text-muted-foreground py-6">
                                No expenses added yet
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}

export default ReportTable
