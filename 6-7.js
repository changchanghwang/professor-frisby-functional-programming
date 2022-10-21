const{ Map } =require("immutable-ext")

// semiGroup = concat이 있고 결합법칙이 성립하는 그룹. === string, array
// associativity 결합법칙. -> a+(b+c) === (a+b)+c
const Sum = x =>({
    x,
    concat: o => Sum(x+o.x)
})

const All = x =>({
    x,
    concat: o => Sum(x && o.x)
})

const First = x =>({
    x,
    concat: _ => Sum(x)
})

const res = Sum(1).concat(Sum(2)).concat(Sum(3))
const res2 = Sum(3).concat(Sum(2)).concat(Sum(1))

const acct1 = Map({ name: First('Vin'), score: Sum(100)})
const acct2 = Map({ name: First('Arthur'), score: Sum(90)})

console.log(res.x === res2.x)
console.log(All(true).concat(All(true)))
console.log(First("hi").concat(First("hello")))
console.log(acct1.concat(acct2)._root.entries)
