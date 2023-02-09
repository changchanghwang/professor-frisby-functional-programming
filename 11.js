
const Box = x =>
({
    map: f => Box(f(x)),
    fold: f => f(x),
    inspect: () => `Box(${x})`
})

const LazyBox = (g)=>({
    map: f => LazyBox(()=>f(g())),
    fold: f => f(g())
})

const result = LazyBox(() => '    64 ')
                .map(abba => abba.trim())
                .map(trimmed => new Number(trimmed))
                .map(number => number+1)
                .map(x => String.fromCharCode(x))
                .fold(x=>x)

console.log(result)