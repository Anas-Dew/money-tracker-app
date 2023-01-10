import React, { useState, useContext } from 'react'
import noteContext from '../context/noteContext'

export const Budget = () => {
    const expense_object = useContext(noteContext)
    const { UserData,Expense, UpdateExpense } = expense_object

    UpdateExpense();
    return (
        <h2 style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>Budget Remaining : ${UserData.expense_budget - Expense}</h2>
    )
}
