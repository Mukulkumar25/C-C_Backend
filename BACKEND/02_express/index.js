/*
200 OK → The request was successful, and the server responded with data (common for GET requests).
201 Created → A new resource was successfully created (used for POST requests).
202 Accepted → The request was received but is still being processed (not yet completed).
204 No Content → The request was successful, but the server has no content to return (commonly used for DELETE operations).
*/

import express from 'express'
const app = express()
const port = 4000

// app.get("/", (req, res) => {
//   res.send("Hello from Hitesh and his tea!")
// })
// app.get("/ice-tea", (req, res) => {
//   res.send("Which tea you prefers!")
// })
// app.get("/twitter", (req, res) => {
//   res.send("teadotcom")
// })

app.use(express.json())

let teaData = []
let nextId = 1

//    Add a new tea
app.post('/teas', (req, res) => {
  const {name, price} = req.body;
  const newTea = {id: nextId++, name, price}
  teaData.push(newTea);
  res.status(201).send(newTea);
})

//    Get all tea
app.get('/teas', (req, res) => {
  res.status(200).send(teaData);
})

//    Get a tea of specific id
app.get('/teas/:id', (req, res) => {
  const tea = teaData.find(t => t.id === parseInt(req.params.id))
  if(!tea){
    return res.status(404).send('Tea not found')
  }
  else{
    res.status(200).send(tea);
  }
})

//    Update tea
app.put('/teas/:id', (req, res) => {
  const tea = teaData.find(t => t.id === parseInt(req.params.id))
  if(!tea){
    return res.status(404).send('Tea not found')
  }
  else{  
    const {name, price} = req.body;
    tea.name = name;
    tea.price = price;
    res.status(200).send(tea);
  }
})

//    Delete tea
app.delete('/teas/:id', (req, res) => {
  const index = teaData.findIndex(t => t.id === parseInt(req.params.id))
  if(index === -1){
    return res.status(404).send('Tea not found')
  }
  else{
    teaData.splice(index, 1)
    return res.status(204).send('deleted')
  }
})

app.listen(port, () => {
  console.log(`Server is running at port: ${port}...`)
})