const express = require('express');
const app = express();

const {people} = require('./data');

app.use(express.static('./methods-public'))
app.use(express.urlencoded({extended:false}))
app.use(express.json())


app.get('/api/people',(req,res)=>{
  res.status(200).json({success:true, data:people})
})

app.post('/api/people',(req,res)=>{
  const {name} =req.body;
  
  if (!name) {
    return res.status(400).json({success:false,msg:'please provide name value'})
  }
  res.status(201).json({success:true,person:name})
})

app.post('/api/postman/people',(req,res)=>{

  // console.log(req.body);

  const {name} = req.body

  if (!name) {
    return res.status(400).json({success:false,msg:'please provide name value'})
  }

  res.status(201).json({success:true,data:[...people,name]})

})



app.post('/login', (req, res) => {
  const { name } = req.body
  if (name) {
    return res.status(200).send(`Welcome ${name}`)
  }
  res.status(401).send('Please Provide Credentials')
})

app.put('/api/people/:id',(req,res)=>{

  const {id} = req.params
  const {name} =req.body;

  const person = people.find((i)=>i.id===Number(id));

  if (!person) {
    return res.status(404).json({success:true,msg:`no person with id ${id}`})
  }

  const newPeople = people.map((i)=>{
    
    if (i.id ===Number(id)) {
      i.name = name;
    }

    return i;
  })

  return res.status(200).json({success:true,data:newPeople})

})

app.delete('/api/people/:id',(req,res)=>{
  const {name} =req.body;

  const person = people.find((i)=>i.id===Number(req.params.id));

  if (!person) {
    return res.status(404).json({success:true,msg:`no person with id ${req.params.id}`})
  }

  const newPeople = people.filter((i)=>i.id!==Number(req.params.id))
  return res.status(200).json({success:true,data:newPeople})

})


app.listen(5000, () => {
  console.log('Server is listening on port 5000....')
})

