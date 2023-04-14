const express = require('express')
const app = express()
const dotenv = require('dotenv')
dotenv.config();
const bodyParser  = require('body-parser');
const mongoose = require('mongoose')
const cors = require("cors")
var morgan = require('morgan');

app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));

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
app.post("/createListings", (req, res) => {

    let jsonData = req.body;

    console.log("Data received " + JSON.stringify(jsonData))

    try {

        // console.log(author)
        // console.log(list_date)
        // console.log(title)
        console.log(jsonData.image64)
        // console.log(list_details)

        // Listings.create({
        //     author: author, 
        //     list_date: list_date,
        //     title: title,
        //     image: image64,
        //     list_details: list_details
        // })

        res.send({Status: "ok"})
    } catch (error) {
        console.log(error)
    }
})


app.listen(8080, () => {
    console.log("Server started on port 8080")
})