const task = {
    fork(rej, res){
        new Promise((resolve, reject)=>{
            console.log('hi')
        })
    }
}

task.fork()