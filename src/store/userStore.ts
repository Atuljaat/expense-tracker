import { create } from "zustand";
import type { Expense, Store } from "@/types/app";

export const UserStore = create<Store>()((set) => ({
    user: {
        name: '',
        expenses: [] as Expense[],
        budget: 0 ,
        mode: 'dark' 
    },
    changeBudget: (newBudget: number) =>
        set((state) => ({
            user: {
                ...state.user,
                budget: newBudget
            }
        })),
    toggleMode: () =>
        set((state) => ({
            user: {
                ...state.user,
                mode: state.user.mode === 'dark' ? '' : 'dark'
            }
        })) ,
    addExpense : (newExpense:Expense) =>
        set((state) => ({
            user : {
                ...state.user ,
                expenses : [  newExpense , ...(state.user.expenses || []) ]
            }
        })),
    removeExpense : (expenseId:string) => 
        set((state) => ({
            user : {
                ...state.user , 
                expenses : (state.user.expenses!).filter((expense) => expense.id !== expenseId)
            }
        }))
}));
