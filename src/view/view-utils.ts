import { computePercentage, formatPercentage } from '../logic/gen-utils';


export function formatFinitePercentage(expense: number, income: number): string {
    const percentage = computePercentage(expense, income);
    const percentageFormated = Number.isFinite(percentage) ? `${formatPercentage(percentage)}%` : '--';
    return percentageFormated;
}