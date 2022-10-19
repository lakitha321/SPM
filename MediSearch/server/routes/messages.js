const express = require('express');
const router = express.Router();
let Message = require("../models/message");

router.route("/").post(async (req,res)=>{

    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var tim = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var time = date+' '+tim;

    const sender = req.body.sender;
    const reciever = req.body.reciever;
    const message = req.body.message;
    const group = req.body.grp;
    const role = req.body.role;
    const area = req.body.area;

    const newMessage = new Message({
        time,
        sender,
        reciever,
        message,
        group,
        role,
        area
    })

    await newMessage.save().then(()=>{
        res.json("Message Added!")
    }).catch((err)=>{
        console.log(err);
    })

})

router.route("/").get(async(req,res)=>{

    await Message.find().then((Messages)=>{
        res.json(Messages)
    }).catch((err)=>{
        console.log(err);
    })

})

router.route("/senders/:area").get(async(req,res)=>{

    let area = req.params.area;

    await Message.distinct("sender",{area:area}).then((Messages)=>{
        res.json(Messages)
    }).catch((err)=>{
        console.log(err);
    })

})

router.route("/sender").get(async(req,res)=>{

    await Message.distinct("sender").then((Messages)=>{
        res.json(Messages)
    }).catch((err)=>{
        console.log(err);
    })

})

router.route("/:id").delete(async (req,res)=>{

    let id = req.params.id;

    await Message.findByIdAndDelete(id).then(()=>{
        res.json('Message deleted!');
    }).catch((err)=>{
        console.log(err);
        res.json('error');
    })

})

router.route("/:id").put(async (req,res)=>{

    let id = req.params.id;

    const message = req.body.newMessage;

    const update = await Message.findByIdAndUpdate(id, {message:message}).then(()=>{
        res.json("Message Updated");
    }).catch((err)=>{
        res.json("Error");
    })

})

router.route("/sender/:email").get(async (req,res)=>{

    let email = req.params.email;

    const msg = await Message.find({sender:email}).then((msg)=>{
        res.json(msg);
    }).catch((err)=>{
        console.log(err);
        res.json('error');
    })

})

router.route("/sender/email/:email").get(async (req,res)=>{

    let email = req.params.email;

    const msg = await Message.findOne({sender:email}).then((msg)=>{
        res.json(msg.group);
    }).catch((err)=>{
        console.log(err);
        res.json('error');
    })

})

router.route("/:grp").get(async (req,res)=>{

    let grp = req.params.grp;

    const msg = await Message.find({group:grp}).then((msg)=>{
        res.json(msg);
    }).catch((err)=>{
        console.log(err);
        res.json('error');
    })

})

module.exports = router;