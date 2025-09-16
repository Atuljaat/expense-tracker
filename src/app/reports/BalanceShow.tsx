"use client"
import React from 'react'
import { UserStore } from '@/store/userStore'
import { Button } from '@/components/ui/button'

function BalanceShow() {
    const { user , changeBudget } = UserStore()
    
    function newBudget () {
        const myNewBudget = Number(prompt('Enter the new Budget '))
        if (myNewBudget || !isNaN(myNewBudget) ) {
          console.log(myNewBudget)
          changeBudget(myNewBudget)
        } else {
          alert('Please enter a valid number')
          changeBudget(0)
        }
        console.log(user.mode)
    }
    
  return (
    <div>
         <div>
      Remaining Balance : {user.budget}
      </div>
      <div>
        <Button onClick={newBudget} >
          Change Balance
        </Button>
      </div>
    </div>
  )
}

export default BalanceShow

