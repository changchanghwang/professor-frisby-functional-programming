// const nextCharForNumberString = str =>{
//     const trimmed = str.trim();
//     const number = parseInt(trimmed);
//     const nextNumber = number + 1;
//     return String.fromCharCode(nextNumber);
// }


// console.log(nextCharForNumberString(' 64'))

const Box = x =>
({
    map: f => Box(f(x)),
    fold: f => f(x),
    inspect: () => `Box(${x})`
})

const nextCharForNumberString = str =>{
    return Box(str)
    .map(s => s.trim())
    .map(s => parseInt(s))
    .map(i=>i+1)
    .fold(i => String.fromCharCode(i))
}

console.log(nextCharForNumberString(' 64'))

// const moneyToFloat = str => parseFloat(str.replace(/\$/g, ''))
const moneyToFloat = str =>(
    Box(str)
    .map(s=>s.replace(/\$/g,''))
    .map(s=>parseFloat(s))
)


// const percentToFloat = str =>{
//     const replaced = str.replace(/\%/g,'');
//     const number = parseFloat(replaced);
//     return number * 0.01;
// }

const percentToFloat = str =>{
    return Box(str)
    .map(s=>s.replace(/\$/g,''))
    .map(s=>parseFloat(s))
    .map(i=>i*0.01)
}


const applyOfDiscount = (price,discount) =>(
    moneyToFloat(price).fold(cost => percentToFloat(discount).fold(savings=>cost - cost*savings)) // use closure
)

console.log(applyOfDiscount('$100','20%'))

