import React,{useState,useEffect} from 'react';
import axios from 'axios';
import './CSS/Home.css'
import {useHistory} from 'react-router-dom';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';






function Home(){
    
    const [income,setIncome] = useState([])
    const [expense,setExpense] = useState([])
    const [Date,setDate] = useState('')
    const [income_number,setIncome_number] = useState(0)
    const [expense_amount,setExpense_amount] = useState(0)
    const [exp_type,setExp_type] = useState('')
    const [catg,setCatg] = useState('')

    const history = useHistory();

     
    
    

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
                setExpense(allExpenseData)
            })
        )


    }

    useEffect(() =>{
        fetchData();
    },[])

    const CreateIncome = (newIncome) =>{
        fetch('https://money-mana-backend.herokuapp.com/expenses/income',{
            method:"POST",
            body:JSON.stringify(newIncome),
            headers:{
                "Content-type":"application/json"
            }
        }).then((data) => data.json()).then(data => history.push('/history') )
    }

    const Addincome = () =>{
        const newIncome ={
            Date:Date,
            income_number:income_number
        }
        CreateIncome(newIncome);
        

    }

    const CreateExpense = (newExpense) =>{
        fetch('https://money-mana-backend.herokuapp.com/expenses/expenditure',{
            method:"POST",
            body:JSON.stringify(newExpense),
            headers:{
                "Content-type":"application/json"
            }
        }).then((data) => data.json()).then(data => history.push('/history') )
    }

    const Addexpense = () =>{
        const newExpense ={
            Date:Date,
            categories:catg,
            expense_amount:expense_amount,
            name:exp_type
        }
        CreateExpense(newExpense);
        

    }


    const totalbalance = income.map((v) => +(v.income_number)).reduce((a,c) => a + c,0);
    const totalexpense =  expense.map((v) => +(v.expense_amount)).reduce((a,c) => a + c,0);
    
    
    
    const [open,setOpen] = useState(false);
    const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

    const handleClickOpen = () => {
        setOpen(true);
      };
    
    const handleClose = () => {
        setOpen(false);
      };

    return(
    <div>
        <div className='Home'>
           
            <h1>Money Manager</h1>

            <div className='result'>
                    <div className='totalbalance'>
                        <h3>Total Balance:<br />{totalbalance-totalexpense}</h3>
                    </div>

                    <div className='totalexp'>
                        <h3>Total Expense:<br />{totalexpense}</h3>
                    </div>
            </div>
            
            <h2>Wanna add new Transaction? Click on the add button below.</h2>
            <div className='transaction'>
                   <h3>Add New Transaction:</h3> 
                   <Button variant="contained" color="secondary" size="small" onClick={handleClickOpen}>Add</Button>

                   <Dialog open={open} onClose={handleClose}>
                                <Box sx={{ width: '100%', typography: 'body1' }}>
                    <TabContext value={value}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example">
                            <Tab label="Income" value="1" />
                            <Tab label="Expense" value="2" />
                           
                        </TabList>
                        </Box>
                        <TabPanel value="1">
                            <form className='transForm'>
                            <label>Enter Amount</label>
                            <TextField
                                id="outlined-number"
                                label="Number"
                                type="number"
                                value={income_number} onChange={(e) => setIncome_number(e.target.value)}
                            />
                            
                            <label>Enter Date</label>
                            <TextField
                                id="outlined-number"
                                label="DD/MM/YY"
                                type="text"
                                value={Date} onChange={(e) => setDate(e.target.value)}
                            />
                            <Button variant="contained" onClick={()=>Addincome()}>Submit</Button>

       
                            </form>
                            
                        </TabPanel>
                        <TabPanel value="2">
                            <form className='transForm'>
                                <label>Enter Expense</label>
                                <TextField
                                    id="outlined-number"
                                    label="Number"
                                    type="number"
                                    value={expense_amount} onChange={(e) => setExpense_amount(e.target.value)}
                                />

                                <label>Expense Type</label>
                                <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                
                                label="Age"
                                value={exp_type} onChange={(e) => setExp_type(e.target.value)}
                                
                                >
                                <MenuItem value={10}>Office</MenuItem>
                                <MenuItem value={20}>Personal</MenuItem>
                               
                                </Select>

                                <label>Expense Reason</label>
                                <TextField
                                    id="outlined-number"
                                    label="Reason"
                                    type="text"
                                    value={catg} onChange={(e) => setCatg(e.target.value)}
                                />
                                
                                <label>Enter Date</label>
                                <TextField
                                    id="outlined-number"
                                    label="DD/MM/YY"
                                    type="text"
                                    value={Date} onChange={(e) => setDate(e.target.value)}
                                />
                                <Button variant="contained" onClick={() => Addexpense()}>Submit</Button>

        
                                </form>
                            </TabPanel>
                       
                    </TabContext>
                    </Box>
                    </Dialog>
            </div>
          
        </div>
        
    </div>
    )
}

export default Home;