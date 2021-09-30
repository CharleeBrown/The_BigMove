const { MongoClient } = require('mongodb');
const config = require('./config.js');
const uri = config.connString;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const parser = require('body-parser');
const multer = require('multer');
const upload = multer();
const express = require('express'); 
const app = express();
const collection = client.db("mainDB").collection("CalLabBooking");

let port =  3000;
app.use(parser.json());
app.use(parser.urlencoded({extended:true}));
app.use(upload.array());

app.use(express.static('public'));
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'https://lab-booking.herokuapp.com/');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Origin', 'https://lab-booking.herokuapp.com/apptlist.html');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  next();
});



app.get('/', (req, res, next) => {
 
 next();
 });
 

  app.get('/applist', (req,res) => {
            client.connect( async err=>{  
                const query = {};

                return  collection.find({},{name:1, bookDate:0, startTime:0, _id:0}) 
                .sort()
                .toArray()
                .then(items => {
                        res.json(items)
                        return items
                                })
                .catch(err => console.error(`Failed to find documents: ${err}`))
                        });
    });
app.listen(port);

