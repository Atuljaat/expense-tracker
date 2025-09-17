"use client"
import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { UserStore } from '@/store/userStore'
import { Input } from '@/components/ui/input'
import { Category, Expense, PaymentMethod } from '@/types/app'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

function Main() {
  const { user, addExpense } = UserStore()
  const [expenseAmount, setExpenseAmount] = useState<number>(0)
  const [expenseDescText, setExpenseDescText] = useState<string>("")
  const [expenseCategory, setExpenseCategory] = useState<Category>("general")
  const [expensePaymentMethod, setExpensePaymentMethod] = useState<PaymentMethod>("cash")

  function addingExpense() {
    if (expenseAmount <= 0 || isNaN(expenseAmount)) {
      alert('Please enter a valid number greater than 0')
      return
    }

    const allExpenses = localStorage.getItem('expenses') ? JSON.parse(localStorage.getItem('expenses')!) : []

    const myDate = getDate();
    const newExpense: Expense = {
      id: crypto.randomUUID(),
      amount: expenseAmount,
      date: `${myDate[0]}/${myDate[1] - 1}/${myDate[2]}`,
      description: expenseDescText,
      category: expenseCategory,
      paymentMethod: expensePaymentMethod
    }

    allExpenses.push(newExpense)
    localStorage.setItem('expenses', JSON.stringify(allExpenses))
    addExpense(newExpense)
    resetForm()
    console.log('new Expense added in localStorage : ', newExpense)
  }

  function getDate() {
    const day = new Date().getDate();
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();
    return [year, month, day]
  }

  function resetForm() {
    setExpenseAmount(0)
    setExpenseDescText("")
    setExpenseCategory("general" as Category)
  }

  useEffect(() => {
    const expenses = localStorage.getItem('expenses') ? JSON.parse(localStorage.getItem('expenses') as string) : []
    if (expenses && expenses.length > 0) {
      addExpense(expenses)
    }
  }, [addExpense])


  return (
    <>
      <div className={`${user.mode} robotoFont font-medium bg min-h-screen dark:text-100 dark:bg-gray-950 flex flex-col py-10 px-4 sm:px-8`}>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            addingExpense()
          }}
          className="w-full max-w-md mx-auto space-y-4"
        >
          <div>
            <label htmlFor="expense" className="block mb-1">
              Enter the Expense Amount :
            </label>
            <Input
              name='expense'
              type='number'
              placeholder='Expense Amount'
              value={expenseAmount}
              onChange={(e) => setExpenseAmount(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div>
            <label htmlFor="desc" className="block mb-1">
              Enter the Expense Description : (optional)
            </label>
            <Input
              value={expenseDescText}
              onChange={(e) => setExpenseDescText(e.target.value)}
              placeholder='Expense Description'
              className="w-full"
            />
          </div>

          <div>
            <label htmlFor="category" className="block mb-1">
              Select Category :
            </label>
            <Select  value={expenseCategory} onValueChange={(value) => setExpenseCategory(value as Category)} >
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="travel"> Travel </SelectItem>
                <SelectItem value="food"> Food </SelectItem>
                <SelectItem value="bills"> Bills </SelectItem>
                <SelectItem value="general"> General </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label htmlFor="paymentMethod" className="block mb-1">
              Payment Method :
            </label>
            <Select value={expensePaymentMethod} onValueChange={(value) => setExpensePaymentMethod(value as PaymentMethod)} >
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Payment " />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cash"> Cash </SelectItem>
                <SelectItem value="card"> Card </SelectItem>
                <SelectItem value="upi"> Upi </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Button type='submit' className="w-full font-semibold text-slate-900 hover:scale-105 rounded-2xl shadow-lg hover:shadow-xl hover:cursor-pointer bg-blue-300 hover:bg-blue-400 transition-all">
              Add Expense
            </Button>
          </div>
        </form>
      </div>
    </>
  )
}

export default Main
