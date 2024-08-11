const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require("cors")
const bodyParser  = require('body-parser');

const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// MongoDB schema
require("./schema/listings")
const Listings = mongoose.model("Listings")

const uri = "mongodb+srv://"+ process.env.MONGO_USERNAME +":"+ process.env.MONGO_PASSWORD +"@foodvan.almznyt.mongodb.net/" + process.env.MONGO_DB_NAME + "?retryWrites=true&w=majority&appName="+ process.env.MONGO_APP_NAME +"";

// Connect to mongoDB
mongoose
    .connect(uri, {
        useNewUrlParser: true,
    })
    .then(() => {
        console.log("Connected to database");
    })
    .catch((e) => console.log(e))

// Display all listings
app.get("/listings", async(req, res) => {
    try {
        const listings = await Listings.find({})
        res.send(listings)
    } catch (error) {
        console.error(error)
    }
})

// Get a listing by ID


// Create a new listing
app.post("/create", (req, res) => {
    console.log("Body")
    console.log(req.body)
    try {
        const listing = new Listings({
            author: req.body.author,
            list_date: req.body.list_date, 
            title: req.body.title,  
            image: req.body.image,
            list_details: req.body.list_details,
            phone: req.body.phone
        })
        listing.save()
        console.log("Listing created")
        res.send(listing)
    } catch (error) {
        console.error(error)
        res.send(error)
    }
})

// Update a listing
app.put("/update/:id", async(req, res) => {
    try {
        const listing = await Listings.findById(req.params.id)
        listing.author = req.body.author
        listing.list_date = req.body.list_date
        listing.title = req.body.title
        listing.image = req.body.image64
        listing.list_details = req.body.list_details
        listing.phone = req.body.phone
        await listing.save()
        console.log("Listing updated")
        res.send(listing)
    } catch (error) {
        console.error(error)
        res.send(error)
    }
})


// Delete a listing
app.delete("/delete/:id", async(req, res) => {
    try {
        const listing = await Listings.findById(req.params.id)
        await listing.deleteOne()
        res.send("Listing deleted")
        console.log("Listing deleted")
    } catch (error) {
        console.error(error)
        res.send(error)
    }
})


app.listen(8080, () => {
    console.log("Server started on port 8080")
})