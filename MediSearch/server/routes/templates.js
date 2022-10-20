const path = require('path');
const express = require('express');
const multer = require('multer');
const File = require('../models/template');
const routerA = express.Router();


const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, './studentassignments');
    },
    filename(req, file, cb) {
      cb(null, `${new Date().getTime()}_${file.originalname}`);
    }
  }),
  limits: {
    fileSize: 10000000 // max file size 10MB = 10000000 bytes
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpeg|jpg|png|pdf|doc|docx|zip|txt|xlsx|xls)$/)) {
      return cb(
        new Error(
          'only upload files with jpg, jpeg, png, pdf, doc, docx, xslx, xls format.'
        )
      );
    }
    cb(undefined, true); // continue with upload
  }
});

routerA.post(
  '/upload',
  upload.single('file'),
  async (req, res) => {
    try {
      const { sender, feedback, area } = req.body;
      const { path, mimetype } = req.file;
      const file = new File({
        sender,
        feedback,
        area,
        file_path: path,
        file_mimetype: mimetype
      });
      await file.save();
      res.json('file uploaded successfully.');
    } catch (error) {
      res.json('Error while uploading file. Try again later.');
    }
  },
  (error, req, res, next) => {
    if (error) {
      res.status(500).send(error.message);
    }
  }
);

routerA.get('/getAll/:area', async (req, res) => {
  try {
    const files = await File.find({area:req.params.area});
    const sortedByCreationDate = files.sort(
      (a, b) => b.createdAt - a.createdAt
    );
    res.send({dat: sortedByCreationDate});
  } catch (error) {
    res.status(400).send('Error while getting list of files. Try again later.');
  }
});

routerA.get('/getAll', async (req, res) => {
  try {
    const files = await File.find({});
    const sortedByCreationDate = files.sort(
      (a, b) => b.createdAt - a.createdAt
    );
    res.send({dat: sortedByCreationDate});
  } catch (error) {
    res.status(400).send('Error while getting list of files. Try again later.');
  }
});

routerA.get('/get/:id', async (req, res) => {
  try {
    const files = await File.find({sender:req.params.id});
    const sortedByCreationDate = files.sort(
      (a, b) => b.createdAt - a.createdAt
    );
    res.send({dat: sortedByCreationDate});
  } catch (error) {
    res.status(400).send('Error while getting list of files. Try again later.');
  }
});

routerA.get('/download/:id', async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    res.set({
      'Content-Type': file.file_mimetype
    });
    res.sendFile(path.join(__dirname, '..', file.file_path));
  } catch (error) {
    res.status(400).send('Error while downloading file. Try again later.');
  }
});

routerA.route('/delete/:id').delete(async (req, res) => {

  const fs = require('fs');
  let id = req.params.id;

  try {
    const file = await File.findById(req.params.id);
    
    fs.unlinkSync(file.file_path);

    await File.findByIdAndDelete(id).then(()=>{
      res.status(200).send({status: "File deleted"});
    }).catch((err)=>{
      console.log(err);
      res.status(500).send({status: "Error with delete"});
    });
    
  } catch (error) {
    res.status(400).send('Error');
  }
});

routerA.route('/edit/:id/:phrm').put(async (req, res) => {

  let id = req.params.id;
  let phrm = req.params.phrm;

  const feedback = req.body.feedback;

  const update = await File.findByIdAndUpdate(id, {feedback:feedback, pharmacist:phrm}).then(()=>{
      res.json("Feedback Updated");
  }).catch((err)=>{
      res.json("Error");
  })

});

routerA.route('/edit/:id').put(async (req, res) => {

  let id = req.params.id;

  const feedback = req.body.feedback;

  const update = await File.findByIdAndUpdate(id, {feedback:feedback}).then(()=>{
      res.json("Feedback Deleted");
  }).catch((err)=>{
      res.json("Error");
  })

});

routerA.route('/editArea/:id').put(async (req, res) => {

  let id = req.params.id;

  const area = req.body.area;

  const update = await File.findByIdAndUpdate(id, {area:area}).then(()=>{
      res.json("Area Updated");
  }).catch((err)=>{
      res.json("Error");
  })

});

module.exports = routerA;