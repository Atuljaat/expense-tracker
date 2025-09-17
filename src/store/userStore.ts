import { create } from "zustand";
import type { Expense, Store } from "@/types/app";


export const UserStore = create<Store>()((set) => ({
    user: {
        name: '',
        expenses: localStorage.getItem('expenses') ? JSON.parse(localStorage.getItem('expenses') as string) : [],
        budget: 5000,
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
                expenses : [...(state.user.expenses || []) , newExpense ]
            }
        }))
}));
