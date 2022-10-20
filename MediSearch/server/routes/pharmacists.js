const { json } = require('express');
const express = require('express')
const router = express.Router()
let Pharmacist = require("../models/pharmacist");

router.route("/").post(async (req,res)=>{

    const name = req.body.name;
    const email = req.body.email;
    const nic = req.body.nic;
    const mobile = req.body.mobile;
    const shop_name = req.body.shop_name;
    const shop_district = req.body.shop_district;
    const shop_location = req.body.shop_location;
    const password = req.body.password;

    const newPharmacist = new Pharmacist({
        name,
        email,
        nic,
        mobile,
        shop_name,
        shop_district,
        shop_location,
        password
    })

    await newPharmacist.save().then(()=>{
        res.json("New Pharmacist Added!")
    }).catch((err)=>{
        console.log(err);
    })

})

router.route("/").get(async (req,res)=>{

    await Pharmacist.find().then((Pharmacists)=>{
        res.json(Pharmacists)
    }).catch((err)=>{
        console.log(err);
    })

})

router.route("/:id").put(async (req,res)=>{

    let id = req.params.id;
    const name = req.body.name;
    const email = req.body.email;
    const nic = req.body.nic;
    const mobile = req.body.mobile;
    const shop_name = req.body.shop_name;
    const shop_district = req.body.shop_district;
    const shop_location = req.body.shop_location;
    const password = req.body.password;

    const updatePharmacist = {
        name,
        email,
        nic,
        mobile,
        password
    }

    const update = await Pharmacist.findByIdAndUpdate(id, updatePharmacist).then(()=>{
        res.json({"msg":"Pharmacist Updated", "status":true});
    }).catch((err)=>{
        res.json("Error");
    })

})

router.route("/:id").delete(async (req,res)=>{

    let userId = req.params.id;

    await Pharmacist.findByIdAndDelete(userId).then(()=>{
        res.json("Pharmacist Deleted");
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status: "Error with delete"});
    })

})

router.route("/:id").get(async (req,res)=>{

    let userId = req.params.id;

    const Pharmacists = await Pharmacist.findById(userId).then((Pharmacists)=>{
        res.json(Pharmacists)
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status: false});
    })

})

router.route("/:getbyemail/:email").get(async (req,res)=>{

    let email = req.params.email;

    const Pharmacists = await Pharmacist.find({email:email}).then((Pharmacists)=>{
        res.json(Pharmacists)
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status: false});
    })

})

router.route("/log/:email").post(async (req,res)=>{

    let userEmail = req.params.email;
    const password = req.body.password;

    const Pharmacists = await Pharmacist.findOne({email:userEmail}).then((Pharmacists)=>{
        if(password == Pharmacists.password){
            res.json({status: true, Pharmacists});
        }
        else{
            res.status(500).send({status: false});
        }
    }).catch((err)=>{
        res.status(500).send({status: false});
    })

})

module.exports = router;