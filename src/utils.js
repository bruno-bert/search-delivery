import Dinero from "dinero.js"

const defaultCurrency = "BRL"
const defaultMoneyFormat = "$0,0.00"

export const convertMoneyToDisplay = (
    amount, 
    currency = defaultCurrency, 
    moneyFormat = defaultMoneyFormat) => {
    return Dinero({ 
        amount: (amount * 100) , 
        currency })
        .toFormat(defaultMoneyFormat)
}