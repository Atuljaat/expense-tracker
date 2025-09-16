"use client"
import React, { useRef } from 'react'
import { UserStore } from '@/store/userStore'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState } from 'react'

function Main() {
  const { user , changeBudget } = UserStore()
  const expenseInput = useRef<HTMLInputElement>(null)
  const expenseDesc = useRef<HTMLInputElement>(null)

  function addExpense () {
    const expenseAmount = Number(expenseInput.current?.value)
    const expenseDescription = expenseDesc.current?.value || ""
    
    if (!expenseAmount || isNaN(expenseAmount) ) {
      alert('Please enter a valid number')
      return
    }

    

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

      <div>
      <div>
        <label htmlFor="expense">
          Enter the Expense Amount : 
        </label>
        <Input 
        name='expense'
        type='number'
        placeholder='Expense Amount'
        ref={expenseInput}
        />
      </div>
      </div>
      <div>
        <label htmlFor="desc">
          Enter the Expense Description : (optional)
        </label>
        <Input 
        ref={expenseDesc}
        placeholder='Expense Description'
        />
      </div>
      <div>
        <Button>
          Add Expense
        </Button>
      </div>
    </div>
    </>
  )
}

export default Main