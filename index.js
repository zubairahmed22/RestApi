const express = require("express")
const fs =  require("fs")
const users = require('./MOCK_DATA.json')
const app = express();


/// REST API start here 

app.use(express.urlencoded({extended: false}))
app.get("/api/users",(req,res)=>{
   return  res.json(users)
})

app.get("/api/users/:id",(req,res) =>{
    const id = Number(req.params.id)
    const user = users.find((user) => user.id === id)
    return res.json(user)
})

app.post('/api/create-user',(req, res) =>{
    const body = req.body
    users.push({...body,id: users.length + 1})
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
    
    })
    res.json({status: body})
})

app.patch("/api/user-update/:id",(req, res) =>{
    const id = Number(req.params.id)
    const body = req.body
    console.log("check data",body)
    const user = users.find((user) => user.id === id)
    const userIndex = users.indexOf(user)
    console.log(userIndex)
    
   
    Object.assign(user, body)
    users[userIndex] = user

    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) =>{
        return res.json({state: user})
    })

})

app.delete("/api/delete-user/:id",(req,res) =>{
    const id  = Number(req.params.id)
    const deleteUser = users.find((user) => user.id === id)
    const index = users.indexOf(deleteUser)
   console.log(deleteUser)
    users.splice(index, 1)
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) =>{
        return res.json({state: "user deleted"})
    })
   
})

const PORT = 5000

app.listen(PORT,() => console.log(`Server is started On PORT,${PORT}`))