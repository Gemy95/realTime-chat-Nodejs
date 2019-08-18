
class Chat
{

    constructor()
    {
        this.mongoose = require('mongoose');
        this.con = this.mongoose.createConnection('mongodb://localhost/chatDB',{ useNewUrlParser: true });

        this.chatSchema= new this.mongoose.Schema ({
            fromUserName:String,
            toUserName:String,
            stringMessage:String,
            date:Date
        });

        this.chatInfoModel=this.con.model('',this.chatSchema,'chatInfo');
    }


    getAllMessages()
    {     return new Promise((resolve,reject)=>{
          this.chatInfoModel.find({},function(err,data){
              if(err)
              reject(err);
              else
              resolve(data);
          })
    });
    }


    insertMessage(obj)
    {
        var customObj={
            fromUserName:obj.fromUserName,
            toUserName:obj.toUserName,
            stringMessage:obj.stringMessage,
            date:new Date()
        }
        return new  Promise((resolve,reject)=>{
            this.chatInfoModel.create(customObj,function(err,data){
                if(err)
                reject(err);
                else
                resolve("success insert");
            })
        });
      
    }



}

module.exports=Chat;