/* This is a Node.js application using Express framework to create a RESTful API. Here is a summary of
what the code is doing: */
//dependencies
const express = require("express");
const uuid = require("./uuid");
const app = express();
require('dotenv').config()
const bcrypt = require('bcryptjs');
const http = require("http");
const cors = require("cors");
const server = http.createServer(app);
const cookieParser = require('cookie-parser')
var jwt = require('jsonwebtoken');
const path = require("path");
let secret_key=process.env.secret_key;
const Model = require("./modul");
const User = require("./user");
const { error } = require("console");
//port


let port =process.env.port || 8000 ;
//app use this dependencies
app.use(express.json());
app.use(cookieParser())
// app.use(express.static("../"))
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
  })
);
// app.use(express.static(path.join(__dirname, "../client/")));
// app.get("/", (req, res) => {
//   res.sendFile(path.resolve('../client/'+'dashboard.html'));
// });
app.post("/limit", (req, res) => {
  let {token}=req.body
  const play = async () => {
    try {
      let dat = [];
      let replay=jwt.verify(token,secret_key)
      let result = await Model.find({user_id:replay.user_id});
      result.map((elem, ind) => {
        if (ind >= result.length - 5) {
          dat.push(elem);
        }
      });
  
      if (dat.length <= 5) {
        res.send(dat);
      }
  
    } catch (error) {
      res.send("error")
    }
   
    // 
  };
  play();
});

app.get('/alluser',(req,res)=>{
  const play= async()=>{
    let dbdata=await User.find()
    res.send(dbdata)
  }
  play()
});
app.post("/all", (req, res) => {
  let {token}=req.body
  const play = async () => {

    try {
      let replay=jwt.verify(token,secret_key)
      let result = await Model.find({user_id:replay.user_id});
    res.send(result);
    } catch (error) {
      res.send("error")
    }
    
  };
  play();

});


app.post('/post-a-note',(req,res)=>{
  let {token,title,description,createdate}=req.body;
  let play=async()=>{
    try {
      let reply=jwt.verify(token,secret_key)
      // console.log(reply);
      var new_user = new Model({
        token,
        user_id:reply.user_id,
        id:uuid(6),
        title,
        description,
        createdate
    })
   await new_user.save()
   res.send('Save this Data')
    } catch (error) {
      res.send("Error")
    }
   
  }
  play()
})

app.post('/id',(req,res)=>{
  let {token,note_id}=req.body;
  const play = async () => {
    try {
      let reply=jwt.verify(token,secret_key)
      let data=await Model.find({user_id:reply.user_id,id:note_id});
res.send(data)
    } catch (error) {
      res.send("error")
    }

  }
  play()
})
app.post('/author-details',(req,res)=>{

  let {token}=req.body

  
  let play=async()=>{
    try {
      let reply=jwt.verify(token,secret_key)
      let result=await User.find({
        user_id:reply.
        user_id})
      res.send(result)
    } catch (error) {
      res.send("error")
    }
  }
  play()
})
app.post('/author-details-update',(req,res)=>{
  let {token,bio}=req.body
  const play = async () => {
    try {
      let reply=jwt.verify(token,secret_key)
    const result=await User.updateOne({user_id:reply.user_id},{
      $set:{
        bio
      }
    })
    res.send({code:"200"})
    } catch (error) {
      res.send({code:"300"})
    }
      }
      play()
      
})

