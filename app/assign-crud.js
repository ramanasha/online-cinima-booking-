var express = require('express');
var router = express.Router();
bodyParser = require('body-parser'); //parses information from POST

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// var bookSchema = mongoose.Schema({
//   bookingDetails: [{
//    orderId: String,
//    userSeats: String }]
// });

var assignSchema = mongoose.Schema({
    cityName: String,
    theatreName: String,
    showTime: String,
    movieTitle: String,
    fromDate: String,
    toDate: String,
    moviLanguage: String,
    moviGenre: String,
    moviPoster: String,
    moviDirector: String,
    moviActors: String,
    theatreSeats: String,
    ticketPrice: String,
    remSeats: String
 });

var Assign = mongoose.model('Assign', assignSchema, 'assigning');

router.get('/getAssign', function (req, res) {
    console.log("REACHED SINGLE GET FUNCTION ON SERVER");
    Assign.find({}, function (err, docs) {
         res.json(docs);

    });
});

router.get('/getAssign/:id', function (req, res) {
    console.log("REACHED GET ID FUNCTION ON SERVER");
     Assign.find({_id: req.params.id}, function (err, docs) {
         res.json(docs);
    });
});

router.put('/addBooking/:id/', function(req, res){
  var booking = new Assign({
    bookingSchema: [{
      bookingDetails: [{
        orderId: req.body.OId,
        userSeats: req.body.USeats
      }]
    }]
  });
  console.log(booking);
  console.log("Inside ASSIGN CRUD, Just threw bookingDetails");

  booking.save({_id: req.params.id}, function(err,docs){
    if( err ) throw err;
    console.log("Booking Details assigned successfully");
    res.json(docs);
  });
});

// router.put('/addBooking/:id/', function(req, res){
//   var booking = new Assign({
//     bookingSchema: [{
//       orderId: req.body.OId,
//       userSeats: req.body.USeats }]
//   });
//   console.log(booking);
//   console.log(req.params.id);
//   console.log("Inside ASSIGN CRUD, Just thrown bookingDetails");
//
//   booking.findOneAndUpdate({ _id: req.params.id},
//                                  { $addToSet: { bookingSchema: [{ bookSchema:  req.body }] }},
//                                  {upsert: true},
//                                  function(err,doc){
//                                    console.log(doc);
//                                  });
// });

router.post('/addAssign', function(req, res){

 var assigning = new Assign({
     cityName: req.body.CName,
     theatreName: req.body.TName,
     showTime: req.body.STime,
     movieTitle: req.body.MTitle,
     fromDate: req.body.FDate,
     toDate: req.body.TDate,
     moviLanguage: req.body.MLanguage,
     moviGenre: req.body.MGenre,
     moviPoster: req.body.MPoster,
     moviDirector: req.body.MDirector,
     moviActors: req.body.MActors,
     ticketPrice: req.body.TPrice,
     theatreSeats: req.body.TSeats,
     remSeats: req.body.TSeats
  });
  console.log(assigning);
  assigning.save(function(err, docs){
    if ( err ) throw err;
    console.log("Show Assigned Successfully");
    res.json(docs);
  });
});

router.delete('/deleteAssign/:id/', function(req, res){
   console.log("REACHED Delete FUNCTION ON SERVER");
      Assign.remove({_id:req.params.id}, function(err, docs){
        res.json(docs);
    });
})

router.put('/updateAssign/:id', function(req, res){
    console.log("REACHED PUT");
    console.log(req.body);
    Assign.findOneAndUpdate({_id:req.params.id}, req.body, function (err, data) {
      console.log(data);
      res.json(data);
    });
})

router.delete('/deleteAssign/:id', function(req, res){
   console.log("REACHED Delete FUNCTION ON SERVER");
      Assign.remove({_id:req.params.id}, function(err, docs){
        res.json(docs);
    });
})


// catch 404 and forward to error handler
router.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

module.exports = router;
