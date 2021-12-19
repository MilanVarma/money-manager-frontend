import React from 'react'
import './CSS/History.css';

export default function ExpenseDetails({expense}) {

    return (
    <div className='ExpenseHistory'>
        <div style={{color:"red",fontSize:"larger",fontWeight:"bold"}}>
            -
        </div>

        <div style={{color:"red",fontSize:"larger",float:"right"}}>
            {expense.expense_amount}
        </div>

        <div style={{color:"red",fontSize:"larger",marginLeft:"200px"}}>
            {expense.Date}
        </div>
    </div>
    )
}