import './Body.css';
import { currentBudgetItem } from '../logic/budget-utils';
import { BudgetType } from '../logic/enums';
import Incomes, { onIncomesAdded } from './IIncomes';
import Expenses, { onExpensesAdded, updateAllExpensesPercentage } from './Expenses';


export default function Body(onDeleteBudgetItem : () => void){
    return `<div class='Body'>
            ${Incomes(onDeleteBudgetItem)} ${Expenses(onDeleteBudgetItem)}
            </div>`;
}


export function updateBodyOnAdd(){
    if(currentBudgetItem == BudgetType.Income){
        onIncomesAdded();
        updateAllExpensesPercentage();
    } else {
        onExpensesAdded();
    }
}

export function updateBodyOnDelete(){
    updateAllExpensesPercentage();
}


