import { BudgetType } from "./enums";
import IBudgetItem from "./interfaces/IBudgetItem";

export const incomes : IBudgetItem[] = [
    // {description: 'income1', amount: 11, id: "id1"},
    // {description: 'income2', amount: 333, id: "id2"}

];
export const expenses : IBudgetItem[] = [
    // {description: 'expense1', amount: 111, id: "id1"},
    // {description: 'expense2', amount: 222, id: "id2"},
];

export let currentBudgetItem = BudgetType.Income;

export function setCurrentBudgetItem(type: BudgetType){
    currentBudgetItem = type;
}

export function addBudgetItem(item: IBudgetItem){
    const items = (currentBudgetItem == BudgetType.Income) ? incomes : expenses;
    items.push(item);
}

export function computeSum(type: BudgetType) : number {
    const items = type == BudgetType.Income? incomes : expenses;
    return computeTotal(items);
}

function computeTotal(items: IBudgetItem[]): number {
    let sum = 0;
    items.forEach(item => {
        sum += item.amount;
    });

    return sum;
}

export function computeBudget() : number {
    return computeTotal(incomes) - computeTotal(expenses);
}

export function getLastBudgetItem() : IBudgetItem{
    const items = (currentBudgetItem == BudgetType.Income)? incomes : expenses;
    return items[items.length - 1];
}

export function deleteBudgetItem(id : string, type : BudgetType) : void{
    const items = (type == BudgetType.Income)? incomes : expenses;
    const index = items.findIndex(it => it.id === id);
    items.splice(index,1);
}

