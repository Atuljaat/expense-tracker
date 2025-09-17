"use client"
import React, { useEffect, useState } from 'react'
import { UserStore } from '@/store/userStore'
import { Button } from '@/components/ui/button'
import { Expense } from '@/types/app'

function BalanceShow() {
  const { user, changeBudget } = UserStore()
  const [totalExpenseAmount, setTotalExpenseAmount] = useState(0)
  const [remainingBalance, setRemainingBalance] = useState(0)

  useEffect(() => {
    const totalExpense = localStorage.getItem('expenses')
    const budget = localStorage.getItem('budget')

    if (totalExpense) {
      const expenses = JSON.parse(totalExpense)
      const total = expenses.reduce((a: number, c: Expense) => a + c.amount, 0)
      setTotalExpenseAmount(total)
    }

    if (budget) {
      const myBudget = JSON.parse(budget)
      changeBudget(myBudget)
    }
  }, [user.expenses, changeBudget])

  useEffect(() => {
    if (user.budget !== undefined) {
      setRemainingBalance(user.budget - totalExpenseAmount)
    }
  }, [totalExpenseAmount, user.budget])

  function newBudget() {
    const myNewBudget = Number(prompt('Enter the new Budget'))
    if (!isNaN(myNewBudget) && myNewBudget >= 0) {
      localStorage.setItem('budget', JSON.stringify(myNewBudget))
      changeBudget(myNewBudget)
    } else {
      alert('Please enter a valid number')
      changeBudget(0)
    }
  }

  return (
    <div className=" p-6 rounded-lg mb-6">
      <h2 className="text-xl font-semibold mb-4">Your Financial Overview</h2>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div className="flex flex-col">
          <span className="text-sm text-gray-900">Total Budget</span>
          <span className="text-lg font-medium">{user.budget}</span>
        </div>

        <div className="flex flex-col">
          <span className="text-sm text-gray-900">Total Expense</span>
          <span className="text-lg font-medium">{totalExpenseAmount}</span>
        </div>

        <div className="flex flex-col">
          <span className="text-sm text-gray-900">Remaining Balance</span>
          <span
            className={`text-lg font-medium ${
              remainingBalance >= 0 ? 'text-green-400' : 'text-red-500'
            }`}
          >
            {remainingBalance}
          </span>
        </div>

        <Button className="sm:ml-auto" onClick={newBudget}>
          Change Budget
        </Button>
      </div>
    </div>
  )
}

export default BalanceShow
