import React from 'react'
import './CSS/History.css';

export default function IncomeDetails({income}) {

    return (
        <div className='IncomeHistory'>
        <div style={{color:"green",fontSize:"larger",fontWeight:"bold"}}>
            +
        </div>

        <div style={{color:"green",fontSize:"larger",float:"right"}}>
            {income.income_number}
        </div>

        <div style={{color:"green",fontSize:"larger",marginLeft:"200px"}}>
            {income.Date}
        </div>
    </div>
    )
}
