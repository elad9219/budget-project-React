import { computeSum, deleteBudgetItem, expenses, getLastBudgetItem } from '../logic/budget-utils';
import { BudgetType } from '../logic/enums';
import { formatNumber } from '../logic/gen-utils';
import IBudgetItem from '../logic/interfaces/IBudgetItem';
import { ClassIncExp } from './enums';
import './Expenses.css';
import { formatFinitePercentage } from './view-utils';

const CLASS_ROOT = 'Expenses';
const CLASS_PERCENTAGE = 'percentage';
const CLASS_NUMBER = 'number';
const CLASS_AMOUNT = 'amount';

export default function Expenses(onDeleteBudgetItem : () => void){
    (window as any).deleteExpense = deleteExpense;
    function deleteExpense(id: string) : void{
        // logic : remove from expenses array
        deleteBudgetItem(id,BudgetType.Expense);
    
    
        // view : remove from dom
        document.getElementById(getDomItemId(id))?.remove();
    
        // update the world
        onDeleteBudgetItem();
    }
    return `<div class=${CLASS_ROOT}><p class='${ClassIncExp.Header}'>EXPENSES</p></div>`;
}

export function onExpensesAdded(){
    const item = getLastBudgetItem();
    const newItemElem = createExpenseElem(item);
    getExpenseElem().innerHTML += newItemElem;
}

function getExpenseElem() :HTMLDivElement{
    return document.querySelector(`.${CLASS_ROOT}`)!; // ! = can't be null
}

function createExpenseElem(item: IBudgetItem) : string{
    const leftElem = `<span class=${ClassIncExp.Left}>${item.description}</span>`;
    const buttonElem = `<span class='${ClassIncExp.Delete} fa fa-minus-circle' onclick=deleteExpense('${item.id}')></span>`;

    const totalIncomes = computeSum(BudgetType.Income);
    const expense = item.amount;
    const percentageElem = `<span class='
    ${CLASS_PERCENTAGE}'>${formatFinitePercentage(expense,totalIncomes
        )}</span>`;
    const amountElem = `<span class=${CLASS_AMOUNT}>${formatNumber(expense)}</span>`;

    const rightElem = `<div class=${ClassIncExp.Right}><span class='${CLASS_NUMBER}'>${amountElem} ${percentageElem}</span>${buttonElem}</div>`;
    return `<div class='${ClassIncExp.Item}' id='${getDomItemId(item.id)}'>${leftElem}${rightElem}</div>`
}

function getDomItemId(id : string) : string {
    return `id_expense_${id}`;
}

export function updateAllExpensesPercentage(){
    // ---- relevant only on income add or delete
    const totalIncome = computeSum(BudgetType.Income);
    const elemsPercentage = getExpenseElem().querySelectorAll(
        `.${CLASS_PERCENTAGE}` 
        );

    expenses.forEach((expense,index) => {
        const percentage = formatFinitePercentage(expense.amount, totalIncome);
        (elemsPercentage[index] as HTMLSpanElement).innerText = percentage;
    });
}
