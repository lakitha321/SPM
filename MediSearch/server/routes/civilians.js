const { json } = require('express');
const express = require('express')
const router = express.Router()
let Civilian = require("../models/civilian");

//adding a new Civilian to the database
router.route("/").post(async (req,res)=>{

    //fetching data from the request body
    const name = req.body.name;
    const email = req.body.email;
    const nic = req.body.nic;
    const mobile = req.body.mobile;
    const district = req.body.district;
    const password = req.body.password;

    const newCivilian = new Civilian({
        name,
        email,
        nic,
        mobile,
        district,
        password
    })

    //saving the record
    await newCivilian.save().then(()=>{
        res.json("New Civilian Added!")
    }).catch((err)=>{
        console.log(err);
    })

})

//getting all the records from the database
router.route("/").get(async (req,res)=>{

    await Civilian.find().then((Civilians)=>{
        res.json(Civilians)
    }).catch((err)=>{
        console.log(err);
    })

})

//updating an existing record by id
router.route("/:id").put(async (req,res)=>{

    //get id from the request parameters
    let id = req.params.id;

    //fetching data from the request body
    const name = req.body.name;
    const email = req.body.email;
    const nic = req.body.nic;
    const mobile = req.body.mobile;
    const district = req.body.district;
    const password = req.body.password;

    const updateCivilian = {
        name,
        email,
        nic,
        mobile,
        district,
        password
    }

    //updating the record
    const update = await Civilian.findByIdAndUpdate(id, updateCivilian).then(()=>{
        res.json({"msg":"Civilian Updated", "status":true});
    }).catch((err)=>{
        res.json("Error");
    })

})

//delete ans existing record by id
router.route("/:id").delete(async (req,res)=>{

    //get id from the request parameters
    let userId = req.params.id;

    await Civilian.findByIdAndDelete(userId).then(()=>{
        res.json("Civilian Deleted");
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status: "Error with delete"});
    })

})

//retrieve an existing record by id
router.route("/:id").get(async (req,res)=>{

    //get id from the request parameters
    let userId = req.params.id;

    const Civilians = await Civilian.findById(userId).then((Civilians)=>{
        res.json(Civilians)
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status: false});
    })

})

//Civilian authentication
router.route("/log/:email").post(async (req,res)=>{

    //get user email from the request parameters
    let userEmail = req.params.email;

    //fetching the password from the request body
    const password = req.body.password;

    //retrieve an existing record by email
    const Civilians = await Civilian.findOne({email:userEmail}).then((Civilians)=>{
        //check whether the is matching or not
        if(password == Civilians.password){
            res.json({status: true, Civilians});
        }
        else{
            res.status(500).send({status: false});
        }
    }).catch((err)=>{
        res.status(500).send({status: false});
    })

})

module.exports = router;