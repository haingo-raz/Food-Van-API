const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require("cors")
const bodyParser  = require('body-parser');
//var morgan = require('morgan');

const app = express()

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json())
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//app.use(morgan('dev'));


//MongoDB schema
require("./listings")
const Listings = mongoose.model("Listings")

const uri = "mongodb+srv://"+ process.env.MONGO_USERNAME +":"+ process.env.MONGO_PASSWORD +"@foodvan.almznyt.mongodb.net/db-name?retryWrites=true&w=majority"; //env variable 

//Connect to mongoDB
mongoose
    .connect(uri, {
        useNewUrlParser: true,
    })
    .then(() => {
        console.log("Connected to database");
    })
    .catch((e) => console.log(e))


//Route
app.get("/api", (req, res) => {
    res.json({"name": "John"})
})

//display listings
app.get("/getListings", async(req, res) => {
    try {
        const listings = await Listings.find({})
        res.send(listings)
    } catch (error) {
        console.error(error)
    }
})

//add post 
app.post("/create", (req, res) => {
   
    res.json({"message": "Server accessed"})
    console.log(req.body)
    try {
        Listings.create({
            author: req.body.author,
            list_date: req.body.list_date, 
            title: req.body.title,  
            image: req.body.image64,
            list_details: req.body.list_details,
        })
    } catch (error) {
        res.send(error)
    }
})


app.listen(8080, () => {
    console.log("Server started on port 8080")
})