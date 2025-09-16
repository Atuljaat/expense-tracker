export type Expense = {
    id : string ;
    amount : number ;
    date : string ;
    category : string ;
    description ?: string ;
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
    addExpense : (newExpense:Expense) => void
}