app.post('/token-verfiy',(req,res)=>{
  let {token}=req.body;
  let play=async()=>{
    try{
      let result=await User.find({token});
      let reply=jwt.verify(token,secret_key);
      //console.log(reply,result);
      if(result[0].user_id==reply.user_id){
res.send('true')
      }
    }
    catch(error){
      //console.log(error);
      res.send('false')
    }

  }
  play()
})
/* This code snippet defines a route in the Express application for user signup functionality. When a
POST request is made to "/signup", the code extracts the data (containing username, password,
avatar, and email) from the request body. */
app.post('/signup',(req,res)=>{
  let data=req.body;
  let user_id=uuid(8);
  const play=async()=>{
  try {
    let password= await bcrypt.hash(data.password,Number(process.env.saltRound))
    let paydata={
      username:data.username,
      password,
      user_id
    }
let token=jwt.sign(paydata,secret_key);
    let payload={
      avatar:data.avatar,
      token,
      user_id,
      username:data.username,
      email:data.email,
      password,
    }
    // console.log('Cookies: ', req.signedCookies)
    var new_user = new User(payload)
    await new_user.save()
    res.send({
      token,
      msg:"Register successfully !",
      code:"200"
    })
  } catch (error){
    res.send({
      token:'null',
      msg:"Registered unsuccessfully !",
      code:"404"
    })
  }
  
  }
  play()
})
/* This code snippet defines a route in the Express application for user login functionality. When a
POST request is made to "/login", the code extracts the `password`, `username`, and `token` from the
request body. */
app.post('/login',(req,res)=>{
  let {password,username,token}=req.body;
  const play=async()=>{
try {
  let payload={
    msg:'',
    code:''
  }
  let hasspass1= await bcrypt.hash(password,Number(process.env.saltRound))
  if(token!=null){
    let verify=jwt.verify(token,secret_key)
    let dat=bcrypt.compareSync(password,verify.password)
    if(verify.username==username && dat){
      payload={
        token,
        msg:'You already login.',
        code:'200'
      }
    }
    else{
      
payload={
  token:null,
  msg:'You error occured.',
  code:'200'
}
    }
  }
  else{
let result=await User.find({username})
let token=result[0].token;
let verify=jwt.verify(token,secret_key)
let dat=bcrypt.compareSync(password,verify.password)
if(dat){
  payload={
    token:result[0].token,
    msg:'You already login.',
    code:'200'
  }
}
else{
  payload={
    token:null,
    msg:'You error occured.',
    code:'200'
  }
}
  }
  res.send(payload)
} catch (error) {
  let result=await User.find({username})
  let token=result[0].token;
  let verify=jwt.verify(token,secret_key)
  let dat=bcrypt.compareSync(password,verify.password)
if(dat){
  payload={
    token:result[0].token,
    msg:'You already login.',
    code:'200'
  }
}
else{
  payload={
    token:null,
    msg:'You error occured.',
    code:'200'
  }
}

res.send(payload)
}
  }
play()
})
/* This code snippet defines a POST route in the Express application to search for a user based on
their username. When a POST request is made to "/search-user", the code extracts the username from
the request body. It then uses an asynchronous function to query the database (using the User model)
to find the user with the specified username. Finally, it sends the data of the first user found (if
any) back in the response. */
app.post("/search-user",(req,res)=>{
let {user}=req.body
const play=async()=>{
  let dbdata= await User.find({username:user})
  res.send(dbdata[0])
}
play()
})
/* This code snippet defines a route in the Express application that allows a user to set a new
password for their account. When a POST request is made to "/setpassword", the code extracts the
user ID and the new password from the request body. */
app.post('/setpassword',(req,res)=>{
  let {id,password}=req.body;
  const play=async()=>{
    try {
      let hasspass= await bcrypt.hash(password,Number(process.env.saltRound))
      let dbdata=await User.find({user_id:id})
      let username=dbdata.username
      let payload={
        username,
        password:hasspass,
        user_id:id
      }
      let token=jwt.sign(payload,secret_key)
      
      const result=await User.updateOne({ user_id:id },{
        $set:{
         token,
         password:hasspass
      
    }})
      //console.log(result);
      res.send({
        msg:"Success"
      })
    }
    catch(err){
      res.send({
        msg:"error"
      })
    }
  }
  play()
})


/* This code snippet defines a route in the Express application that handles deleting a specific note
based on the provided `id` and `token`. When a POST request is made to "/delete", the code extracts
the `id` and `token` from the request body. */
app.post('/delete',(req,res)=>{
  let {id,token}=req.body;
   //console.log(id,token);
  const play=async ()=>{
    try {
      let replay=jwt.verify(token,secret_key)
      let result=await Model.deleteOne({user_id:replay.user_id,id});
      //console.log(result);
    } catch (error) {
      return {msg:"Connection UnSuccessfull"}
    }
  }
  let res1=play();
  res.send(res1)

})
/* This code snippet defines a route in the Express application that handles updating a specific note
based on the provided `id`, `token`, `title`, `description`, and `updatedate`. When a POST request
is made to "/update", the code extracts the `token`, `updatedate`, `id`, `title`, and `description`
from the request body. */
app.post('/update',(req,res)=>{
  let {token,updatedate,id,title,description}=req.body
  // console.log(title,description,id);
  const play = async () => {
try {
const result=await Model.updateOne({id},{
  $set:{
    title,
    description,
    updatedate
  }
})
} catch (error) {
  console.log(error);
}
  }
  play()
})
server.listen(port, () => {
  console.log("running at http://localhost:" + port);
});

