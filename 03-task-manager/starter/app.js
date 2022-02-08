const express = require('express')
const app =express();
const tasks = require('./routes/tasks')
const notFound = require('./middleware/not-found')
const connectDB = require('./db/connect')
require('dotenv').config()

// middleware
app.use(express.static('./public'))
app.use(express.json())
//  if we dont use this. We won't have that data in req.body

// Routes
// app.get('/hello',(req,res)=>{
//     res.send('Task manager app')
// })


app.use('/api/v1/tasks',tasks)
app.use(notFound)


const port = process.env.PORT || 3000


const start = async ()=>{
    try {
        await connectDB(process.env.MONGO_URL)
        app.listen(port,console.log('server is listening on port'+port))
    } catch (error) {
        console.log(error);
    }
}

start()



// app.get('/api/v1/tasks')        - get all tasks
// app.post('/api/v1/tasks')       - create a new task
// app.get('/api/v1/tasks/:id')    - get single task
// app.patch('/api/v1/tasks/:id')  - update task
// app.delete('/api/v1/tasks/:id') - delete task