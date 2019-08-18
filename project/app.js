const express=require("express");
const app=express();
const http=require("http");
const server = http.createServer(app);
const socket=require("socket.io");
const cors=require("cors");
const io=socket.listen(server);
const bodyParser=require("body-parser");
var user=require("./user");
var chatObj=new user();


app.use(cors({origin: "*"}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


var array_of_all_messages=[];

io.on("connection",function(client){

    client.on("clientMessage",function(data){
     var customObj={ fromUserName:data.from,toUserName:data.to,stringMessage:data.msg}
      chatObj.insertMessage(customObj).then((data)=>{
         chatObj.getAllMessages().then((data)=>{
            array_of_all_messages=data;
            io.emit("showAllMessages",array_of_all_messages);
           }).catch((err)=>{});
        }).catch((err)=>{});
    
     });


    chatObj.getAllMessages().then((data2)=>{
       array_of_all_messages=data2;
       io.emit("showAllMessages",array_of_all_messages);
      }).catch((err)=>{
    });
   
   
   

});


app.get('/',function(req,res){
   console.log("from home");
   res.send("from home");
});


app.get('/getMessages',function(req,res){
  chatObj.getAllMessages().then((data)=>{
  res.status(200).json(data);
  }).catch((err)=>{
  res.status(404).json("sorry error in get");
  });
});


app.post('/insertMessage',function(req,res){
   chatObj.insertMessage(req.body).then((data)=>{
   res.status(200).json(data);
   }).catch((err)=>{
   res.status(404).json("sorry error in post");
   });
});


server.listen(5000);