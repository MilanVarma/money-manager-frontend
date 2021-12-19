import React,{useState,useEffect} from 'react';
import axios from 'axios';
import IncomeDetails from './IncomeDetails';
import ExpenseDetails from './ExpenseDetails';
import './CSS/History.css';

function History(){
    const [income,setIncome] = useState([])
    const [expense,setExp] = useState([])

    const fetchData = () =>{
        const IncomeData = 'https://money-mana-backend.herokuapp.com/expenses/income';
        const ExpenseData = 'https://money-mana-backend.herokuapp.com/expenses/expenditure';

        const getIncomeData = axios.get(IncomeData);
        const getExpenseData = axios.get(ExpenseData);

        axios.all([getIncomeData,getExpenseData]).then(
            axios.spread((...allData)=>{
                const allIncomeData = allData[0].data;
                const allExpenseData = allData[1].data;

                console.log(allIncomeData);
                console.log(allExpenseData);

                setIncome(allIncomeData)
                setExp(allExpenseData)
            })
        )


    }

    useEffect(() =>{
        fetchData();
    },[])
    return(
        <div className='history'>
                <h2>Income History</h2>
                <div className='IncomeDetails'>
                    {
                        income.map((value)=>(
                               <IncomeDetails income={value} />
                        ))
                    }

                </div>

                <h2>Expense History</h2>
                <div className="ExpenseDetails">
                    {
                        expense.map((value)=>(
                               <ExpenseDetails expense={value} /> 
                        ))
                    }
                   
                </div>
        </div>
    )
}

export default History;