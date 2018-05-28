var express = require('express');
var router = express.Router();
bodyParser = require('body-parser'); //parses information from POST

var mongoose = require('mongoose');

var theatreSchema = mongoose.Schema({            // i am creating creating schema for theatre
	theatreName: String,
	theatreSeats: Number,
	ticketPrice: Number,
	cityName: String
});

var Theatre = mongoose.model('Theatre',theatreSchema,'theatre');   // i am defining Theatre model here

router.get('/getTheatre', function (req, res) {
    console.log("REACHED GET FUNCTION ON SERVER");
    Theatre.find({}, function (err, docs) {
         res.json(docs);
    });
});

router.get('/getTheatre/:id', function (req, res) {
    console.log("REACHED GET ID FUNCTION ON SERVER");
     Theatre.find({_id: req.params.id}, function (err, docs) {
         res.json(docs);

    });
});

router.post('/addTheatre', function(req, res){
console.log('Till here no problem');

var theatre = new Theatre({                // i am getting all the inputs into the Theatre model and i am passing the value to the theatre variable
  theatreName : req.body.TName,
  theatreSeats: req.body.TSeats,
  ticketPrice: req.body.TPrice,
  cityName: req.body.TCity
  });
console.log(theatre)
console.log("i m here")
    theatre.save(function(err, docs){       // i am saving the theatre variable by (var) theatre.save
     if ( err ) throw err;
     console.log("Theatre Saved Successfully");
    res.json(docs);
});

});

router.delete('/deleteTheatre/:id', function(req, res){
   console.log("REACHED Delete FUNCTION ON SERVER");
      Theatre.remove({_id:req.params.id}, function(err, docs){    // i am removing the data from Theatre model
        res.json(docs);
    });
});

router.put('/updateTheatre/:id', function(req, res){
    console.log("REACHED PUT");
    console.log(req.body);
   Theatre.findOneAndUpdate({_id:req.params.id}, req.body, function (err, data) {      // i am updating the data from the theatre model by finding the required data- findOneAndUpdate
      //console.log(data);
      res.json(data);
    });
});


// catch 404 and forward to error handler
router.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

module.exports = router;
