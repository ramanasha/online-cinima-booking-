var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');


var mongoose = require('mongoose');

var showtimeSchema = mongoose.Schema({
  showTimings: String,
  theatreName: String
});

var Showtime = mongoose.model('Showtime', showtimeSchema, 'showtime');

router.get('/getTimings', function(req, res){
  console.log("INSIDE GET TIMINGS FUNCTION IN SERVER");
  Showtime.find({}, function(err,docs){
    res.json(docs);
  });
});

router.get('/getTimings/:id', function(req,res){
  console.log("REACHED GET ID FUNCTION ON SERVER");
  Showtime.find({_id: req.params.id}, function(err,docs){
    res.json(docs);
  });
});

router.post('/addTimings', function(req, res){
  console.log('Inside CRUD POST showtime');

  var showtime = new Showtime({
    showTimings : req.body.STiming,
    theatreName : req.body.STheatre
  });
  console.log(showtime);
  console.log("After");

  showtime.save(function(err,docs){
    if(err) throw err;
    console.log("TIMINGS SAVED SUCCESSFULLY");
    res.json(docs);
  });
});

router.delete('/deleteShowtime/:id', function(req,res){
  console.log("REACHED DELETE TIMINGS FUNCTION ON SERVER");
  Showtime.remove({_id:req.params.id}, function(err,docs){
    res.json(docs);
  });
});

router.put('/updateShowtime/:id', function(req,res){
  console.log("REACHED PUT ON Update Showtime");
  console.log(req.body);
  Showtime.findOneAndUpdate({_id:req.params.id}, req.body, function(err,data){
    res.json(data);
  });
});

router.use(function(req, res, next){
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

module.exports = router;
