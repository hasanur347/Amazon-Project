import { formatCurrency } from "../utils/money.js";
console.log('test suite: formatcurrency')
console.log('convert cents to dollar')
if (formatCurrency(2095) === '20.95'){
    console.log('passed')
} else {
    console.log('failed')
}
console.log('test with 0')
if (formatCurrency(0) === '0.00'){
    console.log('passed')
} else {
    console.log('failed')
}
console.log('test with round up')
if (formatCurrency(2000.4) === '20.00'){
    console.log('passed')
} else {
    console.log('failed')
}