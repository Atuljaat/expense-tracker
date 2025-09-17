"use client"
import React, { useRef } from 'react'
import { UserStore } from '@/store/userStore'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { Category, Expense, PaymentMethod } from '@/types/app'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

function Main() {
  const { user, changeBudget, addExpense } = UserStore()
  // const expenseInput = useRef<HTMLInputElement>(null)
  // const expenseDesc = useRef<HTMLInputElement>(null)
  const [ expenseAmount , setExpenseAmount ] = useState<number>(0)
  const [ expenseDescText , setExpenseDescText ] = useState<string>("")
  const [ expenseCategory , setExpenseCategory ] = useState<Category>("general")
  const [ expensePaymentMethod , setExpensePaymentMethod ] = useState<PaymentMethod>("cash")

  function addingExpense() {
    // const expenseAmount = Number(expenseInput.current?.value)
    // const expenseDescription = expenseDesc.current?.value || ""

    // if (!expenseAmount || isNaN(expenseAmount)) {
    //   alert('Please enter a valid number')
    //   return
    // }

    if (expenseAmount <= 0 || isNaN(expenseAmount)) {
      alert('Please enter a valid number greater than 0')
      return
    }

    const allExpenses = localStorage.getItem('expenses') ? JSON.parse(localStorage.getItem('expenses')!) : []

    const myDate = getDate() ;
    const newExpense: Expense = {
      id: crypto.randomUUID(),
      amount: expenseAmount,
      date: new Date(myDate[0],myDate[1]-1,myDate[2]),
      description: expenseDescText,
      category: expenseCategory , 
      paymentMethod : expensePaymentMethod
    }

    allExpenses.push(newExpense)

    localStorage.setItem('expenses', JSON.stringify(allExpenses))
    addExpense(newExpense)
    resetForm()
    console.log('new Expense added in localStorage : ', newExpense)
  }

  function getDate () {
    const day = new Date().getDate() ;
    const month = new Date().getMonth() + 1 ;
    const year = new Date().getFullYear() ;
    return [year,month,day]
  }

  function resetForm () {
    setExpenseAmount(0)
    setExpenseDescText("")
    setExpenseCategory("general" as Category)
  }


  return (
    <>
      <div className={`${user.mode} text-white bg-gray-900 min-h-screen dark:text-100 dark:bg-gray-950 flex flex-col  py-16`} >
        {/* <div>
      Balance : {user.budget}
      </div>
      <div>
        <Button onClick={newBudget} >
          Change Balance
        </Button>
      </div> */}
      <form  onSubmit={  (e) => {
        e.preventDefault()
        addingExpense()
      } }>


        <div>
          <div>
            <label htmlFor="expense">
              Enter the Expense Amount :
            </label>
            <Input
              name='expense'
              type='number'
              placeholder='Expense Amount'
              value={expenseAmount}
              onChange={(e) => setExpenseAmount(Number(e.target.value))}
            />
          </div>
        </div>
        <div>
          <label htmlFor="desc">
            Enter the Expense Description : (optional)
          </label>
          <Input
            value={expenseDescText}
            onChange={(e) => setExpenseDescText(e.target.value)}
            placeholder='Expense Description'
          />
        </div>
        <div>
          <div>
            <label htmlFor="category">
              Select Category :
            </label>
            <Select value={expenseCategory} onValueChange={(value) => setExpenseCategory(value as Category)} >
              <SelectTrigger className="w-[180px]">
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
        </div>
        <div>
          <label htmlFor="paymentMethod">
            Payment Method : 
          </label>
          <Select value={expensePaymentMethod} onValueChange={(value) => setExpensePaymentMethod(value as PaymentMethod)} >
              <SelectTrigger className="w-[180px]">
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
          <Button type='submit' >
            Add Expense
          </Button>
        </div>
              </form>
      </div>
    </>
  )
}

export default Main