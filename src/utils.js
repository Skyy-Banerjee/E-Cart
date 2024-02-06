export const getTotal = (cart)=>{
let totalAmt = 0;
let totalCost = 0;
for(let {amount, price} of cart.values()){
totalAmt += amount;
totalCost += amount*price;
}
return {totalAmt, totalCost}
}