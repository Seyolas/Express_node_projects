const express = require('express');

const app = express()
const {products} = require('./data');

app.get('/',(req,res)=>{
  res.send('<h1>Home Page my niigga </h1><a href="/api/products">Products</a>');

})

app.get('/api/products',(req,res)=>{
  const newProducst = products.map((item)=>{
    const {id,name,image} = item;
    return {id,name,image}
  })
  res.json(newProducst);
})

app.get('/api/products/:productID',(req,res)=>{

  // PARAMS = STRING ALWAYS
  // console.log(req)
  // console.log(req.params) = {id:'3'}
  const {productID} = req.params

  const singleItem = products.find((item)=>item.id === Number(productID))

  if (!singleItem) {
    return res.status(404).send('Product Does Not Exist');
  }

  return res.json(singleItem)
})

app.get('/api/products/:productID/reviews/:reviewID', (req, res) => {

  // console.log(req.params) = {productID: '3', reviewID: 'keje'}

  res.send('hello world')
})

app.get('/api/v1/query',(req,res)=>{

  // http://localhost:5000/api/v1/query?search=seyolas&limit=31
  // console.log(req.query); {search:'seyolas',limit:'31'}

  // http://localhost:5000/api/v1/query?search=seyolas&limit=31&country=lithuania
  // console.log(req.query); {search:'seyolas',limit:'31',country:'lithuania'}

  console.log(req.query);

  const {search, limit} = req.query
  let sortedProducts = [...products];
  if (search) {
    sortedProducts = sortedProducts.filter((item)=>{
      return item.name.startsWith(search)
    })
  }
  if (limit) {
    sortedProducts = sortedProducts.slice(0,Number(limit))
  }
  if (sortedProducts.length<1) {
    return res.status(200).json({success:'true',data:[]})
  }

  return res.status(200).json(sortedProducts);

})


app.listen(5000,()=>{
  console.log('Server is listening');
})