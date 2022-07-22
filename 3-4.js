const Right = x =>({
    chain: f => f(x),
    map: f => Right(f(x)),
    fold: (f, g) => g(x),
    inspect: () => `Right(${x})`
});

const Left = x =>({
    chain: f => Left(x),
    map: f => Left(x),
    fold: (f, g) => f(x),
    inspect: () => `Left(${x})`
});

const fromNullable = x => x != null ? Right(x) : Left(null)
const findColor = name =>fromNullable({red: '#ff4444',blue:'#3b5998',yellow:'#fff68f'}[name])



console.log(
    findColor('red')
    .map(c => c.slice(1))
    .fold(e => `error ${e}`, color => color )
)

const fs = require('fs');
const { json } = require('stream/consumers');

const tryCatch = f => {
    try {
        return Right(f())
    }catch(e){
        return Left(e)
    }
}
const getPort = () =>{
    try{
        const rawConfig = fs.readFileSync('config.json')
        const config = JSON.parse(rawConfig)
        return config.port
    }catch(err){
        console.error(err)
    }
}

const getPort2 = () => tryCatch(() => fs.readFileSync('config.json')) //Right('')
    .chain(c => tryCatch(()=>JSON.parse(c))) //Right('')
    .map(config=>config.port)
    .fold(
        e=>888,
        port=>port
    )
    
console.log(getPort2())