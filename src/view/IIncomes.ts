import { deleteBudgetItem, getLastBudgetItem } from '../logic/budget-utils';
import './Incomes.css';
import IBudgetItem from '../logic/interfaces/IBudgetItem';
import { formatNumber } from '../logic/gen-utils';
import { BudgetType } from '../logic/enums';
import { ClassIncExp } from './enums';

const CLASS_ROOT = 'Incomes';

export default function IIncomes(onDeleteBudgetItem : () => void){
    (window as any).deleteIncome = deleteIncome;
    function deleteIncome(id: string) : void{
        // logic : remove from incomes array
        deleteBudgetItem(id,BudgetType.Income);
    
    
        // view : remove from dom
        document.getElementById(getDomItemId(id))?.remove();
    
        // update the world
        onDeleteBudgetItem();
    }
    return `<div class=${CLASS_ROOT}><p class='${ClassIncExp.Header}'>INCOMES</p></div>`;
}

export function onIncomesAdded(){
    const item = getLastBudgetItem();
    const newItemElem = createIncomeElem(item);
    getIncomesElem().innerHTML += newItemElem;
}

function getIncomesElem() :HTMLDivElement{
    return document.querySelector(`.${CLASS_ROOT}`)!; // ! = can't be null
}

function createIncomeElem(item: IBudgetItem) : string{
    const leftElem = `<span class=${ClassIncExp.Left}>${item.description}</span>`;
    const buttonElem = `<span class='${ClassIncExp.Delete} fa fa-minus-circle' onclick=deleteIncome('${item.id}')></span>`;
    const rightElem = `<div class=${ClassIncExp.Right}><span>${formatNumber(item.amount)}</span>${buttonElem}</div>`;
    return `<div class='${ClassIncExp.Item}' id='${getDomItemId(item.id)}'>${leftElem}${rightElem}</div>`
}

function getDomItemId(id : string) : string {
    return `id_income_${id}`;
}

