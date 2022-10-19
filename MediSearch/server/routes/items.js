const { json } = require('express');
const express = require('express')
const router = express.Router()
let Item = require("../models/item");

router.route("/").post(async (req,res)=>{

    const name = req.body.name;
    const pharmasist_name = req.body.farmerName;
    const pharmasist_email = req.body.farmerEmail;
    const price = req.body.price;
    const image = req.body.image;
    const desc = req.body.desc;

    const newItem = new Item({
        name,
        pharmasist_email,
        pharmasist_name,
        price,
        image,
        desc
    })

    await newItem.save().then(()=>{
        res.json("New Item Added!")
    }).catch((err)=>{
        console.log(err);
    })

})

router.route("/").get(async (req,res)=>{

    await Item.find().then((Items)=>{
        res.json(Items)
    }).catch((err)=>{
        console.log(err);
    })

})

router.route("/:id").put(async (req,res)=>{

    let id = req.params.id;
    const name = req.body.name;
    const farmerName = req.body.farmerName;
    const farmerEmail = req.body.farmerEmail;
    const price = req.body.price;
    const image = req.body.image;
    const desc = req.body.desc;

    const updateItem = {
        name,
        farmerEmail,
        farmerName,
        price,
        image,
        desc
    }

    const update = await Item.findByIdAndUpdate(id, updateItem).then(()=>{
        res.json({"msg":"Item Updated", "status":true});
    }).catch((err)=>{
        res.json("Error");
    })

})

router.route("/:id").delete(async (req,res)=>{

    let userId = req.params.id;

    await Item.findByIdAndDelete(userId).then(()=>{
        res.json("Item Deleted");
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status: "Error with delete"});
    })

})

router.route("/:id").get(async (req,res)=>{

    let userId = req.params.id;

    const Items = await Item.findById(userId).then((Items)=>{
        res.json(Items)
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status: false});
    })

})

router.route("/getbyemail/:email").get(async (req,res)=>{

    let userEmail = req.params.email;

    const Items = await Item.find({pharmasist_email:userEmail}).then((Items)=>{
        res.json(Items)
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status: false});
    })

})

module.exports = router;