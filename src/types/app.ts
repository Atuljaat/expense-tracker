export type Expense = {
    id : string ;
    amount : number ;
    date : string ;
    category : Category ;
    description ?: string ;
    paymentMethod : PaymentMethod
}

export type User = {
    id ?: string , 
    name ?: string ,
    email ?: string ,
    password ?: string,
    budget ?: number,
    expenses ?: Expense[],
    mode : "dark" | ''
}

export type Store = {
    user : User ,
    changeBudget : (newBudget:number) => void ,
    toggleMode : () => void ,
    addExpense : (newExpense:Expense) => void ,
    removeExpense : (expenseId:string) => void ,
}

export type Category = 'travel' | 'food' | 'bills' | 'general' ;
export type PaymentMethod = 'cash' | 'card' | 'upi' ;