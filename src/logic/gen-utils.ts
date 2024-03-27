import { v4 as uuidv4 } from 'uuid';

export function createUniqueId() : string{
    return uuidv4();
}

export function computePercentage(num: number, den: number) : number {
    return (num/den)*100
}

export function formatPercentage(num: number) : number {
    return Math.round(num);
}

// ---10000 --> 10,000
export function formatNumber(num: number) : string {
    let sign = "";
    if (num > 0){
        sign = "+";
    } else if (num < 0){
        sign = "-";
    }

    num = Math.abs(num);
    return `${sign} ${num.toLocaleString(undefined,{
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    })}`;
}